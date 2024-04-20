import { useRef, useState } from 'react'
import './App.css'
import Editor from '@monaco-editor/react';

function App() {
  const [language, setLanguage] = useState("javascript")
  const [code, setCode] =  useState("")

  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  function handleEditorChange(value, event) {
    // here is the current value
    console.log("value ", value)
    console.log("event ", event )

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

  function handleSubmit() {
    console.log("editorRef", editorRef.current);
    console.log("monacoRef", monacoRef.current);
    console.log("code :: \n", editorRef.current.getValue());
  }

  function handleLanguageChange(event){
    const selectedLanguage = event.target.value
    console.log("selected ", selectedLanguage)
    // monacoRef.current.editor.setModelLanguage(monacoRef.current.editor.getModel(), selectedLanguage);
    setLanguage(selectedLanguage)
    
    
  }

  return <>
    <h1>Remote code</h1>
    <select name="" id="" onChange={handleLanguageChange}>
      <option value="javascript">javascript</option>
      <option value="cpp">C++</option>
    </select>
    <button onClick={handleSubmit}>submit</button>
    <Editor
      height="70vh"
      theme="vs-dark"
      defaultLanguage={language}
      language={language}
      defaultValue="// some comment"
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
      beforeMount={handleEditorWillMount}
      onValidate={handleEditorValidation}
    />
  </> 
  
}

export default App
