import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = "mongodb://localhost:27017/payment-db";
  await mongoose.connect(uri);

  const db = mongoose.connection;
  console.log("MongoDB Connected");
  console.log("👉 Connected DB name:", db.name);
  console.log("👉 Host:", db.host, "Port:", db.port);
};