import { useRef, useState, useEffect } from 'react'
import Editor from '@monaco-editor/react';
import Config from '../config';
import axios from 'axios';
import Cookies from 'js-cookie'; 

function CodeOutput({className, output, setOutput, editorRef}) {


  return <div className={`${className}`}>
    <Editor
      // height="70vh"
      // width="30vw"
      theme="vs-dark"
      language="plaintext"
      defaultValue=""
      value={output}
      options={{
        readOnly: true,
        minimap: { enabled: false },
        lineNumbers: 'off',
      }}
    />
  </div> 
  
}

export default CodeOutput
