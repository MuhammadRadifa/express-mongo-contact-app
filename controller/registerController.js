import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import userAuth from "../model/userAuthModel.js";
import jwt from "jsonwebtoken";

const createToken = ({ nama, email, _id }) => {
  const option = {
    expiresIn: "3d",
  };
  return jwt.sign({ nama, email, _id }, process.env.JWT_SECRET, option);
};

export const createRegister = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ message: errors.array() });
  const salt = await bcrypt.genSalt(10);
  const data = new userAuth(req.body);
  let { nama, email, password } = data;
  if (password) data.password = await bcrypt.hash(password, salt);
  try {
    const existsNama = await data.collection.findOne({ nama });
    const existsEmail = await data.collection.findOne({ email });
    if (!existsNama && !existsEmail) {
      const signIn = await data.save();
      const token = createToken(signIn);
      res.status(201).json({
        message: "Berhasil Menambahkan Data",
        data: signIn,
        token,
      });
    } else {
      if (existsNama && existsEmail)
        throw new Error("Nama & password Already Exist");
      if (existsNama) throw new Error("Nama Already Exist");
      if (existsEmail) throw new Error("email Already Exist");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
