const request = require("supertest");
const app = require("../src/app");

describe("JWT Verification Middleware", () => {
  describe("GET /api/protected", () => {
    it("returns 401 when no Authorization header is provided", async () => {
      const response = await request(app).get("/api/protected");

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: "Unauthorized",
      });
    });

    it("returns 401 when an invalid JWT is provided", async () => {
      const response = await request(app)
        .get("/api/protected")
        .set("Authorization", "Bearer invalid-token");

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: "Unauthorized",
      });
    });

    it("returns 200 when a valid JWT is provided", async () => {
      await request(app).post("/api/auth/register").send({
        name: "JWT User",
        email: "jwt-verify-user@example.com",
        password: "Password123",
      });

      const loginResponse = await request(app).post("/api/auth/login").send({
        email: "jwt-verify-user@example.com",
        password: "Password123",
      });

      const response = await request(app)
        .get("/api/protected")
        .set("Authorization", `Bearer ${loginResponse.body.token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Access granted",
      });
    });
  });
});