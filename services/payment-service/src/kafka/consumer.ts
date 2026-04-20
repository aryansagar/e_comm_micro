import { Kafka } from "kafkajs";
import { Payment } from "../modules/payment/payment.model";

const kafka = new Kafka({
  clientId: "payment-service",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({
  groupId: "payment-group",
});

export const startConsumer = async () => {
  await consumer.connect();
  console.log("Kafka Consumer Connected");

  await consumer.subscribe({
    topic: "order-created",
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const order = JSON.parse(message.value!.toString());

      if (!order.orderId) {
        console.log("❌ Missing orderId in event, skipping");
        return;
      }
      
      const orderId = order.orderId;

      console.log("📦 Received order:", orderId);

      const existing = await Payment.findOne({ orderId });

      if (existing) {
        console.log("⚠️ Already processed, skipping:", orderId);
        return;
      }
      console.log("🔥 About to write to Mongo...");
      
      const payment = await Payment.create({
        orderId,
        userId: order.userId,
        status: "PENDING",
      });

      try {
        console.log("💰 Processing payment for:", order.userId);

        await new Promise((res) => setTimeout(res, 1000));

        payment.status = "SUCCESS";
        await payment.save();

        console.log("✅ Payment completed:", orderId);
      } catch (err) {
        payment.status = "FAILED";
        await payment.save();

        console.log("❌ Payment failed:", orderId);
      }
    },
  });
};
