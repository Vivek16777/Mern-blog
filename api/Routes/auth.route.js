import express from "express";
import { signup } from "../Controller/auth.controller.js";

const Router = express.Router();

Router.post("/sign-up", signup);

export default Router;
