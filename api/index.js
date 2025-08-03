import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./Routes/user.route.js";
import authRoutes from "./Routes/auth.route.js";
import cookieParser from "cookie-parser";
dotenv.config(); //read dotenv file and store in process.env
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("mongodb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(cookieParser());
app.use(express.json()); //use the json file

app.use("/api/user", userRoutes); //help to route
app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log("server is running on port 3000!!!");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
