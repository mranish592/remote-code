const express = require('express');
const cors = require('cors');
const { z } = require('zod');
const executeJavascript = require('./language_processors/javascript');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS
app.use(cors());

// Define schema for input validation using zod
const inputSchema = z.object({
  code: z.string().min(0), // Ensure code is a non-empty string
  language: z.string().min(1) // Ensure language is a non-empty string
});

// Sample route for GET /
app.get('/', (req, res) => {
  res.json({ message: 'Hello world' });
});

// Sample route for POST /code
app.post('/code', async (req, res) => {
  try {
    const { code, language } = inputSchema.parse(req.body);
    // Validate code and language here
    // For demonstration purposes, simply sending a sample output
    let output  = ""
    switch(language){
      case "javascript":
        output  = await executeJavascript(code)
        break;
      case "cpp":
        output = "Hi from CPP"
        break;
      default:
        output = "Unsupported language"
    }
    res.json({ message: output });
  } catch (error) {
    // If input validation fails, send a generic error response
    console.error('Input validation error:', error);
    res.status(400).json({ error: 'Invalid input' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
