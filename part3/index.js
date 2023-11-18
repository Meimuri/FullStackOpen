const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const Person = require("./models/person");

const morgan = require("morgan");
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :body"
    )
);

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "Malformatted id" });
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    }

    next(error);
};

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "Unknown endpoint" });
};

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

// const generateInfo = () => {
//     const count = persons.length;
//     const date = new Date();
//     return `<p>Phonebook has info for ${count} people.</p><p>${date}</p>`;
// };

// app.get("/api/info", (request, response) => {
//     response.send(generateInfo());
// });

app.get("/api/persons", (request, response) => {
    Person.find({}).then((person) => {
        response.json(person);
    });
});

app.get("/api/persons/:id", (request, response, next) => {
    Person.findById(request.params.id)
        .then((person) => {
            if (person) {
                response.json(person);
            } else {
                response.status(404).end();
            }
        })
        .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({
            error: "Name is missing",
        });
    }

    if (!body.number) {
        return response.status(400).json({
            error: "Number is missing",
        });
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    person
        .save()
        .then((savedPerson) => {
            response.json(savedPerson);
        })
        .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end();
        })
        .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
    const { name, number } = request.body;

    Person.findByIdAndUpdate(
        request.params.id,
        { name, number },
        { new: true, runValidators: true, context: "query" }
    )
        .then((updatedPerson) => {
            response.json(updatedPerson);
        })
        .catch((error) => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
