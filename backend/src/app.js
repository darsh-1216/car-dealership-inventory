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

app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
  });
});

module.exports = app;
