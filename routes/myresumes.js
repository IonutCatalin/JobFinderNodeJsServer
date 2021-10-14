const express = require("express");
const router = express.Router();
const MyResumes = require("../models/MyResumes");
// const auth = require("../middleware/auth");

// GET BACK ALL THE MyResumes
router.get("/", async (req, res) => {
	try {
		const myResume = await MyResumes.find();
		res.json(myResume);
	} catch (err) {
		res.json({ message: err });
	}
});

// SUBMITS A RESUME
router.post("/", async (req, res) => {
	const myResume = new MyResumes({
		adress: req.body.adress,
		city: req.body.city,
		companyName: req.body.companyName,
		country: req.body.country,
		dateOfBirth: req.body.dateOfBirth,
		description: req.body.description,
		email: req.body.email,
		facebook: req.body.facebook,
		fieldOfActivity: req.body.fieldOfActivity,
		fieldOfStudy: req.body.fieldOfStudy,
		firstName: req.body.firstName,
		jobCity: req.body.jobCity,
		jobCountry: req.body.jobCountry,
		jobTitle: req.body.jobTitle,
		levelOfEducation: req.body.levelOfEducation,
		linkedIn: req.body.linkedIn,
		periodFromMonth: req.body.periodFromMonth,
		periodFromYear: req.body.periodFromYear,
		periodToMonth: req.body.periodToMonth,
		periodToYear: req.body.periodToYear,
		phone: req.body.phone,
		positionToWork: req.body.positionToWork,
		secondName: req.body.secondName,
		skills: req.body.skills,
		timePeriodFromMonth: req.body.timePeriodFromMonth,
		timePeriodFromYear: req.body.timePeriodFromYear,
		timePeriodToMonth: req.body.timePeriodToMonth,
		timePeriodToYear: req.body.timePeriodToYear,
		twitter: req.body.twitter,
		university: req.body.university,
		universityCountryCity: req.body.universityCountryCity,
		userId: req.body.userId,
	});

	try {
		const savedMyResume = await myResume.save();
		res.json(savedMyResume);
	} catch (err) {
		res.json({ message: err });
	}
});

// SPECIFIC RESUME
router.get("/:myResumeId", async (req, res) => {
	try {
		const myResume = await MyResumes.findById(req.params.myResumeId);
		res.json(myResume);
	} catch (err) {
		res.json({ message: err });
	}
});

// DELETE RESUME
router.delete("/:myResumeId", async (req, res) => {
	try {
		const removedMyResume = await MyResumes.deleteOne({
			_id: req.params.myResumeId,
		});
		res.json(removedMyResume);
	} catch (err) {
		res.json({ message: err });
	}
});

// UPDATE RESUME

router.patch("/:myResumeId", async (req, res) => {
	try {
		const updateMyResume = await MyResumes.updateOne(
			{ _id: req.params.myResumeId },
			{
				$set: {
					adress: req.body.adress,
					city: req.body.city,
					companyName: req.body.companyName,
					country: req.body.country,
					dateOfBirth: req.body.dateOfBirth,
					description: req.body.description,
					email: req.body.email,
					facebook: req.body.facebook,
					fieldOfActivity: req.body.fieldOfActivity,
					fieldOfStudy: req.body.fieldOfStudy,
					firstName: req.body.firstName,
					jobCity: req.body.jobCity,
					jobCountry: req.body.jobCountry,
					jobTitle: req.body.jobTitle,
					levelOfEducation: req.body.levelOfEducation,
					linkedIn: req.body.linkedIn,
					periodFromMonth: req.body.periodFromMonth,
					periodFromYear: req.body.periodFromYear,
					periodToMonth: req.body.periodToMonth,
					periodToYear: req.body.periodToYear,
					phone: req.body.phone,
					positionToWork: req.body.positionToWork,
					secondName: req.body.secondName,
					skills: req.body.skills,
					timePeriodFromMonth: req.body.timePeriodFromMonth,
					timePeriodFromYear: req.body.timePeriodFromYear,
					timePeriodToMonth: req.body.timePeriodToMonth,
					timePeriodToYear: req.body.timePeriodToYear,
					twitter: req.body.twitter,
					university: req.body.university,
					universityCountryCity: req.body.universityCountryCity,
				},
			}
		);
		res.json(updateMyResume);
	} catch (err) {
		res.json({ message: err });
	}
});

module.exports = router;
