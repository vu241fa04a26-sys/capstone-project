const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/training-mern';

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.warn('MongoDB connection warning: Could not connect to MongoDB at', mongoURI);
    console.warn('The API server will continue running, but database operations require MongoDB.');
  });

module.exports = mongoose;
