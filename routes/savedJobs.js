const express = require("express");
const router = express.Router();
const SavedJobs = require("../models/SavedJobs");
// const auth = require("../middleware/auth");

// GET BACK ALL THE SAVEDJOBS
router.get("/", async (req, res) => {
	try {
		const savedJobs = await SavedJobs.find();
		res.json(savedJobs);
	} catch (err) {
		res.json({ message: err });
	}
});

// SUBMITS A SAVEDJOB
router.post("/", async (req, res) => {
	const savedJob = new SavedJobs({
		companyName: req.body.companyName,
		location: req.body.location,
		remuneration: req.body.remuneration,
		contact: req.body.contact,
		period: req.body.period,
		description: req.body.description,
		requirements: req.body.requirements,
		companyOffers: req.body.companyOffers,
		userId: req.body.userId,
	});

	try {
		const savedJobs = await savedJob.save();
		res.json(savedJobs);
	} catch (err) {
		res.json({ message: err });
	}
});

// SPECIFIC SAVEDJOB
router.get("/:savedJobId", async (req, res) => {
	try {
		const savedJob = await SavedJobs.findById(req.params.savedJobId);
		res.json(savedJob);
	} catch (err) {
		res.json({ message: err });
	}
});

// DELETE SAVEDJOB
router.delete("/:savedJobId", async (req, res) => {
	try {
		const removedSavedJob = await SavedJobs.deleteOne({
			_id: req.params.savedJobId,
		});
		res.json(removedSavedJob);
	} catch (err) {
		res.json({ message: err });
	}
});

// UPDATE SAVEDJOB

router.patch("/:savedJobId", async (req, res) => {
	try {
		const updatedSavedJob = await SavedJobs.updateOne(
			{ _id: req.params.savedJobId },
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
		res.json(updatedSavedJob);
	} catch (err) {
		res.json({ message: err });
	}
});

module.exports = router;
