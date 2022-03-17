const express = require('express');
const fs = require('fs');
const router = express.Router();

const productController = require('../controllers/ProductController');

router.use("/create", productController.create);
router.use("/update/:id", productController.update);
router.use("/delete/:id", productController.delete);

module.exports = router;