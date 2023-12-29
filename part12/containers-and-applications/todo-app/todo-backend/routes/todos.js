const router = require("express").Router();
const { Todo } = require("../mongo");
const { getAsync, setAsync } = require("../redis");

router.get("/statistics", async (_, res) => {
    const added_todos = parseInt(await getAsync("added_todos")) || 0;

    return res.json({ added_todos: added_todos });
});

router.get("/", async (_, res) => {
    const todos = await Todo.find({});
    res.send(todos);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (todo) {
        res.send(todo);
    } else {
        res.sendStatus(404).end();
    }
});

router.post("/", async (req, res) => {
    const { text } = req.body;
    const todo = await Todo.create({
        text: text,
        done: false,
    });

    const added = parseInt(await getAsync("added_todos")) || 0;
    const total = added + 1;
    await setAsync("added_todos", total);

    res.send(todo);
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { text, done } = req.body;

    let updatedTodo = await Todo.findByIdAndUpdate(
        id,
        { text, done },
        { new: true }
    );

    res.send(updatedTodo);
});

router.delete("/:id", async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (todo) {
        await Todo.findByIdAndRemove(req.params.id);
        res.status(204).end();
    } else {
        res.status(401).end();
    }
});

module.exports = router;

// const express = require("express");
// const { Todo } = require("../mongo");
// const router = express.Router();

// /* GET todos listing. */
// router.get("/", async (_, res) => {
//     const todos = await Todo.find({});
//     res.send(todos);
// });

// /* POST todo to listing. */
// router.post("/", async (req, res) => {
//     const todo = await Todo.create({
//         text: req.body.text,
//         done: false,
//     });
//     res.send(todo);
// });

// const singleRouter = express.Router();

// const findByIdMiddleware = async (req, res, next) => {
//     const { id } = req.params;
//     req.todo = await Todo.findById(id);
//     if (!req.todo) return res.sendStatus(404);

//     next();
// };

// /* DELETE todo. */
// singleRouter.delete("/", async (req, res) => {
//     await req.todo.delete();
//     res.sendStatus(200);
// });

// /* GET todo. */
// singleRouter.get("/", async (req, res) => {
//     res.sendStatus(405); // Implement this
// });

// /* PUT todo. */
// singleRouter.put("/", async (req, res) => {
//     res.sendStatus(405); // Implement this
// });

// router.use("/:id", findByIdMiddleware, singleRouter);
