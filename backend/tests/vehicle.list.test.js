const request = require("supertest");
const app = require("../src/app");
const vehicles = require("../src/data/vehicles");
const { vehicle, registerAndLogin } = require("./helpers/vehicleTestUtils");

describe("GET /api/vehicles", () => {
  beforeEach(() => {
    vehicles.length = 0;
  });

  it("returns 401 when Authorization header is missing", async () => {
    const response = await request(app).get("/api/vehicles");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Unauthorized",
    });
  });

  it("returns 401 when JWT is invalid", async () => {
    const response = await request(app)
      .get("/api/vehicles")
      .set("Authorization", "Bearer invalid-token");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Unauthorized",
    });
  });

  it("returns 200 and an empty array when no vehicles exist", async () => {
    const token = await registerAndLogin();

    const response = await request(app)
      .get("/api/vehicles")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("returns 200 and all created vehicles for an authenticated user", async () => {
    const token = await registerAndLogin();

    await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send(vehicle);

    const response = await request(app)
      .get("/api/vehicles")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        make: "Toyota",
        model: "Fortuner",
        category: "SUV",
        price: 4500000,
        quantity: 5,
      },
    ]);
  });
});
