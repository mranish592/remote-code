const executeJavascript = require("./language_processors/javascript");
const { v4: uuidv4 } = require("uuid");
const { Server } = require("socket.io");
const ServerConfig = require("./config");
const { connect, findAndUpdateFullCode } = require("./db/db");

connect();

if (ServerConfig.SERVER_MODE === "WS" || ServerConfig.SERVER_MODE == "BOTH") {
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

        socket.on("run-code", async function (language, code) {
            try {
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
                socket.emit("run-code", JSON.stringify({ message: output }));
            } catch (error) {
                console.error("Internal Server Error:", error);
                socket.emit("run-code", JSON.stringify({ error: "Internal Server Error" }));
            }
        });

        socket.on("save-code", async function (documentId, code) {
            try {
                await findAndUpdateFullCode(documentId, code);
                socket.emit("save-code", JSON.stringify({ message: "code saved successfully" }));
            } catch (error) {
                console.error("Internal Server Error:", error);
                socket.emit("save-code", JSON.stringify({ error: "Internal Server Error" }));
            }
        });
    });
}
