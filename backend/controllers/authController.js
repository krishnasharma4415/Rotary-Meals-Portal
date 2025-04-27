const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register a new user
exports.register = async (req, res) => {
	try {
		const {
			name,
			email,
			password,
			phone,
			aadharNumber,
			aadharProof: aadharProofString,
		} = req.body;

		// Handle both file upload and string value
		let aadharProofValue;
		if (req.file) {
			// If file was uploaded, use the file path
			aadharProofValue = req.file.path;
		} else if (aadharProofString) {
			// If string was provided in JSON, use that
			aadharProofValue = aadharProofString;
		} else {
			return res
				.status(400)
				.json({ error: "Aadhar proof document is required" });
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ error: "Email already registered" });
		}

		// Hash password and create user
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({
			name,
			email,
			password: hashedPassword,
			phone,
			aadharNumber,
			aadharProof: aadharProofValue,
		});

		await user.save();
		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Login user
exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Find user by email
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ error: "Invalid email or password" });
		}

		// Validate password
		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			return res.status(400).json({ error: "Invalid email or password" });
		}

		// Generate JWT token
		const token = jwt.sign(
			{ userId: user._id, email: user.email, role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: "24h" }
		);

		// Return user info and token
		res.json({
			token,
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
