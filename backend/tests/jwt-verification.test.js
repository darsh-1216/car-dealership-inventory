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
      const response = await request(app)
        .get("/api/protected")
        .set("Authorization", "Bearer valid-jwt-token");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Access granted",
      });
    });
  });
});