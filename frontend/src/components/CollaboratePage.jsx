import { useState, useRef, useEffect } from "react";
import CodeEditor from "./CodeEditor";
import CodeOutput from "./CodeOutput";
import Navbar from "./Navbar";
import LanguageSelector from "./LanguageSelector";
import { SubmitButton } from "./SubmitButton";
import { useParams } from "react-router-dom";
import { SaveButton } from "./SaveButton";

export function CollaboratePage() {
    const [output, setOutput] = useState("");
    const [language, setLanguage] = useState("javascript");
    const editorRef = useRef(null);

    const { id: documentId } = useParams();
    console.log("documentId", documentId);

    useEffect(() => {}, [documentId]);

    return (
        <div className="bg-one h-screen">
            <Navbar className="bg-two text-white min-h-16"></Navbar>
            <div className="mx-8">
                <div className="flex ml-3 my-2">
                    <LanguageSelector className="mx-2 my-2" setLanguage={setLanguage}></LanguageSelector>
                    <SubmitButton className="mx-2 my-2" setOutput={setOutput} editorRef={editorRef} language={language}></SubmitButton>
                    <SaveButton className="mx-2 my-2" editorRef={editorRef} documentId={documentId}></SaveButton>
                </div>
                <div className="grid md:grid-cols-12 grid-cols-1">
                    <CodeEditor
                        className="flex justify-center items-center md:ml-4 md:mr-2 md:my-0 mx-4 mb-2 md:col-span-7 md:h-[70vh] h-[45vh]"
                        language={language}
                        editorRef={editorRef}
                        documentId={documentId}
                    ></CodeEditor>
                    <CodeOutput
                        className="flex justify-center items-center md:mr-4 md:ml-2 md:my-0 mx-4 mt-2 md:col-span-5 md:h-[70vh] h-[35vh]"
                        output={output}
                    ></CodeOutput>
                </div>
            </div>
        </div>
    );
}
