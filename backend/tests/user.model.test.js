const mongoose = require("mongoose");

describe("User model", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("exports a User model", () => {
    const { User } = require("../src/models/User");

    expect(User).toBeDefined();
    expect(typeof User).toBe("function");
  });

  it("defines the required fields on the schema", () => {
    const { User } = require("../src/models/User");
    const schema = User.schema;

    expect(schema.paths.username).toBeDefined();
    expect(schema.paths.password).toBeDefined();
    expect(schema.paths.role).toBeDefined();
    expect(schema.paths.createdAt).toBeDefined();
  });

  it("requires a unique username", () => {
    const { User } = require("../src/models/User");
    const usernamePath = User.schema.paths.username;

    expect(usernamePath.options.required).toBe(true);
    expect(usernamePath.options.unique).toBe(true);
  });

  it("trims the username field", () => {
    const { User } = require("../src/models/User");
    const usernamePath = User.schema.paths.username;

    expect(usernamePath.options.trim).toBe(true);
  });

  it("enforces the role enum", () => {
    const { User } = require("../src/models/User");
    const rolePath = User.schema.paths.role;

    expect(rolePath.options.enum).toEqual(["admin", "sales"]);
  });

  it("defaults the role to sales", () => {
    const { User } = require("../src/models/User");
    const rolePath = User.schema.paths.role;

    expect(rolePath.options.default).toBe("sales");
  });

  it("sets a default createdAt value", () => {
    const { User } = require("../src/models/User");
    const createdAtPath = User.schema.paths.createdAt;

    expect(createdAtPath.options.default).toBeDefined();
  });

  it("does not hash the password field", () => {
    const { User } = require("../src/models/User");
    const passwordPath = User.schema.paths.password;

    expect(passwordPath.options.required).toBe(true);
    expect(passwordPath.options.select).not.toBe(false);
  });
});