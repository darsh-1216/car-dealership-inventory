const request = require("supertest");
const app = require("../src/app");

const createUser = () => {
  const uniqueId = `${Date.now()}-${Math.random()}`;

  return {
    name: "Password Hashing User",
    email: `password-hashing-${uniqueId}@example.com`,
    password: "Password123",
  };
};

async function registerAndCaptureStoredUser(user) {
  const originalPush = Array.prototype.push;
  let storedUser;

  Array.prototype.push = function (...items) {
    const registeredUser = items.find((item) => item?.email === user.email);

    if (registeredUser) {
      storedUser = registeredUser;
    }

    return originalPush.apply(this, items);
  };

  try {
    const response = await request(app).post("/api/auth/register").send(user);

    return { response, storedUser };
  } finally {
    Array.prototype.push = originalPush;
  }
}

describe("Password hashing", () => {
  it("hashes a newly registered user's password before storing it", async () => {
    const user = createUser();
    const { response, storedUser } = await registerAndCaptureStoredUser(user);

    expect(response.status).toBe(201);
    expect(storedUser.password).toMatch(/^\$2[aby]\$/);
  });

  it("does not store the plain text password", async () => {
    const user = createUser();
    const { response, storedUser } = await registerAndCaptureStoredUser(user);

    expect(response.status).toBe(201);
    expect(storedUser.password).not.toBe(user.password);
  });

  it("logs in successfully when the correct password is provided", async () => {
    const user = createUser();
    await request(app).post("/api/auth/register").send(user);

    const response = await request(app).post("/api/auth/login").send({
      email: user.email,
      password: user.password,
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successful");
  });

  it("rejects login when an incorrect password is provided", async () => {
    const user = createUser();
    await request(app).post("/api/auth/register").send(user);

    const response = await request(app).post("/api/auth/login").send({
      email: user.email,
      password: "WrongPassword",
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Invalid email or password",
    });
  });

  it("never returns a password in authentication responses", async () => {
    const user = createUser();
    const registrationResponse = await request(app)
      .post("/api/auth/register")
      .send(user);
    const loginResponse = await request(app).post("/api/auth/login").send({
      email: user.email,
      password: user.password,
    });

    expect(registrationResponse.body).not.toHaveProperty("password");
    expect(loginResponse.body).not.toHaveProperty("password");
  });
});
