const mongoose = require("mongoose");

const mongoURI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/training-mern";

const connectDB = () => {
  mongoose.set("bufferCommands", false);

  return mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    serverSelectionTimeoutMS: 8000,
  });
};

module.exports = { mongoose, connectDB };
