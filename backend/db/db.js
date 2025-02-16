// getting-started.js
const mongoose = require("mongoose");
const ServerConfig = require("../config");
const { Schema } = mongoose;

async function connect() {
    try {
        await mongoose.connect(ServerConfig.MONGO_URL);
        console.log("Connected to MongoDB successfully");
    } catch (err) {
        console.log(err);
    }
}

const FullCodeSchema = new mongoose.Schema(
    {
        _id: String,
        code: String,
    },
    { timestamps: true }
);

const FullCode = new mongoose.model("FullCode", FullCodeSchema);

async function findOrCreateFullCode(documentId) {
    const fullCode = await FullCode.findOne({ _id: documentId });
    console.log("fullCode from DB:", fullCode);
    if (fullCode) return fullCode;

    const defaultCode = `/*
Welcome to Remote Code!
This is a collaborative remote code executor.

Remote Code Execution: 
1. Type some javscript code. Example: 'console.log("hello remote code")'
2. Click on Run

Collaboration:
1. Click on Collaborate button and open the link in another browser.
2. Now type code in one browser and observe changes in another.
*/
// Type your code here
    `;

    const doc = await FullCode.create({
        _id: documentId,
        code: defaultCode,
    });
    console.log("fullCode from after saving:", doc);
    return doc;
}

async function findAndUpdateFullCode(documentId, code) {
    return await FullCode.findByIdAndUpdate({ _id: documentId }, { code: code }, { upsert: true });
}

module.exports = { FullCode, connect, findOrCreateFullCode, findAndUpdateFullCode };
