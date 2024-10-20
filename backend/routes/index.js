const express = require("express");
const router = express.Router();

//Routes
const displayAllProducts = require("./displayAllProducts.js");
const displayProductInfo = require("./displayProductInfo");
const createNewProduct = require("./createNewProduct.js");
const saveEditProduct = require("./saveEditProduct");
const deleteProduct = require("./deleteProduct");

router.get("/", displayAllProducts);
router.get("/product/:id", displayProductInfo);
router.post("/product", createNewProduct);
router.post("/product/edit/:id", saveEditProduct);
router.delete("/product/delete/:id", deleteProduct);

module.exports = router;
