const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');

router.post('/', menuController.createMenu);
router.get('/', menuController.getMenus);
router.put('/:id', menuController.updateMenu);
router.delete('/:id', menuController.deleteMenu);

module.exports = router;
