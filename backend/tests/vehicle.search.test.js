const request = require("supertest");
const app = require("../src/app");
const vehicles = require("../src/data/vehicles");
const { vehicle, registerAndLogin } = require("./helpers/vehicleTestUtils");

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
        id: 1,
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
        id: 1,
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
