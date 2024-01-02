const User = require('../models/userModel');
const jwt = require('jsonwebtoken');



const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', username: '', password: '' };


  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  if (err.message === 'incorrect username') {
    errors.username = 'The username does not exist';
  }

  
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  
  if (err.message.includes('user validation failed')) {
    
    Object.values(err.errors).forEach(({ properties }) => {
      
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}


const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'matin to do list', {
    expiresIn: maxAge
  });
};
async function createUser(email, username, password) {
  try {
    const newUser = new User({ email, username, password });
    await newUser.save();
    console.log('User saved successfully.');
    return newUser;
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyValue) {
      
      throw new Error(`Username '${error.keyValue.username}' is already taken.`);
    } else {
      
      console.error('Error creating user:', error);
      throw error;
    }
  }
}


async function signup_post (req, res){
  const { email, username, password } = req.body;

  try {
    const newUser = await createUser(email, username, password);
    const token = createToken(newUser._id); // Fix: Use newUser instead of user
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: newUser._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}



async function login_post(req, res) {
  const { email, username, password } = req.body;

  try {
    const user = await User.findByCredentials(email, username, password);

    if (!user) {
      
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}
 
function logout_get(req, res)  {
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(200).json({ message: 'Logout successful' });

}

module.exports = {
  signup_post,
  login_post,
  logout_get,
  createUser,
};