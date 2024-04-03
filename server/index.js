
import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import { insertMessage, removeMessage, removeAllMessage, getAllMessage } from "./mongoAPI.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/comment", (req, res) => {
    res.send(db);
});

app.get("/", (req, res) => {
    res.send("Hello this is work now!");
});

app.post("/comment", async (req, res) => {
    const message = req.body.message;
    await insertMessage(message);
    res.status(201).send("OK");
});

app.delete("/comment", async (req, res) => {
    const _id = req.body._id;
    await removeMessage(_id);
    res.status(200).send("Delete the message");
});

app.delete("/comment/all", async (req, res) => {
    await removeAllMessage()
    res.status(200).send("Deleting collection...");
});

app.get("/comment/all", async (req, res) => {
    const AllMessage = await getAllMessage()
    res.status(200).send(AllMessage);
});

app.listen(418, () => {
    console.log("comment service running on port 418..");
});
