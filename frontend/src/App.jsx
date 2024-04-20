import './App.css'

import RestAPI from './components/RestAPI';
import CodeEditor from './components/CodeEditor';

function App() {
  return <>
    <h1>Remote code</h1>
    <RestAPI></RestAPI>
    <CodeEditor></CodeEditor>
    <CodeEditor></CodeEditor>
  </> 
  
}

export default App
