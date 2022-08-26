const express = require('express');
const fs = require('fs');
const router = express.Router();

const productController = require('../controllers/ProductController');

router.use("/create", productController.create);
router.use("/update", productController.update);
router.use("/delete", productController.delete);
router.use("/get/:id", productController.get);
router.use("/:id", productController.detail);

module.exports = router;