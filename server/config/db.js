const mongoose = require("mongoose");
const { mongoURI } = require("./keys_dev");

const connectDB = async () => {
  try {
    await mongoose.connect(
      mongoURI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => console.log("MongoDB is Connected...")
    );
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
