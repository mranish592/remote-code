require("dotenv").config();

const ServerConfig = {
    CODE_FILES_PATH: "../code_files",
    HTTP_PORT: 3000,
    WEBSOCKET_PORT: 3001,
    MONGO_URL: "mongodb+srv://anish:mongopass@cluster0.df0dhdo.mongodb.net/remoteCode",
};

module.exports = ServerConfig;
