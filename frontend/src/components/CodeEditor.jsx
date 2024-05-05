import { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { io } from "socket.io-client";
import Config from "../config";

const socket = io(Config.WS_SERVER_URL);
socket.on("connect", () => {
    console.log(`websocket connected`);
});
socket.on("server", (message) => {
    console.log("websocket message received:", message);
});

function CodeEditor({ className, language, editorRef, documentId }) {
    const [code, setCode] = useState("");
    const isUserEdit = useRef(true);
    const [readOnly, setReadOnly] = useState(true);

    useEffect(() => {
        socket.on("client-edits", (message) => {
            isUserEdit.current = false;
            console.log("received :: client-edits", JSON.stringify(message));
            editorRef.current.executeEdits("external-client-edits", message);
        });
    }, [socket]);

    useEffect(() => {
        socket.on("sync-code", () => {
            setReadOnly(true);
            console.log("received :: sync-code");
            socket.emit("sync-code", documentId, editorRef.current.getValue());
        });

        socket.on("sync-complete", () => {
            setReadOnly(false);
            console.log("received :: sync-complete");
        });
    }, [documentId]);

    useEffect(() => {
        socket.emit("full-code", documentId);
        console.log("sent :: full-code");

        socket.on("full-code", (fullCode) => {
            console.log("received :: full-code", fullCode);
            setCode(fullCode);
            setReadOnly(false);
        });
    }, [documentId, socket]);

    function handleEditorChange(value, event) {
        // here is the current value
        if (isUserEdit.current) {
            socket.emit("client-edits", event.changes, documentId);
            console.log("sent :: client-edits", JSON.stringify(event.changes));
        } else {
            isUserEdit.current = true;
        }
        setCode(value);
    }

    function handleEditorDidMount(editor, monaco) {
        console.log("onMount: the editor instance:", editor);
        console.log("onMount: the monaco instance:", monaco);

        editorRef.current = editor;
        // monacoRef.current = monaco
    }

    function handleEditorWillMount(monaco) {
        console.log("beforeMount: the monaco instance:", monaco);
    }

    function handleEditorValidation(markers) {
        // model markers
        markers.forEach((marker) => console.log("onValidate:", marker.message));
    }

    return (
        <div className={`${className}`}>
            <Editor
                // height="70vh"
                // width="60vw"
                theme="vs-dark"
                defaultLanguage={language}
                language={language}
                defaultValue={code}
                value={code}
                onChange={handleEditorChange}
                onMount={handleEditorDidMount}
                beforeMount={handleEditorWillMount}
                onValidate={handleEditorValidation}
                options={{
                    minimap: { enabled: false },
                    readOnly: readOnly,
                }}
            />
        </div>
    );
}

export default CodeEditor;
