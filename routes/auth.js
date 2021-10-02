// const express = require("express");
// const router = express.Router();
// const User = require("../models/Users");
// const bcrypt = require("bcryptjs");
// const config = require("config");
// const jwt = require("jsonwebtoken");
// const auth = require("../middleware/auth");

// // GET BACK ALL THE USERS
// router.get("/", auth, async (req, res) => {
// 	User.findById(req.user.id)
// 		.select("-password")
// 		.then((user) => {
// 			res.json(user);
// 		});
// });

// // SUBMITS A USER
// router.post("/", (req, res) => {
// 	const { email, password } = req.body;

// 	// Validation of credentials
// 	if (!email || !password) {
// 		return res.status(400).json({ msg: "Please enter all fields" });
// 	}

// 	// Check for existing user
// 	User.findOne({ email }).then((user) => {
// 		if (!user) return res.status(400).json({ msg: "User does not exists" });

// 		// Validate password
// 		bcrypt.compare(password, user.password).then((isMatch) => {
// 			if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

// 			jwt.sign(
// 				{ id: user.id },
// 				config.get("jwtSecret"),
// 				{ expiresIn: 7200 },
// 				(err, token) => {
// 					if (err) throw err;
// 					res.json({
// 						token: token,
// 						user: {
// 							id: user.id,
// 							username: user.username,
// 							email: user.email,
// 						},
// 					});
// 				}
// 			);
// 		});
// 	});
// });

// module.exports = router;

const router = require("express").Router();
const User = require("../models/Users");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
	const newUser = new User({
		username: req.body.username,
		email: req.body.email,
		password: CryptoJS.AES.encrypt(
			req.body.password,
			process.env.SECRET_KEY
		).toString(),
	});
	try {
		const user = await newUser.save();
		res.status(201).json(user);
	} catch (err) {
		res.status(500).json(err);
	}
});

//LOGIN
router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		!user && res.status(401).json("Wrong password or username!");

		const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
		const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

		originalPassword !== req.body.password &&
			res.status(401).json("Wrong password or username!");

		const accessToken = jwt.sign(
			{ id: user._id, isAdmin: user.isAdmin },
			process.env.SECRET_KEY,
			{ expiresIn: "5d" }
		);

		const { password, ...info } = user._doc;

		res.status(200).json({ ...info, accessToken });
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
