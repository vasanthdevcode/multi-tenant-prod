import userController from "../controllers/user.js";

export const userRoute = (fastify, options) => {
  fastify.post("/", { config: { skipAuth: true } }, userController.createUser);
  fastify.get("/", userController.getAllUsers);
};
