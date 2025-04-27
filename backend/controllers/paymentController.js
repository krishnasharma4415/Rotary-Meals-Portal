const Payment = require("../models/Payment");
const Meal = require("../models/Meal");

// Process payment for a meal
exports.processPayment = async (req, res) => {
	try {
		const { mealId } = req.params;
		const { paymentMethod, transactionId } = req.body;

		// Find the meal booking
		const meal = await Meal.findById(mealId);
		if (!meal) {
			return res.status(404).json({ error: "Meal booking not found" });
		}

		// Verify meal belongs to the current user
		if (meal.userId.toString() !== req.user.userId) {
			return res
				.status(403)
				.json({ error: "Unauthorized access to this meal booking" });
		}

		// Create payment record
		const payment = new Payment({
			mealId: meal._id,
			userId: req.user.userId,
			amount: meal.totalAmount,
			paymentMethod,
			transactionId,
			status: "completed",
		});

		await payment.save();

		// Update meal payment status
		meal.paymentStatus = "completed";
		await meal.save();

		res.status(200).json({
			message: "Payment successful",
			payment,
			meal,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get payment history for a user
exports.getUserPayments = async (req, res) => {
	try {
		const payments = await Payment.find({ userId: req.user.userId })
			.populate("mealId")
			.sort({ createdAt: -1 });

		res.status(200).json(payments);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get all payments (admin only)
exports.getAllPayments = async (req, res) => {
	try {
		const payments = await Payment.find()
			.populate("mealId")
			.populate("userId", "name email phone")
			.sort({ createdAt: -1 });

		res.status(200).json(payments);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
