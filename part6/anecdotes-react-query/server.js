import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const validator = (request, response, next) => {
    console.log();

    const { content } = request.body;

    if (request.method === "POST" && (!content || content.length < 5)) {
        return response.status(400).json({
            error: "Anecdotes must have a length of 5 or more characters.",
        });
    } else {
        next();
    }
};

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(validator);
server.use(router);

server.listen(3001, () => {
    console.log("JSON Server is running");
});
