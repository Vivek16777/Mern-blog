import express from "express";
import { signup, signin } from "../Controller/auth.controller.js";

const Router = express.Router();

Router.post("/sign-up", signup);
Router.post("/sign-in", signin);

export default Router;
