const Meal = require("../models/Meal");

// Book a new meal
exports.bookMeal = async (req, res) => {
	try {
		const { mealsPerDay, numberOfMembers, totalDays, startDate } = req.body;

		// Validate meals per day
		if (mealsPerDay > 2) {
			return res.status(400).json({ error: "Maximum 2 meals per day allowed" });
		}

		// Calculate amount
		const mealPrice = 70; // Rs. 70 per meal
		const totalAmount = mealPrice * mealsPerDay * numberOfMembers * totalDays;

		// Calculate end date
		const startDateObj = new Date(startDate);
		const endDateObj = new Date(startDateObj);
		endDateObj.setDate(endDateObj.getDate() + totalDays - 1);

		// Create meal booking
		const meal = new Meal({
			userId: req.user.userId,
			mealsPerDay,
			numberOfMembers,
			totalDays,
			totalAmount,
			startDate: startDateObj,
			endDate: endDateObj,
		});

		await meal.save();

		res.status(201).json({
			message: "Meal booked successfully",
			mealId: meal._id,
			totalAmount,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get user's meals
exports.getUserMeals = async (req, res) => {
	try {
		const meals = await Meal.find({ userId: req.user.userId }).sort({
			createdAt: -1,
		});
		res.json(meals);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get all meals (admin)
exports.getAllMeals = async (req, res) => {
	try {
		const meals = await Meal.find()
			.populate("userId", "name email phone")
			.sort({ createdAt: -1 });
		res.json(meals);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Update meal status
exports.updateMealStatus = async (req, res) => {
	try {
		const { id } = req.params;
		const { paymentStatus } = req.body;

		const meal = await Meal.findByIdAndUpdate(
			id,
			{ paymentStatus },
			{ new: true }
		);

		if (!meal) {
			return res.status(404).json({ error: "Meal not found" });
		}

		res.json({ message: "Meal updated successfully", meal });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
