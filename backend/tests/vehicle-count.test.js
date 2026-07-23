const request = require("supertest");
const app = require("../src/app");
const vehicles = require("../src/data/vehicles");

const registerAndLogin = async (email) => {
  await request(app).post("/api/auth/register").send({
    name: "Test User",
    email,
    password: "Password123",
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
    const token = await registerAndLogin("vehicle-count-user@gmail.com");

    await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send({
        make: "Toyota",
        model: "Corolla",
        category: "Sedan",
        price: 20000,
        quantity: 2,
      });

    await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send({
        make: "Honda",
        model: "Civic",
        category: "Sedan",
        price: 22000,
        quantity: 1,
      });

    await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send({
        make: "Ford",
        model: "Mustang",
        category: "Coupe",
        price: 30000,
        quantity: 3,
      });

    const response = await request(app)
      .get("/api/vehicles/count")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      totalVehicles: 3,
    });
  });
});