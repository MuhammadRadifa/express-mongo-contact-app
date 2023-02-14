import user from "../model/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await user.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserByid = async (req, res) => {
  try {
    const userById = await user.findById(req.params.id);
    res.json(userById);
  } catch (error) {
    res.status(404).json({ message: error.message, response: "Error Coy" });
  }
};

export const saveUser = async (req, res) => {
  //inisialisasi
  const classUser = new user(req.body);
  try {
    const insertedUser = await classUser.save();
    res.status(201).json(insertedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await user.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await user.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
