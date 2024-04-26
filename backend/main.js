const express = require("express");
const cors = require("cors");
const { z } = require("zod");
const executeJavascript = require("./language_processors/javascript");
const { v4: uuidv4 } = require("uuid");
const { Server } = require("socket.io");
const ServerConfig = require("./config");
const { connect, FullCode, findOrCreateFullCode, findAndUpdateFullCode } = require("./db/db");

const app = express();
app.use(express.json());
app.use(cors());

const runCodeInputSchema = z.object({
    language: z.string().min(1),
    code: z.string().min(0),
});

const saveCodeInputSchema = z.object({
    documentId: z.string().min(1),
    code: z.string().min(0),
});

app.get("/", (req, res) => {
    res.json({ message: "Hello world" });
});

app.post("/code", async (req, res) => {
    try {
        const { language, code } = runCodeInputSchema.parse(req.body);

        const codeFileName = uuidv4();
        let output = "";
        switch (language) {
            case "javascript":
                output = await executeJavascript(code, codeFileName);
                break;
            case "cpp":
                output = "CPP is not supported yet. The support will be added soon";
                break;
            default:
                output = "Unsupported language";
        }
        res.json({ message: output });
    } catch (error) {
        console.error("Input validation error:", error);
        res.status(400).json({ error: "Invalid input" });
    }
});

app.post("/save", async (req, res) => {
    try {
        const { documentId, code } = saveCodeInputSchema.parse(req.body);
        await findAndUpdateFullCode(documentId, code);
        res.json({ message: "code saved successfully" });
    } catch (error) {
        console.error("Input validation error:", error);
        res.status(400).json({ error: "Invalid input" });
    }
});

connect();

app.listen(ServerConfig.HTTP_PORT, () => {
    console.log(`Server is running at http://localhost:${ServerConfig.HTTP_PORT}`);
});

const ws = new Server(ServerConfig.WEBSOCKET_PORT, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
ws.on("connection", (socket) => {
    console.log(`connect ${socket.id}`);
    socket.on("disconnect", (reason) => {
        console.log(`disconnect ${socket.id} due to ${reason}`);
    });

    socket.on("full-code", async function (documentId) {
        console.log("receive :: full-code ::", documentId);
        socket.join(documentId);
        const rooms = socket.adapter.rooms.get(documentId);
        if (rooms && rooms.size === 1) {
            socket.emit("full-code", "// type your code here");
            socket.emit("sync-complete", "");
        }
        socket.broadcast.to(documentId).emit("sync-code", "");
        console.log("sent :: sync-code ::", documentId);
    });

    socket.on("sync-code", async function (documentId, code) {
        console.log("receive :: sync-code ::", documentId, code);
        await findAndUpdateFullCode(documentId, code);
        socket.broadcast.to(documentId).emit("full-code", code);
        console.log("sent :: full-code ::", documentId, code);
        socket.emit("sync-complete", "");
        console.log("sent :: sync-complete");
    });

    socket.on("client-edits", (edits, documentId) => {
        console.log("receive :: client-edits ::", JSON.stringify(edits));
        socket.broadcast.to(documentId).emit("client-edits", edits);
        console.log("sent :: client-edits ::", JSON.stringify(edits));
    });
});
