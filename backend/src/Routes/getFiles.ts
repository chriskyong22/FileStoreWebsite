import express, { Router } from "express";
import { getAllFileLocations, getAllFiles, getFilePath } from "../Services/DB"
import path from "path";

export interface FileModel {
    title: string;
    description: string;
    original_name: string;
    hash: string;
    id: string;
}

var router: Router = express.Router();

router.get('/id/:id', (req, res) => {
    let id = req.params.id;

    let options = {
        root: path.join(__dirname, 'files')
    }
    console.log(options, id);
    res.sendStatus(200);
})

router.get('/hash/:hash', (req, res) => {
    if (req.params.hash) {
        getFilePath(req.params.hash).then((filePath) => {
            if (filePath) {
                const BASEPATH = __dirname + "/../../files/";
                let options = {
                    root: path.join(BASEPATH)
                }
                res.sendFile(filePath['path'], options, (error) => {
                    if (error) {
                        console.error(error);
                    } else {
                        console.log("Sending");
                    }
                })
            } else {
                res.sendStatus(404);
            }
        })
    } else {
        res.sendStatus(403);
    }
})

router.get('/', async (_req, res) => {
    getAllFiles().then((result) => {
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