const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

// Serve the static HTML file
app.use(express.static(path.join(__dirname, 'public')));

const API_KEY = process.env.OPENAI_API_KEY;

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userMessage }]
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    console.log("OpenAI API raw response:", response.data);

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    // Handle the error here
    console.error("OpenAI API error:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || 'Unknown error from OpenAI' });
  }
});



app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
