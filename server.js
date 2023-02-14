import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { serverConnect } from "./database/connect.js";
import indexRoute from "./routes/index.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

//Connect to db
serverConnect();

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//allow all browser to fetch api
app.use(cors());

//set Route
app.use(indexRoute);

app.listen(port, () =>
  console.log(`Server up and running at Port http://localhost:${port}`)
);
