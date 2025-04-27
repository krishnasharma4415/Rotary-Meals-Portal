const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const { authenticateToken, isAdmin } = require("../middleware/authMiddleware");

// Process payment for a meal
router.post("/:mealId", authenticateToken, paymentController.processPayment);

// Get user's payment history
router.get("/history", authenticateToken, paymentController.getUserPayments);

// Admin route to get all payments
router.get(
	"/admin",
	authenticateToken,
	isAdmin,
	paymentController.getAllPayments
);

module.exports = router;
