const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// GET BACK ALL THE USERS
router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.json({ message: err });
	}
});

// SUBMITS A USER
router.post("/", (req, res) => {
	const { username, email, password } = req.body;

	// Validation of credentials
	if (!username || !email || !password) {
		return res.status(400).json({ msg: "Please enter all fields" });
	}

	// Check for existing user
	User.findOne({ email }).then((user) => {
		if (user) return res.status(400).json({ msg: "User already exists" });

		const newUser = new User({
			username,
			email,
			password,
		});

		// Create salt & password hash

		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				newUser.save().then((user) => {
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
	});
});

// SPECIFIC USER
router.get("/:userId", async (req, res) => {
	try {
		const user = await User.findById(req.params.userId);
		res.json(user);
	} catch (err) {
		res.json({ message: err });
	}
});

// DELETE USER
router.delete("/:userId", async (req, res) => {
	try {
		const removedUser = await User.deleteOne({ _id: req.params.userId });
		res.json(removedUser);
	} catch (err) {
		res.json({ message: err });
	}
});

// UPDATE USER

router.patch("/:userId", async (req, res) => {
	try {
		const updatedUser = await User.updateOne(
			{ _id: req.params.userId },
			{
				$set: {
					username: req.body.username,
					email: req.body.email,
					password: req.body.password,
				},
			}
		);
		res.json(updatedUser);
	} catch (err) {
		res.json({ message: err });
	}
});

module.exports = router;
