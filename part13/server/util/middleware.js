const unknownEndpoint = (req, res, next) => {
    res.status(404).send({ error: "Unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
    console.error(error.message);

    if (error.name === "SequelizeDatabaseError") {
        return res.status(400).json({ error: "Malformatted id" });
    } else if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ error: error.message });
    } else {
        res.status(error.status || 500).json({
            error: error.message || "Internal Server Error",
        });
    }
};

module.exports = {
    unknownEndpoint,
    errorHandler,
};
