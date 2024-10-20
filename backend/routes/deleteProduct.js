const Product = require("../models/productDB.js");

const deleteProduct = async (req, res) => {
	try {
		const id = req.params.id || req.query.id;

		const product = await Product.findByIdAndDelete(id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.log(error);
		res.status(404);
		res.render("404");
	}
};

module.exports = deleteProduct;
