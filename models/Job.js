const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
	companyName: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	remuneration: {
		type: Number,
		required: true,
	},
	contact: {
		type: String,
		required: true,
	},
	period: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	requirements: {
		type: String,
		required: true,
	},
	companyOffers: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Jobs", PostSchema);
