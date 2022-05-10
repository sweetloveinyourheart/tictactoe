import express, { Express } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './routers';
import cookieParser from 'cookie-parser'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 9000;

const url = process.env.DATABASE_URL || ""
mongoose.connect(url, { autoIndex: true }, (err) => {
  if(err) console.log(err);
  console.log("Database connect successfully !");
});

app.use(express.json());
app.use(cookieParser())
app.use("/", router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});