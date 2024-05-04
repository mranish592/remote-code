const Config = {
    HTTP_SERVER_URL: process.env.HTTP_SERVER_URL ?? "http://localhost:3000",
    WS_SERVER_URL: process.env.WS_SERVER_URL ?? "ws://localhost:3001",
};

export default Config;
