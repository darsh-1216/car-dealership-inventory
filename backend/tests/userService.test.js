const mockCreateUser = jest.fn();
const mockFindUserByUsername = jest.fn();
const mockGetAllUsers = jest.fn();

jest.mock("../src/repositories/userRepository", () => ({
  createUser: mockCreateUser,
  findUserByUsername: mockFindUserByUsername,
  getAllUsers: mockGetAllUsers,
}));

describe("user service", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("registers a user through the repository", async () => {
    const createdUser = { username: "alice", password: "secret" };
    mockCreateUser.mockResolvedValueOnce(createdUser);

    const { registerUser } = require("../src/services/userService");

    const result = await registerUser({
      username: "alice",
      password: "secret",
    });

    expect(mockCreateUser).toHaveBeenCalledWith({
      username: "alice",
      password: "secret",
    });
    expect(result).toEqual(createdUser);
  });

  it("gets a user by username through the repository", async () => {
    const foundUser = { username: "alice", password: "secret" };
    mockFindUserByUsername.mockResolvedValueOnce(foundUser);

    const { getUserByUsername } = require("../src/services/userService");

    const result = await getUserByUsername("alice");

    expect(mockFindUserByUsername).toHaveBeenCalledWith("alice");
    expect(result).toEqual(foundUser);
  });

  it("returns null when the repository does not find a user", async () => {
    mockFindUserByUsername.mockResolvedValueOnce(null);

    const { getUserByUsername } = require("../src/services/userService");

    const result = await getUserByUsername("missing");

    expect(mockFindUserByUsername).toHaveBeenCalledWith("missing");
    expect(result).toBeNull();
  });

  it("gets all users through the repository", async () => {
    const users = [
      { username: "alice" },
      { username: "bob" },
    ];

    mockGetAllUsers.mockResolvedValueOnce(users);

    const { getUsers } = require("../src/services/userService");

    const result = await getUsers();

    expect(mockGetAllUsers).toHaveBeenCalledTimes(1);
    expect(result).toEqual(users);
  });
});