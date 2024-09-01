import Config from "../config";
import playButton from "../assets/play-button-svgrepo-com.svg";
import { io } from "socket.io-client";
import { useEffect } from "react";

const socket = io(Config.WS_SERVER_URL);
socket.on("connect", () => {
    console.log(`websocket connected`);
});
socket.on("server", (message) => {
    console.log("websocket message received:", message);
});
export function SubmitButton({ className, editorRef, setOutput, language }) {
    async function handleSubmit() {
        const code = editorRef.current.getValue();
        console.log("SubmitButton :: handleSubmit :: currentCode: ", code);

        try {
            socket.emit("run-code", language, code);
        } catch (error) {
            console.error("SubmitButton :: handleSubmit :: Error submitting code:", error);
            alert("SubmitButton :: handleSubmit :: Error submitting code");
        }
    }

    useEffect(() => {
        socket.on("run-code", (message) => {
            console.log("received :: run-code", JSON.stringify(message));
            const newOutput = JSON.parse(message).message;
            setOutput(newOutput);
        });
    }, [socket]);

    return (
        <div className={`${className}`}>
            <button onClick={handleSubmit} className="bg-three p-2 rounded-lg block w-full text-sm hover:bg-four">
                <div className="flex text-white items-center">
                    <img src={playButton} alt="" className="h-4 w-4 mr-1" />
                    <div>Run</div>
                </div>
            </button>
        </div>
    );
}
