const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middlewares
app.use(
	cors({
		origin: "*", // Allow all origins in development
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
		allowedHeaders: [
			"Content-Type",
			"Authorization",
			"x-access-token",
			"Origin",
			"Accept",
		],
		credentials: true,
		optionsSuccessStatus: 200,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
connectDB();

// Create uploads directory if it doesn't exist
if (!fs.existsSync("./uploads")) {
	fs.mkdirSync("./uploads");
}

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/meals", require("./routes/mealRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		error: "Server error",
		message:
			process.env.NODE_ENV === "production"
				? "Something went wrong"
				: err.message,
	});
});

// Start the server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
