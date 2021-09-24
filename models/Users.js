const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
	},
	adress: {
		type: String,
	},
	gender: {
		type: String,
	},
	socials: {
		facebook: {
			type: String,
		},
		linkedIn: {
			type: String,
		},
		twitter: {
			type: String,
		},
	},
});

module.exports = mongoose.model("Users", PostSchema);
