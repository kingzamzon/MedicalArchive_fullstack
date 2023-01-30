const
    express = require("express"),
    cors = require("cors"),
    app = express(),
    PORT = process.env.PORT || 8000;

app.use(cors());

app.post(
    "/send",
    (request, response) => {
        setTimeout(() => {
            return response
                .status(200)
                .json({
                    result: true,
                    message: "sent successfully"
                });
        }, 3000);
    }
);

app.delete(
    "/send",
    (request, response) => {
        return response
            .status(200)
            .json({
                result: true,
                message: "deleted successfully"
            });
    }
);

app.listen(
    PORT,
    () => console.log("server listening on " + PORT)
);