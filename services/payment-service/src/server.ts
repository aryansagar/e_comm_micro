import express from "express";
import { startConsumer } from "./kafka/consumer";
import { connectDB } from "./infrastructure/db/mongo";

const app = express();
const PORT = 4005;

const startServer = async () => {
    try {
      await connectDB();
      await startConsumer();
  
      app.listen(PORT, () => {
        console.log(`Payment service running on port ${PORT}`);
      });
    } catch (error) {
      console.error("Error starting payment service:", error);
    }
  };


startServer();
