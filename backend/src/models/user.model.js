const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cognome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  celiaco: { type: Boolean, default: false },
  vegano: { type: Boolean, default: false },
  allergeni: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

