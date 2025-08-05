import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./Routes/user.route.js";
import authRoutes from "./Routes/auth.route.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./Middleware/errorMiddleware.js";
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
app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("server is running on port 3000!!!");
});
