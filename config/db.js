import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://gowtham7553_db_user:fbVS0Rst3nzepCt5@cluster0.kpgam2e.mongodb.net/");
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
