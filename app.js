const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

// IMPORT ROUTES
const jobsRoute = require("./routes/jobs");
const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");

app.use(cors());
app.use("/jobs", jobsRoute);
app.use("/users", usersRoute);
app.use("/auth", authRoute);

app.get("/", (req, res) => {
	res.send("We are on home");
});

// CONNECT TO DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
	console.log("connected to db")
);

app.listen(3001, () => console.log("Listening at port 3001"));
