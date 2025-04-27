const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken, isAdmin } = require("../middleware/authMiddleware");

// Get current user profile
router.get("/profile", authenticateToken, userController.getProfile);

// Update user profile
router.put("/profile", authenticateToken, userController.updateProfile);

// Admin route to get all users
router.get("/admin", authenticateToken, isAdmin, userController.getAllUsers);

module.exports = router;
