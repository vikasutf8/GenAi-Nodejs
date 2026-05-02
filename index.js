import OpenAI from 'openai';
import dotenv from 'dotenv';
import { encoding_for_model } from 'tiktoken';
import fs, { writeFileSync } from 'fs';
import { ChromaClient, CloudClient } from 'chromadb';

dotenv.config();

const openai = process.env.OPENAI_API_KEY  || null;
console.log(openai);

const db = new CloudClient({
    apiKey: process.env.CHROMA_API_KEY || null,
    tenant: process.env.CHROMA_TENANT || null,  
    database: process.env.CHROMA_DATABASE || null,
})

async function dbconnection(){
    await db.client.createCollection({
    name: 'vikash',
    // metadata: {
    //     description: 'This is a collection for storing embeddings related to Vikash Kumar Singh Yadav',
    // },
    });
}


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