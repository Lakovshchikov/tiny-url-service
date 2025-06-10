import { errorHandler } from "#middlewares";
import routes from "#routes";
import cors from "cors";
import express from "express";

const corsOrigin = process.env.CORS_ORIGIN ?? "";
const app = express();

app.use(express.json());
app.use(
  cors({
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    origin: corsOrigin,
  }),
);

app.use("/", routes);
app.use(errorHandler);

export default app;
