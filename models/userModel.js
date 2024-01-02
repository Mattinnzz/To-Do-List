const { isEmail } = require('validator')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
     email: {
          type: 'string',
          required: [true, 'Please enter an email'],
          unique: true,
          validate: [isEmail, 'Please enter a valid email']
     },
      username: {
           type: 'string',
           required: [true, 'Please enter an username'],
           unique: true,
      },
      password: {
           type: 'string',
           required: [true, 'Please enter a password'],
           minlength: [8, 'minimum password length should be 8 character'],
      },
});

userSchema.statics.findByCredentials = async function (email, username, password) {
     const user = await this.findOne({ email, username });
   
     if (user) {
       const auth = await bcrypt.compare(password, user.password);
   
       if (auth) {
         return user;
       }
     }
   
     return null;
};


userSchema.pre('save', async function(next) {
     const salt = await bcrypt.genSalt();
     this.password = await bcrypt.hash(this.password, salt);
     next();
   });
   

userSchema.statics.login = async function(email, password) {
const user = await this.findOne({ email });
     if (user) {
          const auth = await bcrypt.compare(password, user.password);
          if (auth) {
          return user;
          }
          throw Error('incorrect password');
     }
throw Error('incorrect email');
};


const User = mongoose.model('userModel', userSchema);

module.exports = User;




























// const UserMongo = require('./user.mongo');

// class User {
//     constructor(username, password) {
//         this.username = username;
//         this.password = password;
//     }
// }

// module.exports = User;