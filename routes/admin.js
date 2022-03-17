const express = require('express');
const router = express.Router();

const adminController = require('../controllers/AdminController');

router.use("/product", adminController.product);
router.use("/user", adminController.user);
router.use("/bill", adminController.bill);
router.use("/", adminController.home);

module.exports = router;