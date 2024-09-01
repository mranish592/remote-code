require("dotenv").config();

const ServerConfig = {
    CODE_FILES_PATH: process.env.CODE_FILES_PATH ?? "code_files",
    WEBSOCKET_PORT: process.env.WEBSOCKET_PORT ?? 80,
    MONGO_URL: process.env.MONGO_URL ?? "mongodb://localhost:27017/remoteCode",
    SERVER_MODE: process.env.SERVER_MODE ?? "BOTH",
};

console.log("config: \n", ServerConfig);

module.exports = ServerConfig;
