const router = require("express").Router();
const { UserReadingList } = require("../models");

const { userExtractor } = require("../util/middleware");

router.get("/", async (req, res) => {
    const readingList = await UserReadingList.findAll();
    res.json(readingList);
});

router.post("/", async (req, res) => {
    const savedReadingList = await UserReadingList.create(req.body);
    res.status(201).json(savedReadingList);
});

router.put("/:id", userExtractor, async (req, res) => {
    const readingList = await UserReadingList.findByPk(req.params.id);
    if (!readingList) {
        return res.status(404).json({ error: "Reading List not found" });
    } else {
        if (readingList.id === req.user.id) {
            readingList.read = !readingList.read;
            await readingList.save();

            res.status(200).json(readingList);
        } else {
            res.status(401).json({
                error: "You cannot update reading list that isn't yours",
            });
        }
    }
});

module.exports = router;
