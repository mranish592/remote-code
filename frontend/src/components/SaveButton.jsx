import saveButton from "../assets/save-svgrepo-com.svg";
import axios from "axios";
import Config from "../config";

export function SaveButton({ className, editorRef, documentId }) {
    async function handleSave() {
        const code = editorRef.current.getValue();

        console.log("SaveButton :: handleSave :: currentCode: ", code);
        try {
            const response = await axios.post(`${Config.SERVER_URL}/save`, {
                code: code,
                documentId: documentId,
            });
            console.log("SaveButton :: handleSave :: response:", response);
        } catch (error) {
            console.error("SaveButton :: handleSave :: Error submitting code:", error);
            alert("SaveButton :: handleSave :: Error submitting code");
        }
    }
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
