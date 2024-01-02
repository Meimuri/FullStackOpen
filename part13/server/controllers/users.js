const bcrypt = require("bcrypt");
const router = require("express").Router();

const { User, Blog } = require("../models");

router.put("/:username", async (req, res) => {
    const [rowsUpdate, [updatedUser]] = await User.update(
        { username: req.body.username },
        {
            where: {
                username: req.params.username,
            },
            returning: true,
        }
    );
    res.json(updatedUser);
});

router.get("/", async (req, res) => {
    const users = await User.findAll({
        include: {
            model: Blog,
            attributes: { exclude: ["userId"] },
        },
        attributes: {
            exclude: ["password"],
        },
    });
    res.json(users);
});

router.post("/", async (req, res) => {
    const { username, password, name } = req.body;

    if (password.length < 3) {
        return res
            .status(400)
            .json({ error: "Password should have 3 or more characters" });
    } else {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const newUser = {
            username,
            password: passwordHash,
            name,
        };

        const savedUser = await User.create(newUser);
        res.status(201).json(savedUser);
    }
});

const userFinder = async (req, res, next) => {
    const user = await User.findByPk(req.params.id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    } else {
        req.user = user;
        next();
    }
};

router.get("/:id", userFinder, async (req, res) => {
    res.json(req.user);
});

module.exports = router;
