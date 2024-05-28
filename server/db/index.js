import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );

    console.log('MongoDb connected successfuly ..!!');
  } catch (error) {
    console.log(`MongoDB connection Failed ..!! ${error}`);
  }
};

export default connectDB;
