import express from "express";
import { body } from "express-validator";
import { createRegister } from "../controller/registerController.js";

const router = express.Router();

router.post(
  "/register",
  [
    [
      body("nama")
        .isString()
        .withMessage("nama is must be string value & filled in"),
    ],
    [body("email").isEmail().withMessage("email is not email address")],
    [
      body("password")
        .isLength({ min: 5 })
        .withMessage("password min length 5 "),
    ],
  ],
  createRegister
);

export default router;
