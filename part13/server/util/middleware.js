const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "Unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
    console.error(error.errors);

    if (error.name === "SequelizeDatabaseError") {
        return response.status(400).json({ error: "Malformatted id" });
    } else if (error.name === "SequelizeValidationError") {
        return response.status(400).json({ error: error.message });
    } else {
        response.status(error.status).json({ error: error.message });
    }

    next(error);
};

module.exports = {
    unknownEndpoint,
    errorHandler,
};
