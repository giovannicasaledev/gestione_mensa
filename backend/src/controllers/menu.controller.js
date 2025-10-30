const Menu = require('../models/menu.model');

exports.createMenu = async (req, res) => {
  try {
    const { date, items } = req.body;
    const menu = new Menu({ date, items });
    await menu.save();
    res.status(201).json(menu);
  } catch (err) {
    res.status(400).json({ error: 'Error creating menu', detail: err.message });
  }
};

exports.getMenus = async (req, res) => {
  try {
    const menus = await Menu.find().sort({ date: 1 });
    res.json(menus);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching menus', detail: err.message });
  }
};

exports.updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!menu) return res.status(404).json({ error: 'Menu not found' });
    res.json(menu);
  } catch (err) {
    res.status(400).json({ error: 'Error updating menu', detail: err.message });
  }
};

exports.deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) return res.status(404).json({ error: 'Menu not found' });
    res.json({ message: 'Menu deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Error deleting menu', detail: err.message });
  }
};

// CreateMenu
exports.createMenu = async (req, res) => {
  try {
    const { date, primo, secondo, contorno, frutta, dolce, bevande } = req.body;
    const menu = new Menu({ date, primo, secondo, contorno, frutta, dolce, bevande });
    await menu.save();
    res.status(201).json(menu);
  } catch (err) {
    res.status(400).json({ error: 'Error creating menu', detail: err.message });
  }
};

// UpdateMenu
exports.updateMenu = async (req, res) => {
  try {
    const { date, primo, secondo, contorno, frutta, dolce, bevande } = req.body;
    const menu = await Menu.findByIdAndUpdate(
      req.params.id,
      { date, primo, secondo, contorno, frutta, dolce, bevande },
      { new: true }
    );
    if (!menu) return res.status(404).json({ error: 'Menu not found' });
    res.json(menu);
  } catch (err) {
    res.status(400).json({ error: 'Error updating menu', detail: err.message });
  }
};
