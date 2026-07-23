const request = require("supertest");
const app = require("../src/app");
const vehicles = require("../src/data/vehicles");

const registerAndLogin = async (role = "customer") => {
  const unique = `${Date.now()}-${Math.random()}`;

  const email = `vehicle-${role}-${unique}@gmail.com`;

  await request(app).post("/api/auth/register").send({
    name: "Test User",
    email,
    password: "Password123",
    role,
  });

  const loginResponse = await request(app).post("/api/auth/login").send({
    email,
    password: "Password123",
  });

  return loginResponse.body.token;
};

describe("GET /api/vehicles/count", () => {
  beforeEach(() => {
    vehicles.length = 0;
  });

  it("returns 401 Unauthorized when the Authorization header is missing", async () => {
    const response = await request(app).get("/api/vehicles/count");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Unauthorized",
    });
  });

  it("returns 401 Unauthorized when the JWT is invalid", async () => {
    const response = await request(app)
      .get("/api/vehicles/count")
      .set("Authorization", "Bearer invalid-token");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Unauthorized",
    });
  });

  it("returns the total number of vehicles for an authenticated request", async () => {
    const adminToken = await registerAndLogin("admin");
    const customerToken = await registerAndLogin();

    const create1 = await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        make: "Toyota",
        model: "Corolla",
        category: "Sedan",
        price: 20000,
        quantity: 2,
      });

    expect(create1.status).toBe(201);

    const create2 = await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        make: "Honda",
        model: "Civic",
        category: "Sedan",
        price: 22000,
        quantity: 1,
      });

    expect(create2.status).toBe(201);

    const create3 = await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        make: "Ford",
        model: "Mustang",
        category: "Coupe",
        price: 30000,
        quantity: 3,
      });

    expect(create3.status).toBe(201);

    const response = await request(app)
      .get("/api/vehicles/count")
      .set("Authorization", `Bearer ${customerToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      totalVehicles: 3,
    });
  });
});