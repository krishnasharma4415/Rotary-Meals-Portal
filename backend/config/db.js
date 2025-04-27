const mongoose = require("mongoose");

// Function to connect to MongoDB
const connectDB = async () => {
	try {
		// Ensure the connection string specifies the 'rotary' database
		let connectionString =
			process.env.MONGODB_URI || "mongodb://localhost:27017/rotary";

		// If using MongoDB Atlas and the database name isn't in the URI, add it
		if (
			connectionString.includes("mongodb+srv://") &&
			!connectionString.endsWith("/rotary")
		) {
			// If there are query parameters, insert the database name before them
			if (connectionString.includes("/?")) {
				connectionString = connectionString.replace("/?", "/rotary?");
			} else {
				// Otherwise, just append the database name
				connectionString = `${connectionString}/rotary`;
			}
		}

		const conn = await mongoose.connect(connectionString);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
		console.log(`Database: ${conn.connection.name}`);
		return conn;
	} catch (error) {
		console.error(`MongoDB Connection Error: ${error.message}`);
		process.exit(1);
	}
};

module.exports = connectDB;
