const UserService = require('../../services/user');

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    await UserService.validateSignUp(email, password, res);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    await UserService.validateLogin(email, password, res);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  signUp,
  logIn,
};
