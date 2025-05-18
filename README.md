# OpenAI-API Chatbot 🤖

A simple Node.js chatbot that connects to OpenAI's GPT-3.5 API and interacts with users via a browser-based UI.

## 📁 Project Structure

Chatbot/
│
├── public/
│   └── index.html        # Frontend interface  
├── .env                  # Environment file (excluded in .gitignore)  
├── server.js             # Express server setup with OpenAI API call  
└── package.json          # Project metadata and dependencies  

Create a .env file in the root directory
Add your OpenAI API key like this:

.env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
