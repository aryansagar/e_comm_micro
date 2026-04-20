import app from "./app";
import { connectProducer } from "./kafka/producer";

const PORT = process.env.PORT || 4004;

const startServer = async () => {
    try {
      await connectProducer();
  
      // small delay to let Kafka stabilize
      await new Promise((resolve) => setTimeout(resolve, 5000));
  
      app.listen(PORT, () => {
        console.log(`Order service running on port ${PORT}`);
      });
    } catch (error) {
      console.error("Error starting server:", error);
    }
  };

startServer();