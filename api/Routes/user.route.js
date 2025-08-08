import express, { Router } from "express";
import { test } from "../Controller/user.controller.js";
import { verifyToken } from "../Utils/verifyUser.js";
import { updateUser, deleteUser } from "../Controller/user.controller.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);

export default router;
