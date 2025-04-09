import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import errorHandler from "./helper/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";


dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

import adminRoute from "./routes/adminRoute.js";
import panelRoute from "./routes/panelRoute.js";

app.use("/api/admin", adminRoute);
app.use("/api/panel", panelRoute);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
