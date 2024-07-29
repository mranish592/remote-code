require("dotenv").config();

const ServerConfig = {
    CODE_FILES_PATH: process.env.CODE_FILES_PATH ?? "code_files",
    HTTP_PORT: process.env.HTTP_PORT ?? 3000,
    WEBSOCKET_PORT: process.env.WEBSOCKET_PORT ?? 3001,
    MONGO_URL: process.env.MONGO_URL ?? "mongodb://localhost:27017/remoteCode",
    SERVER_MODE: process.env.MODE ?? "BOTH",
};

console.log("config: \n", ServerConfig);

module.exports = ServerConfig;
