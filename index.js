import OpenAI from 'openai';
import dotenv from 'dotenv';
import { encoding_for_model } from 'tiktoken';
import fs from 'fs';

dotenv.config();

const openai = process.env.OPENAI_API_KEY  || null;
const client = new OpenAI({ apiKey: openai });


const prompt = 'generate Elifi tower image';
const model = 'dall-e-3'; // model name for image generation || gpt-image-variations-001 for image variations --Only for image variations. DALL-E models are used for generating images from text prompts, while gpt-image-variations-001 is used for creating variations of existing images.
const role = 'tool';
const size = '1024x1024'; // image size for DALL-E
const response_format = 'b64_json'; // response format for DALL-E
const n = 1; // number of images to generate


const encoding = encoding_for_model(model); // 
const tokens = encoding.encode(prompt); 
console.log(`Number of tokens: ${tokens.length}`);


const response= await client.images.generate({
    model: model,
    prompt: prompt,
    size: size,
    response_format: response_format,
    n: n
});



console.log(response); // here token getting. role, instruction ==> also. token+7, response tokens getting. total token getting. 
const rawbase64 = response.data[0].b64_json; // get the base64 string from the response
const base64Data = rawbase64.replace(/^data:image\/\w+;base64,/, ''); // remove the data URL prefix
const buffer = Buffer.from(base64Data, 'base64'); // convert base64 string to buffer

fs.writeFile('generated_image.png', buffer, (err) => {
    if (err) {
        console.error('Error saving the image:', err);
    } else {
        console.log('Image saved successfully as generated_image.png');
    }
});