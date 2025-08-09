import express, { Router } from "express";
import { test } from "../Controller/user.controller.js";
import { verifyToken } from "../Utils/verifyUser.js";
import {
  updateUser,
  deleteUser,
  signout,
} from "../Controller/user.controller.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", signout);

export default router;
