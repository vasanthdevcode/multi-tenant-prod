import Fastify from "fastify";
import mongoose from "mongoose";
import "dotenv/config";
import jwt from "@fastify/jwt";
import cors from "@fastify/cors";

import { tenantRoute } from "./routes/tenant.js";
import { tenantChecker } from "./middlewares/tenantChecker.js";
import { productRoute } from "./routes/product.js";
import { orderRoute } from "./routes/order.js";
import { userRoute } from "./routes/user.js";
import { analyticsRoute } from "./routes/analytics.js";
import { worker } from "./worker/worker.js";
import { loginRoute } from "./routes/login.js";
import { authChecker } from "./middlewares/auth.js";
import { connectRedis } from "./config/redis.js";

const fastify = Fastify({ logger: true });

fastify.register(cors, {
  origin: ["http://localhost:30080"],
  credentials: true,
});

fastify.register(tenantRoute, { prefix: "/api/tenant" });
fastify.register(productRoute, { prefix: "/api/product" });
fastify.register(orderRoute, { prefix: "/api/order" });
fastify.register(userRoute, { prefix: "/api/user" });
fastify.register(analyticsRoute, {
  prefix: "/api/analytics/revenue",
});
fastify.register(loginRoute, {
  prefix: "/api/login",
});

fastify.register(jwt, {
  secret: process.env.JWT_SECRET,
});

fastify.addHook("preHandler", tenantChecker);
fastify.addHook("preHandler", authChecker);

const PORT = Number(process.env.PORT);

fastify.get(
  "/",
  { config: { skipTenant: true, skipAuth: true } },
  async (req, reply) => {
    return reply.send({
      message: `server hit!! on ${PORT}`,
    });
  },
);

async function start() {
  try {
    await connectRedis();
    console.log("Redis connected");

    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");

    worker();

    await fastify.listen({
      port: PORT,
      host: "0.0.0.0",
    });

    console.log(`Server running successfully on ${PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
