const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", authMiddleware, (req, res) => {
  return res.status(200).json({
    message: "Access granted",
  });
});

module.exports = router;