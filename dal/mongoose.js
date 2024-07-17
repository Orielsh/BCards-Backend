const uri = require("../config/db")
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
      // mongoose.connect expects at least one required parameter: uri
      // uri =  _connection_string_ / _database_name_
      await mongoose.connect(uri);
      console.log('Successfully connected to MongoDB')
    } catch (err) {
      console.log('Error connecting to MongoDB', err.message)
      process.exit(1)
    }
  };

module.exports = connectDB