const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
// const auth = require("../middleware/auth");

// GET BACK ALL THE REVIEWS
router.get("/", async (req, res) => {
	try {
		const reviews = await Review.find();
		res.json(reviews);
	} catch (err) {
		res.json({ message: err });
	}
});

// SUBMITS A REVIEW
router.post("/", async (req, res) => {
	const review = new Review({
		name: req.body.name,
		email: req.body.email,
		rating: req.body.rating,
		message: req.body.message,
		jobId: req.body.jobId,
	});

	try {
		const savedReview = await review.save();
		res.json(savedReview);
	} catch (err) {
		res.json({ message: err });
	}
});

// SPECIFIC REVIEW
router.get("/:reviewId", async (req, res) => {
	try {
		const review = await Review.findById(req.params.reviewId);
		res.json(review);
	} catch (err) {
		res.json({ message: err });
	}
});

// DELETE REVIEW
router.delete("/:reviewId", async (req, res) => {
	try {
		const removedReview = await Review.deleteOne({ _id: req.params.reviewId });
		res.json(removedReview);
	} catch (err) {
		res.json({ message: err });
	}
});

// UPDATE REVIEW

router.patch("/:reviewId", async (req, res) => {
	try {
		const updatedReview = await Review.updateOne(
			{ _id: req.params.reviewId },
			{
				$set: {
					name: req.body.name,
					email: req.body.email,
					rating: req.body.rating,
					message: req.body.message,
				},
			}
		);
		res.json(updatedReview);
	} catch (err) {
		res.json({ message: err });
	}
});

module.exports = router;
