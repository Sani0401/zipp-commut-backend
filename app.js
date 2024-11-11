import express from "express";
import router from "./router.js";
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(PORT, () => {
  console.log("Listening on pport 3000");
});
