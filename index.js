import OpenAI from 'openai';
import dotenv from 'dotenv';
import { encoding_for_model } from 'tiktoken';

dotenv.config();

const openai = process.env.OPENAI_API_KEY  || null;
const client = new OpenAI({ apiKey: openai });

//2 : maintain context of conversation.
const context = [
    {
        role: 'system',
        content: 'You are a helpful assistant.'
    }
];



function isAnswerComplete(answer) {
const prompt = answer;
const model = 'gpt-3.5-turbo';
const role = 'user';

// if context.length > 10, remove the oldest message
if(context.length > 10) {
    context.shift();
}

//set question in context
context.push({
    role: role,
    content: prompt
});


const encoding = encoding_for_model(model); // 
const tokens = encoding.encode(prompt); 

console.log(`Number of tokens: ${tokens.length}`);


const response= await client.responses.create({
    model: model,
    input: [
        {
            role: role,
            content: prompt
        },
    ],
});

// set context of answer in context
context.push({  
    role: 'assistant',
    content: response.output_text
})
return response.output_text;
}

// console.log(response.usage); // here token getting. role, instruction ==> also. token+7, response tokens getting. total token getting. 


// ask quest
process.stdout.write('Ask a question: ');
process.stdin.on('data', async (data) => {
    const question = data.toString().trim();
    if(question === 'exit') {
        console.log('Exiting...');
        process.exit(0);
    }
    const answer = await isAnswerComplete(question);
    console.log('Answer:', answer);
});