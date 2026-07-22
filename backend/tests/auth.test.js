const request = require("supertest");
const app = require("../src/app");

describe("POST /api/auth/register", () => {
  // Verify that a user can register successfully with valid credentials.
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
});
