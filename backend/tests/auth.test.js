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

  it("should reject registration without an email", async () => {
    const response = await request(app).post("/api/auth/register").send({
      password: "Password123",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Email and password are required",
    });
  });

  it("should reject registration without a password", async () => {
    const response = await request(app).post("/api/auth/register").send({
      email: "missing-password@gmail.com",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Email and password are required",
    });
  });
});

describe("POST /api/auth/login", () => {
  // A registered user should be able to log in successfully.
  it("should log in a user successfully", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "darsh@gmail.com",
        password: "Password123",
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successful");
  });

  it("should reject login for an unregistered email", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "unknown@gmail.com",
        password: "Password123",
      });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Invalid email or password",
    });
  });

  it("should reject login with an incorrect password", async () => {
    await request(app).post("/api/auth/register").send({
      email: "darshan@gmail.com",
      password: "Password123",
    });

    const response = await request(app).post("/api/auth/login").send({
      email: "darshan@gmail.com",
      password: "WrongPassword",
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Invalid email or password",
    });
  });

  it("should reject login without an email", async () => {
    const response = await request(app).post("/api/auth/login").send({
      password: "Password123",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Email and password are required",
    });
  });

  it("should reject login without a password", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "darshan@gmail.com",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Email and password are required",
    });
  });
});