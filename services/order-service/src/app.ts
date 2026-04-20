import express from "express";
import { sendOrderEvent } from "./kafka/producer";

const app = express();

app.use(express.json());

// DEBUG (keep this for now)
app.use((req, res, next) => {
  console.log("Order service hit:", req.method, req.url);
  next();
});

// GET /
app.get("/", (req, res) => {
  res.send("Order service is working");
});

// POST /

import { randomUUID } from "crypto";

app.post("/", async (req, res) => {
  const { userId, items } = req.body;

  const orderId = randomUUID(); // 🔥 unique ID

  const orderEvent = {
    orderId,
    userId,
    items,
    createdAt: new Date().toISOString(),
  };

  console.log("📦 Order created:", orderEvent);

  await sendOrderEvent(orderEvent);

  res.json({
    message: "Order created",
    orderId,
  });
});


export default app;