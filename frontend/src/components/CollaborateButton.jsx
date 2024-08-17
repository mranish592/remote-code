import collaborateButton from "../assets/person-add-svgrepo-com.svg";
import { Tooltip } from "react-tooltip";
import { useState } from "react";

export function CollaborateButton({ className }) {
    const [toolTipText, setToolTipText] = useState("Copy collaboration link");
    async function handleCollaborate() {
        const url = window.location.href;
        copyToClipboard(url);
        setToolTipText("Link copied!");
        setTimeout(() => {
            setToolTipText("Copy collaboration link");
        }, 5000);
    }
    return (
        <div className={`${className}`}>
            <button className="bg-gray-700 p-2 rounded-lg block w-full text-sm hover:bg-gray-600 text-white" onClick={handleCollaborate}>
                <div
                    className="flex text-white items-center"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={toolTipText}
                    data-tooltip-place="right"
                    data-tooltip-delay-hide={500}
                >
                    <img src={collaborateButton} alt="" className="h-4 w-4 mr-1" />
                    <div>Collaborate</div>
                </div>
            </button>
            <Tooltip id="my-tooltip" />
        </div>
    );
}

function copyToClipboard(text) {
    navigator.clipboard
        .writeText(text)
        .then(() => {
            console.log("Text copied to clipboard");
        })
        .catch((err) => {
            console.error("Failed to copy text: ", err);
        });
}
