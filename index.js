import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import express from "express";

const app = express();
app.use(express.json());

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
      const response = await ai.models.generateContentStream({
//   const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "vikas Arya is a software engineer",
    config:{
        temperature:0.7, //controls the randomness of the output, higher values make it more random
        systemInstruction:" tell ans in 50 words only",
        thinkingConfig:{
            includeThoughts:true, //whether to include the model's thoughts in the response
            thinkingBudget:1000 //how deep the model should think before answering, in milliseconds
        }
    }
  });
//   console.log(response.text);
// 
  for(const part of response) {
    // console.log(part.text); // now this part.text should print to brosser via route handler
    return res.send(part.text);
    if(part.thoughts) {
        console.log("Model's thoughts:", part.thoughts);
    }
  }
}


const PORT = 3000;

app.get("/generate", async (req, res) => {
    main().then(() => {
        // res.send("Content generation completed. Check the console for output.");
        res.send("Content generation completed. Check the console for output.");
    }).catch((error) => {
        console.error("Error during content generation:", error);
        res.status(500).send("An error occurred during content generation.");
    });
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

await main();