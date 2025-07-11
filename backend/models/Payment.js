const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
	mealId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Meal",
		required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	paymentMethod: {
		type: String,
		required: true,
		enum: ["online", "cash"],
	},
	transactionId: {
		type: String,
		default: null,
	},
	status: {
		type: String,
		enum: ["pending", "completed", "failed"],
		default: "pending",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Payment", paymentSchema);
