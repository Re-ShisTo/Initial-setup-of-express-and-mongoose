import express from "express";
const router = express.Router();
import * as authController from "../app/controller/authController.js";
import * as demoController from "../app/controller/demoController.js";
import * as emailValidationController from "../app/controller/emailVerificationController.js";
import * as passwordResetController from "../app/controller/passwordResetController.js";
import * as taskController from "../app/controller/taskController.js";
import * as uploadController from "../app/controller/uploadController.js";
import * as appConditionConstroller from "../app/controller/appConditionController.js";

router.get("/condition", appConditionConstroller.condition);
router.post("/demo", demoController.demo);
// Here name and age are parameters of the api url as params
router.get("/demo1/:name/:age", demoController.demo1);
// Here name and age are parameters of the api url as query
router.get("/demo2", demoController.demo2);

router.get("/demo3", demoController.demo3);

router.get("/demo4", demoController.demo4);

router.post("/demo5", demoController.demo5);

export default router;
