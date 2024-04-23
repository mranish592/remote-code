import { useRef, useState, useEffect } from 'react'
import Editor from '@monaco-editor/react';
import Cookies from 'js-cookie'; 

function CodeEditor({ className, language, editorRef}) {
  const [code, setCode] =  useState("")

  useEffect(() => {
    // Load code from cookies when the component mounts
    const savedCode = Cookies.get('code');
    console.log(savedCode)
    if (savedCode) {
      setCode(savedCode);
    }
  }, []);

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
    // monacoRef.current = monaco
  }

  function handleEditorWillMount(monaco) {
    console.log('beforeMount: the monaco instance:', monaco);
  }

  function handleEditorValidation(markers) {
    // model markers
    markers.forEach(marker => console.log('onValidate:', marker.message));
  }

  return <div className={`${className}`}>
    <Editor
      // height="70vh"
      // width="60vw"
      theme="vs-dark"
      defaultLanguage={language}
      language={language}
      defaultValue={code}
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
      beforeMount={handleEditorWillMount}
      onValidate={handleEditorValidation}
      options={{
        minimap: { enabled: false },
      }}
    />
  </div> 
  
}

export default CodeEditor
