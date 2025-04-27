const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to authenticate JWT token
exports.authenticateToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res.status(401).json({ error: "Access denied. No token provided." });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(403).json({ error: "Invalid or expired token" });
	}
};

// Middleware to check for admin rights
exports.isAdmin = async (req, res, next) => {
	try {
		if (req.user.role !== "admin") {
			return res
				.status(403)
				.json({ error: "Access denied. Admin privileges required." });
		}
		next();
	} catch (error) {
		return res.status(500).json({ error: "Server error" });
	}
};
