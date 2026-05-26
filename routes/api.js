import express from "express";
const router = express.Router();
import * as appConditionConstroller from "../app/controller/appConditionController.js";

router.get("/condition", appConditionConstroller.condition);

export default router;
