const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = require("express").Router();

const { SECRET } = require("../util/config");
const User = require("../models/user");

router.post("/", async (request, response) => {
    const { username, password } = request.body;

    if (!username || !password) {
        return response.status(400).json({
            error: "Username or password is missing",
        });
    }

    const user = await User.findOne({
        where: {
            username: username,
        },
    });

    const passwordCorrect =
        user === null ? false : await bcrypt.compare(password, user.password);

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: "Invalid username or password",
        });
    }

    const userForToken = {
        username: user.username,
        id: user.id,
    };

    const token = jwt.sign(userForToken, SECRET, { expiresIn: "8h" });

    response
        .status(200)
        .send({ token, username: user.username, name: user.name });
});

module.exports = router;
