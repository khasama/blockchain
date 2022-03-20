const express = require('express');
const router = express.Router();

const cartController = require('../controllers/CartController');

router.use("/add/:id/:quantity", cartController.add);
router.use("/update", cartController.update);
router.use("/delete", cartController.delete);
router.use("/convert/:price", cartController.convert);
router.use("/payment", cartController.payment);
router.use("/", cartController.home);

module.exports = router;