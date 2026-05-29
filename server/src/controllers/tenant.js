import { Tenant } from "../models/Tenant.js";

const createTenant = async (req, reply) => {
  try {
    const tenant = new Tenant(req.body);
    const createdTenant = await tenant.save();

    return reply.status(201).send({ sucess: true, data: createdTenant });
  } catch (error) {
    return reply
      .status(500)
      .send({ sucess: false, message: `Error: ${error.message}` });
  }
};

const allTenant = async (req, reply) => {
  try {
    const tenant = await Tenant.find();
    return reply.status(200).send({ sucess: true, data: tenant });
  } catch (error) {
    return reply
      .status(500)
      .send({ sucess: false, message: `Error: ${error.message}` });
  }
};

export default { createTenant, allTenant };
