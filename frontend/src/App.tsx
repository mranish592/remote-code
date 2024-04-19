import './App.css'
import {Editor, OnChange} from '@monaco-editor/react'

function App() {

  const handleEditorChange: OnChange = (value, event) => {
    console.log('here is the current model value:', value);
    console.log('event: ', event)
  };

  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      onChange={handleEditorChange}
    />
  );
}

export default App
