import bycrypt from "bcrypt";
import userAuth from "../model/userAuthModel.js";
import jwt from "jsonwebtoken";

const createToken = ({ nama, email, _id }) => {
  const option = {
    expiresIn: "3d",
  };
  return jwt.sign({ nama, email, _id }, process.env.JWT_SECRET, option);
};

export const loginUser = async (req, res) => {
  try {
    const data = new userAuth(req.body);
    let { email, password } = data;
    const User = await data.collection.findOne({ email });
    if (!User) throw new Error("Cannot Find email");
    const match = await bycrypt.compare(password, User.password);
    if (!match) throw new Error("password not match");
    const token = createToken(User);
    res.status(200).json({
      message: "Berhasil Login",
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
