const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
	adress: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	companyName: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	dateOfBirth: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	email: {
		type: String,
		required: true,
	},
	facebook: {
		type: String,
	},
	fieldOfActivity: {
		type: String,
		required: true,
	},
	fieldOfStudy: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	jobCity: {
		type: String,
	},
	jobCountry: {
		type: String,
	},
	jobTitle: {
		type: String,
		required: true,
	},
	levelOfEducation: {
		type: String,
		required: true,
	},
	linkedIn: {
		type: String,
	},
	periodFromMonth: {
		type: String,
		required: true,
	},
	periodToMonth: {
		type: String,
		required: true,
	},
	periodToYear: {
		type: String,
		required: true,
	},
	periodFromYear: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	positionToWork: {
		type: String,
		required: true,
	},
	secondName: {
		type: String,
		required: true,
	},
	skills: {
		type: String,
	},
	timePeriodFromMonth: {
		type: String,
		required: true,
	},
	timePeriodFromYear: {
		type: String,
		required: true,
	},
	timePeriodToMonth: {
		type: String,
		required: true,
	},
	timePeriodToYear: {
		type: String,
		required: true,
	},
	twitter: {
		type: String,
	},
	university: {
		type: String,
		required: true,
	},
	universityCountryCity: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Myresumes", PostSchema);
