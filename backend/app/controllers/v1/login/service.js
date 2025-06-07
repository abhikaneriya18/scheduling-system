const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../../../config');
const { UserModel } = require('../../../models');

class AuthService {
  async login(req, res) {
    try {
      const { sEmail, sPassword } = req.body;
      console.log('req.body :- ', req.body)
      const user = await UserModel.findOne({ sEmail });
      console.log('user', user)
      if (!user) return res.status(400).json({ message: 'Invalid credentials' });

      const match = await bcrypt.compare(sPassword, user.sPassword);
      if (!match) return res.status(400).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: '12h' });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: 'Server error', err });
    }
  }
  async register(req, res) {
    try {
      const { sEmail, sPassword } = req.body;
      const hashed = await bcrypt.hash(sPassword, 10);
      const user = new UserModel({ sEmail, sPassword: hashed });
      await user.save();
      res.json({ message: 'User registered' });
    } catch (err) {
      res.status(400).json({ message: 'Error registering user', err });
    }
  }
}
module.exports = new AuthService()
