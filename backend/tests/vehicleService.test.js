const mockCreateVehicle = jest.fn();
const mockGetAllVehicles = jest.fn();
const mockGetVehicleById = jest.fn();
const mockUpdateVehicle = jest.fn();
const mockDeleteVehicle = jest.fn();
const mockCountVehicles = jest.fn();

jest.mock("../src/repositories/vehicleRepository", () => ({
  createVehicle: mockCreateVehicle,
  getAllVehicles: mockGetAllVehicles,
  getVehicleById: mockGetVehicleById,
  updateVehicle: mockUpdateVehicle,
  deleteVehicle: mockDeleteVehicle,
  countVehicles: mockCountVehicles,
}));

describe("vehicle service", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("creates a vehicle through the repository", async () => {
    const createdVehicle = {
      make: "Toyota",
      model: "Corolla",
    };

    mockCreateVehicle.mockResolvedValueOnce(createdVehicle);

    const { createVehicle } = require("../src/services/vehicleService");

    const result = await createVehicle({
      make: "Toyota",
      model: "Corolla",
    });

    expect(mockCreateVehicle).toHaveBeenCalledWith({
      make: "Toyota",
      model: "Corolla",
    });

    expect(result).toEqual(createdVehicle);
  });

  it("gets all vehicles through the repository", async () => {
    const vehicles = [
      { make: "Toyota" },
      { make: "Honda" },
    ];

    mockGetAllVehicles.mockResolvedValueOnce(vehicles);

    const { getVehicles } = require("../src/services/vehicleService");

    const result = await getVehicles();

    expect(mockGetAllVehicles).toHaveBeenCalledTimes(1);
    expect(result).toEqual(vehicles);
  });

  it("gets a vehicle by id through the repository", async () => {
    const vehicle = {
      _id: "123",
      make: "Toyota",
    };

    mockGetVehicleById.mockResolvedValueOnce(vehicle);

    const { getVehicle } = require("../src/services/vehicleService");

    const result = await getVehicle("123");

    expect(mockGetVehicleById).toHaveBeenCalledWith("123");
    expect(result).toEqual(vehicle);
  });

  it("returns null when the repository does not find a vehicle", async () => {
    mockGetVehicleById.mockResolvedValueOnce(null);

    const { getVehicle } = require("../src/services/vehicleService");

    const result = await getVehicle("missing");

    expect(mockGetVehicleById).toHaveBeenCalledWith("missing");
    expect(result).toBeNull();
  });

  it("updates a vehicle through the repository", async () => {
    const updatedVehicle = {
      _id: "123",
      price: 25000,
    };

    mockUpdateVehicle.mockResolvedValueOnce(updatedVehicle);

    const { updateVehicle } = require("../src/services/vehicleService");

    const result = await updateVehicle("123", {
      price: 25000,
    });

    expect(mockUpdateVehicle).toHaveBeenCalledWith("123", {
      price: 25000,
    });

    expect(result).toEqual(updatedVehicle);
  });

  it("deletes a vehicle through the repository", async () => {
    const deletedVehicle = {
      _id: "123",
      make: "Toyota",
    };

    mockDeleteVehicle.mockResolvedValueOnce(deletedVehicle);

    const { deleteVehicle } = require("../src/services/vehicleService");

    const result = await deleteVehicle("123");

    expect(mockDeleteVehicle).toHaveBeenCalledWith("123");
    expect(result).toEqual(deletedVehicle);
  });

  it("gets the vehicle count through the repository", async () => {
    mockCountVehicles.mockResolvedValueOnce(3);

    const { getVehicleCount } = require("../src/services/vehicleService");

    const result = await getVehicleCount();

    expect(mockCountVehicles).toHaveBeenCalledTimes(1);
    expect(result).toBe(3);
  });
});