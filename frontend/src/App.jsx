import { v4 as uuidv4 } from "uuid";

import { CollaboratePage } from "./components/CollaboratePage";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to={`/documents/${uuidv4()}`} />} />
                <Route path="/documents/:id" element={<CollaboratePage />} />
            </Routes>
        </Router>
    );
}

export default App;
