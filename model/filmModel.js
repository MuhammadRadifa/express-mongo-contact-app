import mongoose from "mongoose";

const film = mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  deskripsi: {
    type: String,
    required: true,
  },
});

export default mongoose.model("film", film);
