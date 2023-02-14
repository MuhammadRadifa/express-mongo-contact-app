import express from "express";
import { loginUser } from "../controller/loginController.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/login",
  [
    [body("email").isEmail().withMessage("email is not email address")],
    [
      body("password")
        .isLength({ min: 5 })
        .withMessage("password min length 5 "),
    ],
  ],
  loginUser
);

export default router;
