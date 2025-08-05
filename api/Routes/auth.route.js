import express from "express";
import { signup, signin, google } from "../Controller/auth.controller.js";

const Router = express.Router();

Router.post("/sign-up", signup);
Router.post("/sign-in", signin);
Router.post("/google", google);

export default Router;
