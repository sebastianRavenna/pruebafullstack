import express from "express";
import { getData, postData } from "../controllers/dataControllers.js";

const dataRoutes = express.Router();

dataRoutes.get("/", getData);
dataRoutes.post("/", postData); 

export { dataRoutes };
