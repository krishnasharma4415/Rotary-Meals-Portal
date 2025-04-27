const express = require("express");
const router = express.Router();
const mealController = require("../controllers/mealController");
const { authenticateToken, isAdmin } = require("../middleware/authMiddleware");

// Book a new meal
router.post("/", authenticateToken, mealController.bookMeal);

// Get user's meals
router.get("/user", authenticateToken, mealController.getUserMeals);

// Get all meals (for regular users)
router.get("/", authenticateToken, mealController.getUserMeals);

// Admin routes
router.get("/admin", authenticateToken, isAdmin, mealController.getAllMeals);
router.put(
	"/admin/:id",
	authenticateToken,
	isAdmin,
	mealController.updateMealStatus
);

module.exports = router;
