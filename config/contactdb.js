import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const conectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("MongoDB Is Connected Successfully");
    })
    .catch((error) => {
      console.error(error);
    });
};

export default conectDB;
