import express from "express";
import { connectToDatabase } from "./services/database.service"
import { steamGameRouter } from "./routes/steam-game.router";

const app = express();
const port = 8084; // default port to listen

connectToDatabase()
    .then(() => {
        app.use("/games", steamGameRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });