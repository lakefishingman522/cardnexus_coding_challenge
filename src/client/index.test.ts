/**
 * This is the client-side test code that uses the endpoints of tRPC server
 */
import {
  createTRPCClient,
  splitLink,
  unstable_httpBatchStreamLink,
  unstable_httpSubscriptionLink,
} from "@trpc/client";

import { describe, expect, it } from "@jest/globals";

/**
 * We only import the `AppRouter` type from the server - this is not available at runtime
 */
import type { AppRouter } from "../server/index.ts";
import dotenv from "dotenv";
import { invalidTestData, validTestData } from "./test-data";

dotenv.config();

// default: port 5000
const port = process.env.PORT || 5000;

// Initialize the tRPC client
const trpc = createTRPCClient<AppRouter>({
  links: [
    splitLink({
      condition: (op) => op.type === "subscription",
      true: unstable_httpSubscriptionLink({
        url: `http://localhost:${port}`,
      }),
      false: unstable_httpBatchStreamLink({
        url: `http://localhost:${port}`,
      }),
    }),
  ],
});

async function test() {
  describe("Ping Server", () => {
    it("ping server", async () => {
      const response = await trpc.healthcheck.query();
      expect(response).toBe("yay!");
    });
  });

  describe("Testing Endpoints with Valid Data", () => {
    it("test the filter across all of cards", async () => {
      for (const singleTestData of validTestData.card) {
        const response = await trpc.card.filter.query(singleTestData.input);
        try {
          expect(Array.isArray(response)).toBe(true);
        } catch (error) {
          console.log("Test failed. Response:", {
            input: singleTestData.input,
            response,
          });
          throw error; // Rethrow the error to ensure the test still fails.
        }

        // check isExist
        singleTestData.isExist
          ? expect(response.length).toBeGreaterThanOrEqual(1)
          : expect(response.length).toBe(0);
      }
    });
  });

  describe("Testing Endpoints with Invalid Data", () => {
    it("test the filter across all of cards", async () => {
      for (const singleTestData of invalidTestData.card) {
        await expect(
          trpc.card.filter.query(singleTestData.input)
        ).rejects.toThrow(singleTestData.errorMessage);
      }
    });
  });
}

void test();
