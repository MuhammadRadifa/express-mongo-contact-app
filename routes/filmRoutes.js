import express from "express";
import {
  createFilm,
  updatefilm,
  getFilmByName,
  deleteFilm,
  getFilmAll,
} from "../controller/filmController.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/film", [[body("nama").isString()]], createFilm);
router.put("/film/:id", [[body("nama").isString()]], updatefilm);
router.get("/film/:nama", getFilmByName);
router.get("/film", getFilmAll);
router.delete("/film/:id", deleteFilm);

export default router;
