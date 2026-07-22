const request = require("supertest");
const app = require("../src/app");
const vehicles = require("../src/data/vehicles");

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
        make: "Toyota",
        model: "Fortuner",
        category: "SUV",
        price: 4500000,
        quantity: 5,
      },
    ]);
  });
});

describe("GET /api/vehicles/search", () => {
  beforeEach(() => {
    vehicles.length = 0;
  });

  it("returns 401 when Authorization header is missing", async () => {
    const response = await request(app).get("/api/vehicles/search");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Unauthorized",
    });
  });

  it("returns 401 when JWT is invalid", async () => {
    const response = await request(app)
      .get("/api/vehicles/search")
      .set("Authorization", "Bearer invalid-token");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Unauthorized",
    });
  });

  it("returns 200 and an empty array when no vehicles match", async () => {
    const token = await registerAndLogin();

    const response = await request(app)
      .get("/api/vehicles/search")
      .query({ make: "Honda" })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("returns only vehicles matching the make query parameter", async () => {
    const token = await registerAndLogin();

    await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send(vehicle);

    await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...vehicle,
        make: "Honda",
        model: "Civic",
      });

    const response = await request(app)
      .get("/api/vehicles/search")
      .query({ make: "Toyota" })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        make: "Toyota",
        model: "Fortuner",
        category: "SUV",
        price: 4500000,
        quantity: 5,
      },
    ]);
  });

  it("returns only vehicles matching the category query parameter", async () => {
    const token = await registerAndLogin();

    await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send(vehicle);

    await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...vehicle,
        make: "Honda",
        model: "Civic",
        category: "Sedan",
      });

    const response = await request(app)
      .get("/api/vehicles/search")
      .query({ category: "SUV" })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        make: "Toyota",
        model: "Fortuner",
        category: "SUV",
        price: 4500000,
        quantity: 5,
      },
    ]);
  });

  it("returns only vehicles matching both make and category query parameters", async () => {
    const token = await registerAndLogin();

    await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send(vehicle);

    await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...vehicle,
        make: "Honda",
        model: "Civic",
        category: "Sedan",
      });

    const response = await request(app)
      .get("/api/vehicles/search")
      .query({ make: "Toyota", category: "SUV" })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        make: "Toyota",
        model: "Fortuner",
        category: "SUV",
        price: 4500000,
        quantity: 5,
      },
    ]);
  });
});

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
    const token = await registerAndLogin();

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
    expect(response.body).toEqual({ message: "Vehicle not found" });
  });

  it("returns 200 and the updated vehicle when an authenticated user updates an existing vehicle", async () => {
    const token = await registerAndLogin();

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
      make: "Honda",
      model: "Civic",
      category: "Sedan",
      price: 3000000,
      quantity: 3,
    });
  });
});

describe("POST /api/vehicles", () => {
  beforeEach(() => {
    vehicles.length = 0;
  });

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