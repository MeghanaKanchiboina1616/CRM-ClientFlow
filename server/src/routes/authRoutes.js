const express = require("express");

const {
  register,
  login,
  getMe,
  getSalesUsers
} = require("../controllers/authController");

const {
  protect,
  adminOnly
} = require("../middleware/authMiddleware");

const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Get current logged-in user
router.get("/me", protect, getMe);

// Get all SALES users
// ADMIN only
router.get(
  "/sales-users",
  protect,
  adminOnly,
  getSalesUsers
);

module.exports = router;