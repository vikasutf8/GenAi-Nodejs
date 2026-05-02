import OpenAI from 'openai';
import dotenv from 'dotenv';
import { encoding_for_model } from 'tiktoken';

dotenv.config();

const openai = process.env.OPENAI_API_KEY  || null;
console.log(openai);


const client = new OpenAI({ apiKey: openai });


const prompt = 'What is the capital of France?';
const model = 'gpt-3.5-turbo';
const role = 'user';

//calculate tokens of specific input wrt to model that i using ...as role also defined 
const encoding = encoding_for_model(model); // 
const tokens = encoding.encode(prompt); // get tokens for the prompt ONLY 'What is the capital of France?'

console.log(`Number of tokens: ${tokens.length}`);


const response= await client.responses.create({
    model: model,
    input: [
        {
            role: role,
            content: prompt
        },
        // {
        //     role: 'system',
        //     content: 'The capital of France is Paris.'
        // }
    ],
    temperature: 0.7, //bydefualt=1.0, higher values = more creative responses
    max_output_tokens:20, //bydefualt=2048, maximum number of tokens in the responses
    store_history: false, //bydefualt=true, whether to store the conversation history for future reference
    store: false, //bydefualt=true, whether to store the conversation for future reference
});

console.log(response.usage); // here token getting. role, instruction ==> also. token+7, response tokens getting. total token getting. 