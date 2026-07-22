const request = require("supertest");
const app = require("../src/app");

describe("POST /api/auth/register", () => {
  // A new user should be able to register successfully.
  it("should register a user successfully", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Darsh",
        email: "darsh@gmail.com",
        password: "Password123",
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: "User registered successfully",
    });
  });

  // Prevent duplicate registrations using the same email address.
  it("should reject registration with an existing email", async () => {
    const registrationData = {
      name: "Darsh",
      email: "duplicate@gmail.com",
      password: "Password123",
    };

    const firstResponse = await request(app)
      .post("/api/auth/register")
      .send(registrationData);

    const secondResponse = await request(app)
      .post("/api/auth/register")
      .send(registrationData);

    expect(firstResponse.status).toBe(201);
    expect(secondResponse.status).toBe(409);
    expect(secondResponse.body).toEqual({
      message: "Email already exists",
    });
  });
});

describe("POST /api/auth/login", () => {
  it("should log in a user successfully", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "darsh@gmail.com",
        password: "Password123",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Login successful",
    });
  });
});
