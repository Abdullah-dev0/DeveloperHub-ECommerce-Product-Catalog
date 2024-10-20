const routes = require("./routes/index");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors());

const dbUrl = process.env.MONGODB_URI;

mongoose
	.connect(dbUrl)
	.then(() => {
		console.log("MONGO CONNECTION OPEN!!!");
	})
	.catch((err) => {
		console.log("OH NO MONGO CONNECTION ERROR!!!!");
		console.log(err);
	});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "jade");

app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
