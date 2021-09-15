const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// GET BACK ALL THE USERS
router.get("/", auth, async (req, res) => {
	User.findById(req.user.id)
		.select("-password")
		.then((user) => {
			res.json(user);
		});
});

// SUBMITS A USER
router.post("/", (req, res) => {
	const { email, password } = req.body;

	// Validation of credentials
	if (!email || !password) {
		return res.status(400).json({ msg: "Please enter all fields" });
	}

	// Check for existing user
	User.findOne({ email }).then((user) => {
		if (!user) return res.status(400).json({ msg: "User does not exists" });

		// Validate password
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

			jwt.sign(
				{ id: user.id },
				config.get("jwtSecret"),
				{ expiresIn: 7200 },
				(err, token) => {
					if (err) throw err;
					res.json({
						token: token,
						user: {
							id: user.id,
							username: user.username,
							email: user.email,
						},
					});
				}
			);
		});
	});
});

module.exports = router;
