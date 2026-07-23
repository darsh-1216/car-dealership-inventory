const request = require("supertest");
const app = require("../src/app");
const { Vehicle } = require("../src/models/Vehicle");
const {
  vehicle,
  registerAndLogin,
} = require("./helpers/vehicleTestUtils");

const createRestockVehicle = (overrides = {}) => Vehicle.create({
  ...vehicle,
  year: 2024,
  mileage: 0,
  fuelType: "Petrol",
  transmission: "Automatic",
  ...overrides,
});

describe("POST /api/vehicles/:id/restock", () => {
  beforeEach(async () => {
    await Vehicle.deleteMany({});
  });

  it("returns 401 when Authorization header is missing", async () => {
    const response = await request(app)
      .post("/api/vehicles/507f1f77bcf86cd799439011/restock")
      .send({ quantity: 3 });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Unauthorized",
    });
  });

  it("returns 403 when an authenticated customer attempts to restock", async () => {
    const token = await registerAndLogin("customer");
    const vehicleToRestock = await createRestockVehicle();

    const response = await request(app)
      .post(`/api/vehicles/${vehicleToRestock._id}/restock`)
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 3 });

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      message: "Forbidden",
    });
  });

  it("returns 404 when the vehicle does not exist", async () => {
    const token = await registerAndLogin("admin");

    const response = await request(app)
      .post("/api/vehicles/507f1f77bcf86cd799439011/restock")
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 3 });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Vehicle not found",
    });
  });

  it("returns 200 when an admin successfully restocks a vehicle", async () => {
    const token = await registerAndLogin("admin");
    const vehicleToRestock = await createRestockVehicle({ quantity: 2 });

    const response = await request(app)
      .post(`/api/vehicles/${vehicleToRestock._id}/restock`)
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 3 });

    expect(response.status).toBe(200);
  });

  it("increases the vehicle quantity by the restocked amount", async () => {
    const token = await registerAndLogin("admin");
    const vehicleToRestock = await createRestockVehicle({ quantity: 2 });

    const response = await request(app)
      .post(`/api/vehicles/${vehicleToRestock._id}/restock`)
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 3 });

    expect(response.status).toBe(200);
    expect(response.body.quantity).toBe(5);
  });

  it("changes Sold vehicles to Available after restocking", async () => {
    const token = await registerAndLogin("admin");
    const vehicleToRestock = await createRestockVehicle({
      quantity: 0,
      status: "Sold",
    });

    const response = await request(app)
      .post(`/api/vehicles/${vehicleToRestock._id}/restock`)
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 1 });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      quantity: 1,
      status: "Available",
    });
  });

  it("returns 400 when the restock quantity is zero", async () => {
    const token = await registerAndLogin("admin");
    const vehicleToRestock = await createRestockVehicle();

    const response = await request(app)
      .post(`/api/vehicles/${vehicleToRestock._id}/restock`)
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 0 });

    expect(response.status).toBe(400);
  });

  it("returns 400 when the restock quantity is negative", async () => {
    const token = await registerAndLogin("admin");
    const vehicleToRestock = await createRestockVehicle();

    const response = await request(app)
      .post(`/api/vehicles/${vehicleToRestock._id}/restock`)
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: -1 });

    expect(response.status).toBe(400);
  });

  it("returns 400 when the restock quantity is missing", async () => {
    const token = await registerAndLogin("admin");
    const vehicleToRestock = await createRestockVehicle();

    const response = await request(app)
      .post(`/api/vehicles/${vehicleToRestock._id}/restock`)
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(response.status).toBe(400);
  });
});
