const User = require("../models/User");

// Get current user's profile
exports.getProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user.userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Update user profile
exports.updateProfile = async (req, res) => {
	try {
		const { name, phone } = req.body;

		const user = await User.findById(req.user.userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Update fields
		if (name) user.name = name;
		if (phone) user.phone = phone;

		await user.save();

		res.json({
			message: "Profile updated successfully",
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				phone: user.phone,
				role: user.role,
			},
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find().select("-password").sort({ createdAt: -1 });

		res.json(users);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
