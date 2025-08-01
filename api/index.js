import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./Routes/user.route.js";

dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("mongodb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use("/api/user", userRoutes);

app.listen(3000, () => {
  console.log("server is running on port 3000!!!");
});
