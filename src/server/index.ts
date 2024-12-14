import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { publicProcedure, router } from "./trpc.js";
import dotenv from "dotenv";

dotenv.config();

// default: port 5000
const port = process.env.PORT || 5000;

const appRouter = router({
  healthcheck: publicProcedure.query(() => "yay!"),
  // the potential feature will be here.
});

// Export type router type signature, this is used by the client.

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});

server.listen(port);
