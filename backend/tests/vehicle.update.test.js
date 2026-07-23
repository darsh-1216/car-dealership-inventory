const request = require("supertest");
const app = require("../src/app");
const vehicles = require("../src/data/vehicles");
const { vehicle, registerAndLogin } = require("./helpers/vehicleTestUtils");

describe("PUT /api/vehicles/:id", () => {
  beforeEach(() => {
    vehicles.length = 0;
  });

  it("returns 401 when Authorization header is missing", async () => {
    const response = await request(app).put("/api/vehicles/1").send({
      make: "Honda",
      model: "Civic",
      category: "Sedan",
      price: 3000000,
      quantity: 3,
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Unauthorized",
    });
  });

  it("returns 401 when JWT is invalid", async () => {
    const response = await request(app)
      .put("/api/vehicles/1")
      .set("Authorization", "Bearer invalid-token")
      .send({
        make: "Honda",
        model: "Civic",
        category: "Sedan",
        price: 3000000,
        quantity: 3,
      });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Unauthorized",
    });
  });

  it("returns 404 when the vehicle does not exist", async () => {
    const token = await registerAndLogin("admin");

    const response = await request(app)
      .put("/api/vehicles/999")
      .set("Authorization", `Bearer ${token}`)
      .send({
        make: "Honda",
        model: "Civic",
        category: "Sedan",
        price: 3000000,
        quantity: 3,
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Vehicle not found",
    });
  });

  it("returns 200 and the updated vehicle when an admin updates an existing vehicle", async () => {
    const token = await registerAndLogin("admin");

    const createResponse = await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send(vehicle);

    expect(createResponse.status).toBe(201);

    const response = await request(app)
      .put("/api/vehicles/1")
      .set("Authorization", `Bearer ${token}`)
      .send({
        make: "Honda",
        model: "Civic",
        category: "Sedan",
        price: 3000000,
        quantity: 3,
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      make: "Honda",
      model: "Civic",
      category: "Sedan",
      price: 3000000,
      quantity: 3,
    });
  });
});
