import { createClient } from "redis";

const options = {
  url: process.env.REDIS_URL,
  socket: {
    reconnectStrategy(retries) {
      if (retries > 10) {
        return new Error("Redis unavailable");
      }

      return 1000; // retry every second
    },
  },
};

const redis = createClient(options);
const redisWorker = createClient(options);

redis.on("error", (err) => {
  console.log("Redis Error:", err.message);
});

redisWorker.on("error", (err) => {
  console.log("Redis Worker Error:", err.message);
});

export async function connectRedis() {
  await redis.connect();
  console.log("redis connected");

  await redisWorker.connect();
  console.log("redisWorker connected");
}

export { redis, redisWorker };
