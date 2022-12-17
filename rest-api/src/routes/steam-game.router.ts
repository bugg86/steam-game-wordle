import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import SteamGame from "../models/steam-game";

export const steamGameRouter = express.Router();

steamGameRouter.use(express.json());

steamGameRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const games = (await collections.games.find({}).toArray()) as unknown as SteamGame[];

        res.status(200).send(games);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

steamGameRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        console.log(id);
        
        const query = { steam_appid: Number(id) };
        const game = (await collections.games.find(query).toArray()) as unknown as SteamGame;

        if (game) {
            res.status(200).send(game);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

steamGameRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newSteamGame = req.body as SteamGame;
        const result = await collections.games.insertOne(newSteamGame);

        result
            ? res.status(201).send(`Successfully created a new game with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new game.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

steamGameRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedSteamGame: SteamGame = req.body as SteamGame;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.games.updateOne(query, { $set: updatedSteamGame });

        result
            ? res.status(200).send(`Successfully updated game with id ${id}`)
            : res.status(304).send(`Game with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

steamGameRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.games.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed game with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove game with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Game with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});