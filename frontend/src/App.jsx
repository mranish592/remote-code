import { useState, useRef } from 'react';
import './App.css'
import CodeEditor from './components/CodeEditor';
import CodeOutput from './components/CodeOutput';
import Navbar from './components/Navbar';
import LanguageSelector from './components/LanguageSelector';
import { SubmitButton } from './components/SubmitButton';

function App() {
  const [output, setOutput] = useState("")
  const [language, setLanguage] = useState("javascript")  
  // const [code, setCode] =  useState("")
  const editorRef = useRef(null);

  return <div className='bg-one h-screen'>
    <Navbar className="bg-two text-white min-h-16"></Navbar>
    <div className="mx-8">
      <div className="flex ml-3 my-2">
        <LanguageSelector className="mx-2 my-2" setLanguage={setLanguage}></LanguageSelector>
        <SubmitButton className="mx-2 my-2" setOutput={setOutput} editorRef={editorRef} language={language}></SubmitButton>
      </div>
      <div className="grid sm:grid-cols-12 grid-cols-1">
        <CodeEditor className="flex justify-center items-center sm:ml-4 md:mr-2 sm:my-0 mx-4 mb-2 sm:col-span-7 sm:h-[70vh] h-[45vh]" language={language} editorRef={editorRef}></CodeEditor>
        <CodeOutput className="flex justify-center items-center sm:mr-4 sm:ml-2 sm:my-0 mx-4 mt-2 sm:col-span-5 sm:h-[70vh] h-[35vh]" output={output}></CodeOutput>
      </div>
    </div>
  </div> 
  
}

export default App
