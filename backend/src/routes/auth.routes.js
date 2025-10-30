const authController = require('../controllers/auth.controller');
// routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
router.post('/login', authController.login);

// NIENTE middleware, accesso libero per ora
router.get('/', userController.getAllUsers);
router.delete('/:id', userController.deleteUser);

module.exports = router;
