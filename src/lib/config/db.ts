import mongoose from "mongoose";

export const connectDB = async () => {
  const password = process.env.MONGODB_PASSWORD;
  await mongoose.connect(
    `mongodb+srv://rajputdarshanashok:${password}@nodeexpressproject.8xwjay9.mongodb.net/todo-app`
  );
  console.log("DB connection established!");
};
