import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "order-service",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer({
  retry: {
    initialRetryTime: 300,
    retries: 5,
  },
});

export const connectProducer = async () => {
  await producer.connect();
  console.log("Kafka Producer Connected");
};

export const sendOrderEvent = async (data: any) => {
  try {
    await producer.send({
      topic: "order-created",
      messages: [{ value: JSON.stringify(data) }],
    });
  } catch (error) {
    console.error("Kafka send failed:", error);
  }
};