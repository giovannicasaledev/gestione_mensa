const User = require('../models/user.model');

// Ritorna tutti gli utenti
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password -__v');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

// Elimina utente
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};

// Aggiorna ruolo utente
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!role || (role !== 'admin' && role !== 'user')) {
      return res.status(400).json({ error: 'Ruolo non valido' });
    }
    const user = await User.findByIdAndUpdate(req.params.id, { ruolo: role }, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error updating user role' });
  }
};
