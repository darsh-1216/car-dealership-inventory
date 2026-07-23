const request = require("supertest");
const app = require("../src/app");
const vehicles = require("../src/data/vehicles");

const vehiclePayload = {
  make: "Toyota",
  model: "Corolla",
  category: "Sedan",
  price: 20000,
  quantity: 2,
};

const registerAndLogin = async (email, role = "customer") => {
  await request(app).post("/api/auth/register").send({
    name: "Role User",
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

describe("Vehicle Role-Based Authorization", () => {
  beforeEach(() => {
    vehicles.length = 0;
  });

  it("allows an admin to create a vehicle", async () => {
    const token = await registerAndLogin(
      "admin-create-role@example.com",
      "admin"
    );

    const response = await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send(vehiclePayload);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: "Vehicle created successfully",
    });
  });

  it("forbids a customer from creating a vehicle", async () => {
    const token = await registerAndLogin(
      "customer-create-role@example.com"
    );

    const response = await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send(vehiclePayload);

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      message: "Forbidden",
    });
  });

  it("allows an admin to update an existing vehicle", async () => {
    const adminToken = await registerAndLogin(
      "admin-update-role@example.com",
      "admin"
    );

    await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(vehiclePayload);

    const response = await request(app)
      .put("/api/vehicles/1")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        ...vehiclePayload,
        price: 25000,
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      make: "Toyota",
      model: "Corolla",
      category: "Sedan",
      price: 25000,
      quantity: 2,
    });
  });

  it("forbids a customer from updating an existing vehicle", async () => {
    const adminToken = await registerAndLogin(
      "admin-update-role@example.com",
      "admin"
    );

    const customerToken = await registerAndLogin(
      "customer-update-role@example.com"
    );

    await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(vehiclePayload);

    const response = await request(app)
      .put("/api/vehicles/1")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({
        ...vehiclePayload,
        price: 25000,
      });

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      message: "Forbidden",
    });
  });

  it("allows an admin to delete an existing vehicle", async () => {
    const adminToken = await registerAndLogin(
      "admin-delete-role@example.com",
      "admin"
    );

    await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(vehiclePayload);

    const response = await request(app)
      .delete("/api/vehicles/1")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Vehicle deleted successfully",
    });
  });

  it("forbids a customer from deleting an existing vehicle", async () => {
    const adminToken = await registerAndLogin(
      "admin-delete-role@example.com",
      "admin"
    );

    const customerToken = await registerAndLogin(
      "customer-delete-role@example.com"
    );

    await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(vehiclePayload);

    const response = await request(app)
      .delete("/api/vehicles/1")
      .set("Authorization", `Bearer ${customerToken}`);

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      message: "Forbidden",
    });
  });
});