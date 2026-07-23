const jwt = require("jsonwebtoken");
const { hashPassword, verifyPassword } = require("../services/auth.service");

// Temporary in-memory storage for registered users.
// This will be replaced with a database in a later iteration.
const users = [];

// Temporary secret key used for signing JWTs.
// This will be moved to environment variables in a future iteration.
const JWT_SECRET = "secret-key";

exports.registerUser = async (req, res) => {
  // Validate required registration fields.
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  // Check whether the email is already registered.
  const emailExists = users.some((user) => user.email === req.body.email);

  if (emailExists) {
    return res.status(409).json({
      message: "Email already exists",
    });
  }

  const user = {
    ...req.body,
    password: await hashPassword(req.body.password),
    role: req.body.role || "customer",
  };

  // Store the new user in memory.
  users.push(user);

  return res.status(201).json({
    message: "User registered successfully",
  });
};

exports.loginUser = async (req, res) => {
  // Validate required login fields.
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  // Find a user with matching email and password.
  const user = users.find(
    (registeredUser) => registeredUser.email === req.body.email
  );

  // Reject login if credentials are invalid.
  if (!user || !(await verifyPassword(req.body.password, user.password))) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  // Generate a JWT for the authenticated user.
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  // Return the authentication token.
  return res.status(200).json({
    message: "Login successful",
    token,
  });
};
