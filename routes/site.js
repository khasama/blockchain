const express = require('express');
const router = express.Router();

const siteController = require('../controllers/SiteController');

router.use("/detail/:id", siteController.detail);
router.use("/", siteController.home);

module.exports = router;