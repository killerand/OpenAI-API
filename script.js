import { config } from "dotenv";
config();

import OpenAI from "openai";
import readline from "readline";

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "You: ",
});

const chatHistory = [];

async function askGPT(userInput) {
  chatHistory.push({ role: "user", content: userInput });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: chatHistory,
    });

    const reply = response.choices[0].message.content.trim();
    console.log("ChatGPT:", reply);

    chatHistory.push({ role: "assistant", content: reply });
  } catch (error) {
    console.error("Error:", error.message);
  }
}

rl.prompt();

rl.on("line", async (line) => {
  const input = line.trim();
  if (input.toLowerCase() === "exit") {
    console.log("Exiting...");
    rl.close();
    process.exit(0);
  }

  await askGPT(input);
  rl.prompt();
});