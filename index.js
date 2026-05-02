import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

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
    console.log(part.text);
  }
}

await main();