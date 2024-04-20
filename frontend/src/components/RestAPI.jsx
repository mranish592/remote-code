import React, { useState } from 'react';
import axios from 'axios';
import Config from '../config';

function RestAPI() {
  const [output, setOutput] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');

  const handleGetHello = async () => {
    try {
      const response = await axios.get(`${Config.SERVER_URL}`);
      setOutput(response.data.message);
    } catch (error) {
      console.error('Error fetching hello:', error);
      setOutput('Error fetching hello');
    }
  };

  const handleSubmitCode = async () => {
    try {
      const response = await axios.post('http://localhost:3000/code', { code, language });
      setOutput(response.data.message);
    } catch (error) {
      console.error('Error submitting code:', error);
      setOutput('Error submitting code');
    }
  };

  return (
    <div>
      <h1>API Test</h1>
      <button onClick={handleGetHello}>Get Hello</button>
      <br />
      <br />
      <div>{output}</div>
      <br />
      <h2>Submit Code</h2>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} rows={5} cols={50} />
      <br />
      <input type="text" value={language} onChange={(e) => setLanguage(e.target.value)} placeholder="Language" />
      <button onClick={handleSubmitCode}>Submit Code</button>
    </div>
  );
}

export default RestAPI;
