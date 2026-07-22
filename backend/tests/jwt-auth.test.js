const request = require("supertest");
const app = require("../src/app");

describe("POST /api/auth/login with JWT response", () => {
  it("returns a token on successful login", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Darsh",
      email: "jwt-user@gmail.com",
      password: "Password123",
    });

    const response = await request(app).post("/api/auth/login").send({
      email: "jwt-user@gmail.com",
      password: "Password123",
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successful");
    expect(response.body).toHaveProperty("token");
    expect(typeof response.body.token).toBe("string");
    expect(response.body.token.length).toBeGreaterThan(0);
  });
});
