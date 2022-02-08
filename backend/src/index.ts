import express from "express";
import { closeDatabase } from "./Services/DB"
import UploadRouter from "./Routes/uploadFile"
import getFileRouter from "./Routes/getFiles"
import cors from "cors";

const app: express.Application = express();

const PORT = 3001;

app.use(cors())

app.use('/uploadFile', cors(), UploadRouter);

app.use('/getFile', cors(), getFileRouter);

app.get('/', (_req, res) => {
    res.sendStatus(200);
});


process.once('SIGTERM', () => {
    // Close server.
    closeDatabase();
})

app.listen(PORT);