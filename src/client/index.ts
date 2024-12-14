/**
 * This is the client-side code that uses the inferred types from the server
 */
import {
  createTRPCClient,
  splitLink,
  unstable_httpBatchStreamLink,
  unstable_httpSubscriptionLink,
} from "@trpc/client";
/**
 * We only import the `AppRouter` type from the server - this is not available at runtime
 */
import type { AppRouter } from "../server/index.js";
import dotenv from "dotenv";

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

async function main() {
  // ping server
  const response = await trpc.healthcheck.query();
  console.log(response);
}

void main();
