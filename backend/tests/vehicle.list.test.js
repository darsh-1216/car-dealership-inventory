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
    const customerToken = await registerAndLogin();

    const response = await request(app)
      .get("/api/vehicles")
      .set("Authorization", `Bearer ${customerToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("returns 200 and all created vehicles for an authenticated user", async () => {
    const adminToken = await registerAndLogin("admin");
    const customerToken = await registerAndLogin();

    await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(vehicle);

    const response = await request(app)
      .get("/api/vehicles")
      .set("Authorization", `Bearer ${customerToken}`);

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

  it("returns the first page of vehicles when page and limit are provided", async () => {
    const adminToken = await registerAndLogin("admin");
    const customerToken = await registerAndLogin();

    await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(vehicle);

    await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        ...vehicle,
        make: "Honda",
        model: "Civic",
      });

    const response = await request(app)
      .get("/api/vehicles")
      .query({ page: 1, limit: 1 })
      .set("Authorization", `Bearer ${customerToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      page: 1,
      limit: 1,
      total: 2,
      totalPages: 2,
      data: [
        {
          id: 1,
          make: "Toyota",
          model: "Fortuner",
          category: "SUV",
          price: 4500000,
          quantity: 5,
        },
      ],
    });
  });

  it("returns the correct subset of vehicles for subsequent pages", async () => {
    const adminToken = await registerAndLogin("admin");
    const customerToken = await registerAndLogin();

    await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(vehicle);

    await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        ...vehicle,
        make: "Honda",
        model: "Civic",
      });

    const response = await request(app)
      .get("/api/vehicles")
      .query({ page: 2, limit: 1 })
      .set("Authorization", `Bearer ${customerToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      page: 2,
      limit: 1,
      total: 2,
      totalPages: 2,
      data: [
        {
          id: 2,
          make: "Honda",
          model: "Civic",
          category: "SUV",
          price: 4500000,
          quantity: 5,
        },
      ],
    });
  });
  
  it("returns an empty data array when the requested page exceeds the available pages", async () => {
    const adminToken = await registerAndLogin("admin");
    const customerToken = await registerAndLogin();

    await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(vehicle);

    const response = await request(app)
      .get("/api/vehicles")
      .query({ page: 2, limit: 1 })
      .set("Authorization", `Bearer ${customerToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      page: 2,
      limit: 1,
      total: 1,
      totalPages: 1,
      data: [],
    });
  });
});
