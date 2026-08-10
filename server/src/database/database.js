import mongoose from "mongoose";

export const connectDatabase = async () => {
  console.log("Connecting with the database...");
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB atlas connected"))
    .catch((error) => console.log(error));
};
