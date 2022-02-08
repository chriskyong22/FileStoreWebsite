import express, { Router } from "express";
import { getAllFiles, getAllFileLocations } from "../Services/DB"
import path from "path";

export interface FileModel {
    title: string;
    description: string;
    original_name: string;
    hash: string;
    id: string;
}

var router: Router = express.Router();

router.get('/:id', (_req, res, _next) => {
    let options = {
        root: path.join(__dirname, 'files')
    }
    let fileName = "";
    res.sendFile(fileName, options, (error) => {
        console.log(error);
        res.sendStatus(404);
    })
})

router.get('/', async (_req, res) => {
    // @ts-ignore
    getAllFiles().then((result: FileModel[]) => {
        res.send(result);
    }).catch((error) => {
        console.error(error);
        res.sendStatus(500);
    })
    getAllFileLocations().then((result) => {
        console.log(result);
    })
    
})

export default router;