const request = require("supertest");
const app = require("../src/app");
const { Vehicle } = require("../src/models/Vehicle");
const {
  vehicle,
  registerAndLogin,
} = require("./helpers/vehicleTestUtils");

describe("POST /api/vehicles/:id/purchase", () => {
  beforeEach(async () => {
    await Vehicle.deleteMany({});
  });

  it("returns 401 when Authorization header is missing", async () => {
    const response = await request(app).post(
      "/api/vehicles/507f1f77bcf86cd799439011/purchase"
    );

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Unauthorized",
    });
  });

  it("returns 404 when the vehicle does not exist", async () => {
    const token = await registerAndLogin("customer");

    const response = await request(app)
      .post("/api/vehicles/507f1f77bcf86cd799439011/purchase")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Vehicle not found",
    });
  });

  it("returns 400 when the vehicle quantity is 0", async () => {
    const token = await registerAndLogin("customer");

    const createResponse = await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...vehicle,
        quantity: 0,
      });

    const vehicleId = createResponse.body._id;

    const response = await request(app)
      .post(`/api/vehicles/${vehicleId}/purchase`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Vehicle is out of stock",
    });
  });

  it("returns 200 and decreases the quantity by 1 when the purchase succeeds", async () => {
    const token = await registerAndLogin("customer");

    const createResponse = await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send(vehicle);

    const vehicleId = createResponse.body._id;

    const response = await request(app)
      .post(`/api/vehicles/${vehicleId}/purchase`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.quantity).toBe(vehicle.quantity - 1);
  });

  it("returns the updated vehicle in the purchase response", async () => {
    const token = await registerAndLogin("customer");

    const createResponse = await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send(vehicle);

    const vehicleId = createResponse.body._id;

    const response = await request(app)
      .post(`/api/vehicles/${vehicleId}/purchase`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      make: vehicle.make,
      model: vehicle.model,
      category: vehicle.category,
      price: vehicle.price,
      quantity: vehicle.quantity - 1,
    });

    expect(response.body._id).toBeDefined();
  });
});