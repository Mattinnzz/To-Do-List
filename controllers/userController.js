const fs = require('fs').promises; 
const path = require('path');
const User = require('../models/userModel');

const dataFilePath = path.join(__dirname, '../data/Signup.json');



async function createUser(username, password) {
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    console.log('User saved successfully.');
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}




module.exports = {
  createUser,
  
};
