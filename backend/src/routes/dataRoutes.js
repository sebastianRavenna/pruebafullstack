import express from "express";
import { getData, postData } from "../controllers/dataControllers";

const dataRoutes = express.Router();

dataRoutes.get("/", getData);
dataRoutes.post("/", postData);

export { dataRoutes };
