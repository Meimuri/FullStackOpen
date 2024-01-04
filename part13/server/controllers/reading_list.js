const router = require("express").Router();
const { UserReadingList } = require("../models");

router.get("/", async (req, res) => {
    const readingList = await UserReadingList.findAll();
    res.json(readingList);
});

router.post("/", async (req, res) => {
    const savedReadingList = await UserReadingList.create(req.body);
    res.status(201).json(savedReadingList);
});

module.exports = router;
