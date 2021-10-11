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
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	profilePicture: {
		type: String,
		default: "",
	},
	phone: {
		type: String,
		default: "",
	},
	adress: {
		type: String,
		default: "",
	},
	gender: {
		type: String,
		default: "",
	},
	savedJobs: [{}],

	facebook: {
		type: String,
		default: "",
	},
	linkedIn: {
		type: String,
		default: "",
	},
	twitter: {
		type: String,
		default: "",
	},
});

module.exports = mongoose.model("Users", PostSchema);
