import express, { Express } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './routers';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { Server, Socket } from 'socket.io'
import { SocketGuard } from './middlewares/socket.guard';
import socketHandlers from './sockets';
const http = require('http');

dotenv.config();
const port = process.env.PORT || 9000;
const clientOrigin = process.env.CLIENT_ORIGIN

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: clientOrigin, methods: ["GET", "POST"], credentials: true } });

const url = process.env.DATABASE_URL || ""
mongoose.connect(url, { autoIndex: true }, (err) => {
  if (err)
    console.log(err);
  console.log("Database connect successfully !");
});

app.use(cors())
app.use(express.json());
app.use(cookieParser())
app.use("/api", router);

io.use(SocketGuard).on('connection', function connectionHandler(socket: Socket) {
  socketHandlers(io, socket)
});

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});