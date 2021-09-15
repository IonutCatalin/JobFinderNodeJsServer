const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const auth = require("../middleware/auth");

// GET BACK ALL THE JOBS
router.get("/", async (req, res) => {
	try {
		const jobs = await Job.find();
		res.json(jobs);
	} catch (err) {
		res.json({ message: err });
	}
});

// SUBMITS A JOB
router.post("/", auth, async (req, res) => {
	const job = new Job({
		companyName: req.body.companyName,
		location: req.body.location,
		remuneration: req.body.remuneration,
		contact: req.body.contact,
		period: req.body.period,
		description: req.body.description,
		requirements: req.body.requirements,
		companyOffers: req.body.companyOffers,
	});

	try {
		const savedJob = await job.save();
		res.json(savedJob);
	} catch (err) {
		res.json({ message: err });
	}
});

// SPECIFIC JOB
router.get("/:jobId", async (req, res) => {
	try {
		const job = await Job.findById(req.params.jobId);
		res.json(job);
	} catch (err) {
		res.json({ message: err });
	}
});

// DELETE JOB
router.delete("/:jobId", auth, async (req, res) => {
	try {
		const removedJob = await Job.deleteOne({ _id: req.params.jobId });
		res.json(removedJob);
	} catch (err) {
		res.json({ message: err });
	}
});

// UPDATE JOB

router.patch("/:jobId", async (req, res) => {
	try {
		const updatedJob = await Job.updateOne(
			{ _id: req.params.jobId },
			{
				$set: {
					companyName: req.body.companyName,
					location: req.body.location,
					remuneration: req.body.remuneration,
					contact: req.body.contact,
					period: req.body.period,
					description: req.body.description,
					requirements: req.body.requirements,
					companyOffers: req.body.companyOffers,
				},
			}
		);
		res.json(updatedJob);
	} catch (err) {
		res.json({ message: err });
	}
});

module.exports = router;
