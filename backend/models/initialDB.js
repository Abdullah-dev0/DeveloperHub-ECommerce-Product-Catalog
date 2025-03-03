const mongoose = require("mongoose");
const Product = require("./productDB.js");
const User = require("./userDB.js");
const credentials = require("../credentials.js");
require("dotenv").config();

const dbUrl = Process.env.MONGODB_URI;

mongoose
	.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("MONGO CONNECTION OPEN!!!");
	})
	.catch((err) => {
		console.log("OH NO MONGO CONNECTION ERROR!!!!");
		console.log(err);
	});

const seedProducts = [
	{
		title: "Food",
		description: "Yummy",
		quantity: 100,
		price: 10,
	},
	{
		title: "Cloth",
		description: "Good",
		quantity: 200,
		price: 100,
	},
	{
		title: "Phone",
		description: "Apple",
		quantity: 10,
		price: 1000,
	},
];

const insertData = async () => {
	await Product.deleteMany({});
	await User.deleteMany({});

	Product.insertMany(seedProducts)
		.then((res) => {
			console.log(res);
		})
		.catch((e) => {
			console.log(e);
		});
};

insertData();
