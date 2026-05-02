import OpenAI from 'openai';
import dotenv from 'dotenv';
import { encoding_for_model } from 'tiktoken';
import fs, { writeFileSync } from 'fs';

dotenv.config();

const openai = process.env.OPENAI_API_KEY  || null;
console.log(openai);


const client = new OpenAI({ apiKey: openai });
const arr =['Vikas', 'Vikash', 'Vikash Kumar', 'Vikash Kumar Singh', 'Vikash Kumar Singh Yadav'];

const response= await client.embeddings.create({
    model: 'text-embedding-ada-002',
    input: arr
});

const embeddings = response.data.map((item,index) => {
 
       return { [arr[index]]: item.embedding }
  
});
writeFileSync('embedding.json', JSON.stringify(embeddings));

// console.log(response,data); 
// writeFileSync('embedding.json', JSON.stringify(response.data[0].embedding));