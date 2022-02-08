import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
    res.sendStatus(404);
})

export default router;