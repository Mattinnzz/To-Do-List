const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
      username: {
           type: 'string',
           required: true,
           unique: true,
      },
      password: {
           type: 'string',
           required: true,
      },
});

userSchema.statics.findByCredentials = async (username, password) => {
    const User = mongoose.model('userModel');
    const user = await User.findOne({ username, password });
    return user;
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