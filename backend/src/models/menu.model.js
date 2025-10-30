const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  primo: { type: String, required: true },
  secondo: { type: String, required: true },
  contorno: { type: String, required: true },
  frutta: { type: String, required: true },
  dolce: { type: String, required: true },
  bevande: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Menu', MenuSchema);
