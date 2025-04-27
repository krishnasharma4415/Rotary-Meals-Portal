const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");

// Register route
router.post("/register", upload.single("aadharProof"), authController.register);

// Login route
router.post("/login", authController.login);

module.exports = router;
