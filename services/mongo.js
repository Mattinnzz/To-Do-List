const mongoose = require('mongoose');

require('dotenv').config();

const MONGODB_URL = 'mongodb+srv://matinnz99:admin123@todolistcluster.qwi9wtt.mongodb.net/?retryWrites=true&w=majority';



mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
  });
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
}