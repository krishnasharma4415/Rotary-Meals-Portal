const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create uploads directory if it doesn't exist
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir);
}

// Configure storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

// File filter for allowed file types
const fileFilter = (req, file, cb) => {
	const allowedFileTypes = ["image/jpeg", "image/png", "application/pdf"];

	if (allowedFileTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error("Only JPEG, PNG and PDF files are allowed!"), false);
	}
};

// Create multer upload instance
const upload = multer({
	storage,
	limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
	fileFilter,
});

module.exports = upload;
