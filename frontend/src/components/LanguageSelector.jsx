import { useEffect } from "react";

function LanguageSelector({ className, setLanguage }) {
    function handleLanguageChange(event) {
        const selectedLanguage = event.target.value;
        console.log("selected ", selectedLanguage);
        setLanguage(selectedLanguage);
    }

    return (
        <div className={`${className}`}>
            <select
                name="language-dropdown"
                id="language-dropdown"
                onChange={handleLanguageChange}
                className="text-sm rounded-lg w-full p-2 bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:ring-primary focus:border-primary hover:bg-slate-500"
            >
                <option value="javascript">javascript</option>
            </select>
        </div>
    );
}

export default LanguageSelector;
