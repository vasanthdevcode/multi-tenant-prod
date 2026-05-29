import tenantController from "../controllers/tenant.js";

export const tenantRoute = (fastify, options) => {
  fastify.post(
    "/",
    { config: { skipTenant: true, skipAuth: true } },
    tenantController.createTenant,
  );
  fastify.get(
    "/",
    { config: { skipTenant: true, skipAuth: true } },
    tenantController.allTenant,
  );
};
