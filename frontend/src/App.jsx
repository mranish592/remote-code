import { useState } from 'react';
import './App.css'
import CodeEditor from './components/CodeEditor';
import CodeOutput from './components/CodeOutput';

function App() {
  const [output, setOutput] = useState("")

  return <>
    <h1 className="text-4xl font-bold">Remote code</h1>
    <div className="grid grid-cols-2">
    <CodeEditor className="" output={output} setOutput={setOutput}></CodeEditor>
    {/* <h1>Output</h1> */}
    <CodeOutput output={output}></CodeOutput>
    </div>
    
  </> 
  
}

export default App
