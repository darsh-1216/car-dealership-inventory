const mockCreate = jest.fn();
const mockFind = jest.fn();
const mockFindById = jest.fn();
const mockFindByIdAndUpdate = jest.fn();
const mockFindByIdAndDelete = jest.fn();
const mockCountDocuments = jest.fn();

jest.mock("../src/models/Vehicle", () => ({
  Vehicle: {
    create: mockCreate,
    find: mockFind,
    findById: mockFindById,
    findByIdAndUpdate: mockFindByIdAndUpdate,
    findByIdAndDelete: mockFindByIdAndDelete,
    countDocuments: mockCountDocuments,
  },
}));

describe("vehicle repository", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("creates a vehicle through the Vehicle model", async () => {
    const createdVehicle = { make: "Toyota", model: "Corolla" };
    mockCreate.mockResolvedValueOnce(createdVehicle);

    const { createVehicle } = require("../src/repositories/vehicleRepository");

    const result = await createVehicle({
      make: "Toyota",
      model: "Corolla",
    });

    expect(mockCreate).toHaveBeenCalledWith({
      make: "Toyota",
      model: "Corolla",
    });
    expect(result).toEqual(createdVehicle);
  });

  it("gets all vehicles through the Vehicle model", async () => {
    const vehicles = [{ make: "Toyota" }, { make: "Honda" }];
    mockFind.mockResolvedValueOnce(vehicles);

    const { getAllVehicles } = require("../src/repositories/vehicleRepository");

    const result = await getAllVehicles();

    expect(mockFind).toHaveBeenCalledTimes(1);
    expect(result).toEqual(vehicles);
  });

  it("gets a vehicle by id through the Vehicle model", async () => {
    const vehicle = { _id: "123", make: "Toyota" };
    mockFindById.mockResolvedValueOnce(vehicle);

    const { getVehicleById } = require("../src/repositories/vehicleRepository");

    const result = await getVehicleById("123");

    expect(mockFindById).toHaveBeenCalledWith("123");
    expect(result).toEqual(vehicle);
  });

  it("returns null when a vehicle is not found", async () => {
    mockFindById.mockResolvedValueOnce(null);

    const { getVehicleById } = require("../src/repositories/vehicleRepository");

    const result = await getVehicleById("missing");

    expect(mockFindById).toHaveBeenCalledWith("missing");
    expect(result).toBeNull();
  });

  it("updates a vehicle through the Vehicle model", async () => {
    const updatedVehicle = { _id: "123", price: 25000 };
    mockFindByIdAndUpdate.mockResolvedValueOnce(updatedVehicle);

    const { updateVehicle } = require("../src/repositories/vehicleRepository");

    const result = await updateVehicle("123", { price: 25000 });

    expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
      "123",
      { price: 25000 },
      { new: true }
    );
    expect(result).toEqual(updatedVehicle);
  });

  it("deletes a vehicle through the Vehicle model", async () => {
    const deletedVehicle = { _id: "123", make: "Toyota" };
    mockFindByIdAndDelete.mockResolvedValueOnce(deletedVehicle);

    const { deleteVehicle } = require("../src/repositories/vehicleRepository");

    const result = await deleteVehicle("123");

    expect(mockFindByIdAndDelete).toHaveBeenCalledWith("123");
    expect(result).toEqual(deletedVehicle);
  });

  it("counts vehicles through the Vehicle model", async () => {
    mockCountDocuments.mockResolvedValueOnce(3);

    const { countVehicles } = require("../src/repositories/vehicleRepository");

    const result = await countVehicles();

    expect(mockCountDocuments).toHaveBeenCalledTimes(1);
    expect(result).toBe(3);
  });
});