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
    const collection =await db.client.createCollection({
    name: 'vikash',
    // metadata: {
    //     description: 'This is a collection for storing embeddings related to Vikash Kumar Singh Yadav',
    // },
    });
    collection.add({ 
        ids: ['1'],
        embeddings: [[0.1, 0.2, 0.3, 0.4, 0.5]],
        metadatas: [{ name: 'Vikash Kumar Singh Yadav', description: 'This is a sample embedding for Vikash Kumar Singh Yadav' }],
        documents: ['This is a sample document for Vikash Kumar Singh Yadav'],
    });
}

async function findsimilar(){
    const collection = await db.client.getCollection('vikash');
    const queryEmbedding = [0.1, 0.2, 0.3, 0.4, 0.5];
    const results = await collection.query({
        query_embeddings: [queryEmbedding],
        n_results: 1, 
    });
    console.log(results);
}

// dbconnection();
findsimilar();


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