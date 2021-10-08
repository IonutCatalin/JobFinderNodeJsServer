const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	rating: {
		type: String,
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
	jobId: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Reviews", PostSchema);
