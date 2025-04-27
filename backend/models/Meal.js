const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	mealsPerDay: { type: Number, required: true },
	numberOfMembers: { type: Number, required: true },
	totalDays: { type: Number, required: true },
	totalAmount: { type: Number, required: true },
	startDate: { type: Date, required: true },
	endDate: { type: Date, required: true },
	paymentStatus: {
		type: String,
		enum: ["pending", "completed"],
		default: "pending",
	},
	createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Meal", mealSchema);
