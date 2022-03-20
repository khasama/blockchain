const express = require('express');
const fs = require('fs');
const router = express.Router();

const userController = require('../controllers/UserController');

router.use("/register", userController.register);
router.use("/login", userController.login);
router.use("/logout", userController.logout);
router.use("/update", userController.update);
router.use("/delete", userController.delete);
router.use("/get/:id", userController.get);

module.exports = router;