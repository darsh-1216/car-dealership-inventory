const request = require("supertest");
const app = require("../../src/app");

const vehicle = {
  make: "Toyota",
  model: "Fortuner",
  category: "SUV",
  price: 4500000,
  quantity: 5,
};

function createUser(role = "customer") {
  const uniqueId = `${Date.now()}-${Math.random()}`;

  return {
    name: "Vehicle User",
    email: `vehicle-user-${uniqueId}@example.com`,
    password: "Password123",
    role,
  };
}

async function registerAndLogin(role = "customer") {
  const user = createUser(role);

  await request(app).post("/api/auth/register").send(user);

  const loginResponse = await request(app).post("/api/auth/login").send({
    email: user.email,
    password: user.password,
  });

  return loginResponse.body.token;
}

module.exports = {
  vehicle,
  createUser,
  registerAndLogin,
};
