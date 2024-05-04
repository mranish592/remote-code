import Config from "../config";
import axios from "axios";
import playButton from "../assets/play-button-svgrepo-com.svg";

export function SubmitButton({ className, editorRef, setOutput, language }) {
    async function handleSubmit() {
        const code = editorRef.current.getValue();
        console.log("SubmitButton :: handleSubmit :: currentCode: ", code);

        try {
            const response = await axios.post(`${Config.HTTP_SERVER_URL}/code`, {
                code: code,
                language: language,
            });
            setOutput(response.data.message);
        } catch (error) {
            console.error("SubmitButton :: handleSubmit :: Error submitting code:", error);
            alert("SubmitButton :: handleSubmit :: Error submitting code");
        }
    }

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
