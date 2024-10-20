const Product = require("../models/productDB.js");

const displayProductInfo = async (req, res) => {
	try {
		const id = req.params.id || req.query.id;
		const product = await Product.findOne({
			_id: id,
		});

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		res.json(product);
	} catch (error) {
		console.log(error);
		res.render("404");
	}
};

module.exports = displayProductInfo;
