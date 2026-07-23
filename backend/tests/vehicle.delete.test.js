const request = require("supertest");
const app = require("../src/app");
const vehicles = require("../src/data/vehicles");
const { vehicle, registerAndLogin } = require("./helpers/vehicleTestUtils");

describe("DELETE /api/vehicles/:id", () => {
  beforeEach(() => {
    vehicles.length = 0;
  });

  it("returns 401 when Authorization header is missing", async () => {
    const response = await request(app).delete("/api/vehicles/1");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Unauthorized",
    });
  });

  it("returns 401 when JWT is invalid", async () => {
    const response = await request(app)
      .delete("/api/vehicles/1")
      .set("Authorization", "Bearer invalid-token");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Unauthorized",
    });
  });

  it("returns 404 when the vehicle does not exist", async () => {
    const token = await registerAndLogin("admin");

    const response = await request(app)
      .delete("/api/vehicles/999")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Vehicle not found",
    });
  });

  it("returns 200 when an admin successfully deletes an existing vehicle", async () => {
    const token = await registerAndLogin("admin");

    await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send(vehicle);

    const response = await request(app)
      .delete("/api/vehicles/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Vehicle deleted successfully",
    });
  });

  it("removes the deleted vehicle from the in-memory data store", async () => {
    const token = await registerAndLogin("admin");

    await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send(vehicle);

    await request(app)
      .delete("/api/vehicles/1")
      .set("Authorization", `Bearer ${token}`);

    expect(vehicles).toEqual([]);
  });
});
