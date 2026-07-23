jest.mock("mongoose", () => ({
  connect: jest.fn(),
}));

describe("database connection module", () => {
  beforeEach(() => {
    jest.resetModules();
    delete process.env.MONGO_URI;
  });

  it("exports a reusable connection function", () => {
    const { connectToDatabase } = require("../src/config/database");

    expect(typeof connectToDatabase).toBe("function");
  });

  it("reads the connection string from process.env.MONGO_URI", async () => {
    process.env.MONGO_URI =
      "mongodb://127.0.0.1:27017/car-dealership";

    const mongoose = require("mongoose");
    mongoose.connect.mockResolvedValueOnce({});

    const { connectToDatabase } = require("../src/config/database");

    await connectToDatabase();

    expect(mongoose.connect).toHaveBeenCalledWith(
      process.env.MONGO_URI
    );
  });

  it("throws an error when MONGO_URI is not defined", async () => {
    const { connectToDatabase } = require("../src/config/database");

    await expect(connectToDatabase()).rejects.toThrow(
      "MONGO_URI environment variable is not defined"
    );
  });

  it("resolves successfully when the database connection succeeds", async () => {
    process.env.MONGO_URI =
      "mongodb://127.0.0.1:27017/car-dealership";

    const mockConnection = { readyState: 1 };

    const mongoose = require("mongoose");
    mongoose.connect.mockResolvedValueOnce(mockConnection);

    const { connectToDatabase } = require("../src/config/database");

    await expect(connectToDatabase()).resolves.toBe(mockConnection);
  });

  it("rejects with an error when the database connection fails", async () => {
    process.env.MONGO_URI =
      "mongodb://127.0.0.1:27017/car-dealership";

    const connectionError = new Error("Mongo connection failed");

    const mongoose = require("mongoose");
    mongoose.connect.mockRejectedValueOnce(connectionError);

    const { connectToDatabase } = require("../src/config/database");

    await expect(connectToDatabase()).rejects.toThrow(
      "Mongo connection failed"
    );
  });

  it("can be imported independently from the Express app", () => {
    const databaseModule = require("../src/config/database");

    expect(databaseModule).toBeDefined();
    expect(databaseModule.connectToDatabase).toBeDefined();
  });

  it("does not change existing API behavior", () => {
    const app = require("../src/app");

    expect(typeof app).toBe("function");
  });
});