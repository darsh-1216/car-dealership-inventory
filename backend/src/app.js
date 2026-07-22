const express = require("express");

const app = express();
const users = [];

app.use(express.json());

app.post("/api/auth/register", (req, res) => {
  const emailExists = users.some((user) => user.email === req.body.email);

  if (emailExists) {
    return res.status(409).json({
      message: "Email already exists",
    });
  }

  users.push(req.body);

  res.status(201).json({
    message: "User registered successfully",
  });
});

app.post("/api/auth/login", (req, res) => {
  const user = users.find(
    (registeredUser) =>
      registeredUser.email === req.body.email &&
      registeredUser.password === req.body.password
  );

  if (user) {
    return res.status(200).json({
      message: "Login successful",
    });
  }

  return res.status(401).json({
    message: "Invalid email or password",
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
  });
});

module.exports = app;
