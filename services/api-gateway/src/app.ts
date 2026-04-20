import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { orderProxy } from "./routes";

const app = express();

app.use(cors());
app.use(morgan('dev'));

// 🔥 proxy FIRST
app.use("/orders", orderProxy);

// 🔥 body parser AFTER
app.use(express.json());

export default app;