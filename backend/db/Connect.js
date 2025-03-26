
// mongodb connections

// import mongoose from "mongoose";
const mongoose = require('mongoose')

const Connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true, // Fixed typo here
      useUnifiedTopology: true,
      dbName: 'LLB_WEBSITE',
    });

    const connection = mongoose.connection;

    // Correctly listen for connection success
    connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });

    // Listen for errors on the connection
    connection.on('error', (err) => {
      console.log('Error occurred: MongoDB could not be connected successfully', err.message);
    });
    
  } catch (error) {
    console.log('Error Occurred: MongoDB could not connect successfully', error.message);
  }
};

module.exports =  Connect ;
// export default Connect;
