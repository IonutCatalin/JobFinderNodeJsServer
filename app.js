const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
// IMPORT ROUTES
const jobsRoute = require("./routes/jobs");
const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const reviewRoute = require("./routes/reviews");
const savedJobsRoute = require("./routes/savedJobs");
const myResumesRoute = require("./routes/myresumes");
dotenv.config();

// CONNECT TO DB
// mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
// 	console.log("connected to db")
// );
mongoose
	.connect(process.env.DB_CONNECTION, {
		useNewUrlParser: true,
	})
	.then(() => console.log("DB Connection Successfull"))
	.catch((err) => {
		console.error(err);
	});
app.use(express.json());

app.use(cors());
app.use("/jobs", jobsRoute);
app.use("/users", usersRoute);
app.use("/auth", authRoute);
app.use("/reviews", reviewRoute);
app.use("/savedJobs", savedJobsRoute);
app.use("/myResumes", myResumesRoute);

// app.get("/", (req, res) => {
// 	res.send("We are on home");
// });

app.listen(3001, () => console.log("Listening at port 3001"));
