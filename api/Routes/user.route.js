import express, { Router } from "express";
import { test } from "../Controller/user.controller.js";

const router = express.Router();

router.get("/test", test);

export default router;
