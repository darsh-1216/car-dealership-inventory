describe("Vehicle model", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("exports a Vehicle model", () => {
    const { Vehicle } = require("../src/models/Vehicle");

    expect(Vehicle).toBeDefined();
    expect(typeof Vehicle).toBe("function");
  });

  it("defines the required schema fields", () => {
    const { Vehicle } = require("../src/models/Vehicle");
    const schema = Vehicle.schema;

    expect(schema.paths.make).toBeDefined();
    expect(schema.paths.model).toBeDefined();
    expect(schema.paths.year).toBeDefined();
    expect(schema.paths.price).toBeDefined();
    expect(schema.paths.mileage).toBeDefined();
    expect(schema.paths.fuelType).toBeDefined();
    expect(schema.paths.transmission).toBeDefined();
    expect(schema.paths.status).toBeDefined();
    expect(schema.paths.category).toBeDefined();
    expect(schema.paths.quantity).toBeDefined();
    expect(schema.paths.createdAt).toBeDefined();
  });

  it("requires the expected fields", () => {
    const { Vehicle } = require("../src/models/Vehicle");
    const schema = Vehicle.schema;

    expect(schema.paths.make.options.required).toBe(true);
    expect(schema.paths.model.options.required).toBe(true);
    expect(schema.paths.year.options.required).toBe(true);
    expect(schema.paths.price.options.required).toBe(true);
    expect(schema.paths.mileage.options.required).toBe(true);
    expect(schema.paths.fuelType.options.required).toBe(true);
    expect(schema.paths.transmission.options.required).toBe(true);
    expect(schema.paths.category.options.required).toBe(true);
    expect(schema.paths.quantity.options.required).toBe(true);
  });

  it("trims string fields", () => {
    const { Vehicle } = require("../src/models/Vehicle");
    const schema = Vehicle.schema;

    expect(schema.paths.make.options.trim).toBe(true);
    expect(schema.paths.model.options.trim).toBe(true);
  });

  it("enforces numeric minimum values", () => {
    const { Vehicle } = require("../src/models/Vehicle");
    const schema = Vehicle.schema;

    expect(schema.paths.price.options.min).toBe(0);
    expect(schema.paths.mileage.options.min).toBe(0);
  });

  it("enforces the fuel type enum", () => {
    const { Vehicle } = require("../src/models/Vehicle");
    const fuelTypePath = Vehicle.schema.paths.fuelType;

    expect(fuelTypePath.options.enum).toEqual([
      "Petrol",
      "Diesel",
      "Electric",
      "Hybrid",
      "CNG",
    ]);
  });

  it("enforces the transmission enum", () => {
    const { Vehicle } = require("../src/models/Vehicle");
    const transmissionPath = Vehicle.schema.paths.transmission;

    expect(transmissionPath.options.enum).toEqual([
      "Manual",
      "Automatic",
    ]);
  });

  it("enforces the status enum", () => {
    const { Vehicle } = require("../src/models/Vehicle");
    const statusPath = Vehicle.schema.paths.status;

    expect(statusPath.options.enum).toEqual([
      "Available",
      "Sold",
    ]);
  });

  it("defaults the status to Available", () => {
    const { Vehicle } = require("../src/models/Vehicle");
    const statusPath = Vehicle.schema.paths.status;

    expect(statusPath.options.default).toBe("Available");
  });

  it("defaults quantity to 0", () => {
    const { Vehicle } = require("../src/models/Vehicle");
    const quantityPath = Vehicle.schema.paths.quantity;

    expect(quantityPath.options.default).toBe(0);
  });

  it("sets a default createdAt value", () => {
    const { Vehicle } = require("../src/models/Vehicle");
    const createdAtPath = Vehicle.schema.paths.createdAt;

    expect(createdAtPath.options.default).toBeDefined();
  });
});