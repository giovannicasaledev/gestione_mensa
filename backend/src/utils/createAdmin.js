const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const createAdminIfNotExists = async () => {
  const existingAdmin = await User.findOne({ username: 'admin' });
  if (!existingAdmin) {
const hashedPassword = await bcrypt.hash('admin', 10);
const adminUser = new User({
  email: 'admin@admin.it',
  username: 'admin',
  password: hashedPassword,
  role: 'admin'
});
    await adminUser.save();
    console.log('Admin user created: admin / admin');
  }
};

module.exports = createAdminIfNotExists;
