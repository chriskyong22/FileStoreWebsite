import express from "express";
import multer from 'multer'
import { getFileHash } from "../Utilities/helper"
import { getFilePath, storeInDB } from "../Services/DB"
import fs from "fs/promises";

const router: express.Router = express.Router();
const uploadPath = multer({dest: 'files\\'})

router.post('/', uploadPath.single('file'), async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const title = req.body.title;
    const description = req.body.description;
    const file = req.file;
    if (file) {
        console.log(file.filename);
        getFileHash(file.path).then((hash) => {
            console.log(file.path);
            console.log(file.originalname);
            let hashString: string = hash + "";
            storeInDB(file.path, file.originalname, title, description, hashString).then((result) => {
                console.log(`${hash} ${title} ${description}`);
                console.log(result);
                getFilePath(hashString).then((path) => {
                    if (path !== file.path) {
                        fs.unlink(file.path).then((success) => {
                            console.log(`Successfully removed ${success} ${file.path}`)
                        }).catch((error) => {
                            console.error(error);
                        })
                    }
                })
                res.sendStatus(200);
            }).catch((error) => {
                console.error(error);
                res.sendStatus(500);
            });
        }).catch((error: any) => {
            console.log(error);
            res.sendStatus(500);
        })
    }
})

export default router;