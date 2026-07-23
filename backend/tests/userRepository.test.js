const mockCreate = jest.fn();
const mockFindOne = jest.fn();
const mockFind = jest.fn();

jest.mock("../src/models/User", () => ({
  User: {
    create: mockCreate,
    findOne: mockFindOne,
    find: mockFind,
  },
}));

describe("user repository", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("creates a user through the User model", async () => {
    const createdUser = { username: "alice", password: "secret" };
    mockCreate.mockResolvedValueOnce(createdUser);

    const { createUser } = require("../src/repositories/userRepository");

    const result = await createUser({
      username: "alice",
      password: "secret",
    });

    expect(mockCreate).toHaveBeenCalledWith({
      username: "alice",
      password: "secret",
    });
    expect(result).toEqual(createdUser);
  });

  it("finds a user by username through the User model", async () => {
    const foundUser = { username: "alice", password: "secret" };
    mockFindOne.mockResolvedValueOnce(foundUser);

    const { findUserByUsername } = require("../src/repositories/userRepository");

    const result = await findUserByUsername("alice");

    expect(mockFindOne).toHaveBeenCalledWith({
      username: "alice",
    });
    expect(result).toEqual(foundUser);
  });

  it("returns null when no user is found", async () => {
    mockFindOne.mockResolvedValueOnce(null);

    const { findUserByUsername } = require("../src/repositories/userRepository");

    const result = await findUserByUsername("missing");

    expect(mockFindOne).toHaveBeenCalledWith({
      username: "missing",
    });
    expect(result).toBeNull();
  });

  it("gets all users through the User model", async () => {
    const users = [
      { username: "alice" },
      { username: "bob" },
    ];

    mockFind.mockResolvedValueOnce(users);

    const { getAllUsers } = require("../src/repositories/userRepository");

    const result = await getAllUsers();

    expect(mockFind).toHaveBeenCalledTimes(1);
    expect(result).toEqual(users);
  });
});