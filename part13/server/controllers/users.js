const bcrypt = require("bcrypt");
const router = require("express").Router();

const { User, Blog } = require("../models");

const validateUser = (req, res, next) => {
    const { username, password, name } = req.body;

    if (!username || typeof username !== "string") {
        return res
            .status(400)
            .json({ error: "Username is required and must be a string" });
    }

    if (!password || typeof password !== "string" || password.length < 3) {
        return res.status(400).json({
            error: "Password is required, must be a string, and should have 3 or more characters",
        });
    }

    if (!name || typeof name !== "string") {
        return res
            .status(400)
            .json({ error: "Name is required and must be a string" });
    }

    next();
};

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

router.post("/", validateUser, async (req, res) => {
    const { username, password, name } = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = {
        username,
        password: passwordHash,
        name,
    };

    const savedUser = await User.create(newUser);
    res.status(201).json(savedUser);
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

router.put("/:id", async (req, res) => {
    const { username } = req.body;

    if (!username || typeof username !== "string") {
        return res
            .status(400)
            .json({ error: "Username is required and must be a string" });
    }

    const [rowsUpdate, [updatedUser]] = await User.update(
        { username: req.body.username },
        {
            where: {
                id: req.params.id,
            },
            returning: true,
        }
    );

    if (rowsUpdate > 0) {
        return res.json(updatedUser);
    } else {
        return res.status(404).json({ error: "User not found" });
    }
});

module.exports = router;
