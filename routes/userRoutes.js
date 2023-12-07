const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const User = require('../models/userModel');


router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await userController.createUser(username, password);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findByCredentials(username, password);

    if (!user) {
      return res.status(401).json({ error: 'Invalid Username or Password' });
    }
    res.status(200).json({ message: 'Sign-in successful'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
