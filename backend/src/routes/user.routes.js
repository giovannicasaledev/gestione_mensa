const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Se vuoi, aggiungi un middleware di autenticazione/admin qui
router.get('/', userController.getAllUsers);
router.delete('/:id', userController.deleteUser);
router.patch('/:id/role', userController.updateUserRole);
module.exports = router;
