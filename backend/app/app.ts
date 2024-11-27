import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 8080;

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.use(express.json());

// ROUTES
app.use("/api/v1/auth", userRoutes);

mongoose
  .connect("mongodb://127.0.0.1/crypto-alert-app")
  .then(() => console.log("DB connection successful!"));

app.listen(port, () => {
  console.log("App running now");
});
