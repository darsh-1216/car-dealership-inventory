const request = require("supertest");
const app = require("../src/app");

describe("POST /api/vehicles", () => {
  const vehicle = {
    make: "Toyota",
    model: "Fortuner",
    category: "SUV",
    price: 4500000,
    quantity: 5,
  };

  function createUser() {
    const uniqueId = `${Date.now()}-${Math.random()}`;

    return {
      name: "Vehicle User",
      email: `vehicle-user-${uniqueId}@example.com`,
      password: "Password123",
    };
  }

  async function registerAndLogin() {
    const user = createUser();

    await request(app).post("/api/auth/register").send(user);

    const loginResponse = await request(app).post("/api/auth/login").send({
      email: user.email,
      password: user.password,
    });

    return loginResponse.body.token;
  }

  it("returns 401 when Authorization header is missing", async () => {
    const response = await request(app)
      .post("/api/vehicles")
      .send(vehicle);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Unauthorized",
    });
  });

  it("returns 401 when JWT is invalid", async () => {
    const response = await request(app)
      .post("/api/vehicles")
      .set("Authorization", "Bearer invalid-token")
      .send(vehicle);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Unauthorized",
    });
  });

  it("returns 201 when a valid authenticated user creates a vehicle", async () => {
    const token = await registerAndLogin();

    const response = await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send(vehicle);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: "Vehicle created successfully",
    });
  });

  it("returns 400 when make is missing", async () => {
    const token = await registerAndLogin();

    const { make, ...vehicleWithoutMake } = vehicle;

    const response = await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send(vehicleWithoutMake);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Make is required",
    });
  });

  it("returns 400 when model is missing", async () => {
    const token = await registerAndLogin();

    const { model, ...vehicleWithoutModel } = vehicle;

    const response = await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send(vehicleWithoutModel);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Model is required",
    });
  });

  it("returns 400 when category is missing", async () => {
    const token = await registerAndLogin();

    const { category, ...vehicleWithoutCategory } = vehicle;

    const response = await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send(vehicleWithoutCategory);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Category is required",
    });
  });

  it("returns 400 when price is missing", async () => {
    const token = await registerAndLogin();

    const { price, ...vehicleWithoutPrice } = vehicle;

    const response = await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send(vehicleWithoutPrice);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Price is required",
    });
  });

  it("returns 400 when quantity is missing", async () => {
    const token = await registerAndLogin();

    const { quantity, ...vehicleWithoutQuantity } = vehicle;

    const response = await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send(vehicleWithoutQuantity);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Quantity is required",
    });
  });
});