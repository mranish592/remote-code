import saveButton from "../assets/save-svgrepo-com.svg";
import Config from "../config";
import { io } from "socket.io-client";
import { useEffect } from "react";

const socket = io(Config.WS_SERVER_URL);
socket.on("connect", () => {
    console.log(`websocket connected`);
});
socket.on("server", (message) => {
    console.log("websocket message received:", message);
});

export function SaveButton({ className, editorRef, documentId }) {
    async function handleSave() {
        const code = editorRef.current.getValue();

        console.log("SaveButton :: handleSave :: currentCode:", code);
        try {
            socket.emit("save-code", documentId, code);
        } catch (error) {
            console.error("SaveButton :: handleSave :: Error submitting code:", error);
            alert("SaveButton :: handleSave :: Error submitting code");
        }
    }

    useEffect(() => {
        socket.on("save-code", (message) => {
            console.log("received :: save-code", JSON.stringify(message));
            if (JSON.parse(message).error != null) {
                alert("SaveButton :: handleSave :: Error submitting code");
            }
        });
    }, [socket]);

    return (
        <div className={`${className}`}>
            <button className="bg-gray-700 p-2 rounded-lg block w-full text-sm hover:bg-gray-600 text-white" onClick={handleSave}>
                <div className="flex text-white items-center">
                    <img src={saveButton} alt="" className="h-4 w-4 mr-1" />
                    <div>Save</div>
                </div>
            </button>
        </div>
    );
}
