import { useRef, useState, useEffect } from 'react'
import Editor from '@monaco-editor/react';
import Config from '../config';
import axios from 'axios';
import Cookies from 'js-cookie'; 

function CodeEditor({output, setOutput}) {
  const [language, setLanguage] = useState("javascript")
  const [code, setCode] =  useState("")

  useEffect(() => {
    // Load code from cookies when the component mounts
    const savedCode = Cookies.get('code');
    console.log(savedCode)
    if (savedCode) {
      setCode(savedCode);
    }
  }, []);

  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  function handleEditorChange(value, event) {
    // here is the current value
    console.log("value ", value)
    console.log("event ", event )
    setCode(value);
    Cookies.set('code', value);

  }

  function handleEditorDidMount(editor, monaco) {
    console.log('onMount: the editor instance:', editor);
    console.log('onMount: the monaco instance:', monaco);
    editorRef.current = editor    
    monacoRef.current = monaco
  }

  function handleEditorWillMount(monaco) {
    console.log('beforeMount: the monaco instance:', monaco);
  }

  function handleEditorValidation(markers) {
    // model markers
    markers.forEach(marker => console.log('onValidate:', marker.message));
  }

  async function handleSubmit() {
    console.log("editorRef", editorRef.current);
    console.log("monacoRef", monacoRef.current);
    console.log("code :: \n", editorRef.current.getValue());
    const currentCode = editorRef.current.getValue()
    setCode(currentCode)
    console.log("currentCode ", currentCode)

    try {
        const response = await axios.post(`${Config.SERVER_URL}/code`, { code, language });
        setOutput(response.data.message)
      } catch (error) {
        console.error('Error submitting code:', error);
        alert('Error submitting code');
      }
  }

  function handleLanguageChange(event){
    const selectedLanguage = event.target.value
    console.log("selected ", selectedLanguage)
    setLanguage(selectedLanguage)
  }

  return <div className="">
    <select name="language-dropdown" id="language-dropdown" onChange={handleLanguageChange}  className="">
      <option value="javascript">javascript</option>
      <option value="cpp">C++</option>
    </select>


    <button onClick={handleSubmit}
    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Run</button>
    <Editor
      height="70vh"
      width="40vw"
      theme="vs-dark"
      defaultLanguage={language}
      language={language}
      defaultValue={code}
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
      beforeMount={handleEditorWillMount}
      onValidate={handleEditorValidation}
    />
  </div> 
  
}

export default CodeEditor
