import filmModel from "../model/filmModel.js";
import { validationResult } from "express-validator";
import { ObjectId } from "mongodb";

export const getFilmAll = async (req, res) => {
  try {
    const films = await filmModel.find();
    res.status(200).json(films);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFilmByName = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ message: errors.array() });
  try {
    const dataFilm = await filmModel.collection.findOne({
      nama: req.params.nama,
    });
    if (dataFilm) {
      res.status(201).json({ data: dataFilm });
    } else {
      res.status(200).json({ message: "Data Tidak Ditemukan" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createFilm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ message: errors.array() });
  try {
    const data = new filmModel(req.body);
    const { nama } = data;
    const existsNama = await data.collection.findOne({ nama });
    if (!existsNama) {
      await data.save();
      res.status(201).json({ message: "Berhasil Menambahkan Data" });
    } else {
      res.status(400).json({ message: "Nama Film Sudah Ada" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updatefilm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ message: errors.array() });
  try {
    const id = new ObjectId(req.params.id);
    const existsID = await filmModel.collection.findOne({
      _id: id,
    });
    if (existsID) {
      await filmModel.updateOne({ _id: req.params.id }, { $set: req.body });
      res.status(200).json({ message: "Berhasil Mengupdate data" });
    } else {
      console.log(existsID);
      res.status(400).json({ message: "id Tidak Ditemukan" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message, error: "error" });
  }
};

export const deleteFilm = async (req, res) => {
  try {
    const deletedFilm = await filmModel.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedFilm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
