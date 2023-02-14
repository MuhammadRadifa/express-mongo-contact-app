import express from "express";
import {
  getUsers,
  getUserByid,
  saveUser,
  updateUser,
  deleteUser,
} from "../controller/userController.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserByid);
router.post("/users", saveUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
