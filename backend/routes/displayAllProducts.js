const Product = require("../models/productDB.js");

const displayAllProducts = async (req, res) => {
	try {
		const results = await Product.find({});

		res.json(results);
	} catch (error) {
		console.log(error);
		res.render("404");
	}
};

module.exports = displayAllProducts;
