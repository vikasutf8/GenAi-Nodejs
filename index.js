import OpenAI from 'openai';
import dotenv from 'dotenv';
import { encoding_for_model } from 'tiktoken';
import fs, { writeFileSync } from 'fs';
import express, { application } from 'express'
import multer from 'multer';

const app = express();
app.use(express.json());

dotenv.config();

const openai = process.env.OPENAI_API_KEY  || null;
console.log(openai);
const client = new OpenAI({ apiKey: openai });

const file = fs.createReadStream('./audio.mp3');
const prompt = 'Transcribe this audio file.';
const model = 'whisper-1'; // Specify the model to use for transcription (e.g.,'whisper-1')
const role = 'user';
const language = 'en'; // Specify the language of the audio file (e.g., 'en' for English)

//calculate tokens of specific input wrt to model that i using ...as role also defined 
const encoding = encoding_for_model(model); 
const tokens = encoding.encode(prompt);
console.log(`Number of tokens: ${tokens.length}`);

// now using express js create a server and get fuunctional to accept audio file from broser and then post request that audio file to openai and get the response and then send that response to browser and also save that response in text file. via multer store that file in out server "uplaod folder" and then get that file path and send that file path to openai for transcription.

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/file', (req, res) => {
    //basic html form to upload file
    res.send(`
        <form action="/upload" method="post" enctype="multipart/form-data">
            <input type="file" name="audio" />
            <button type="submit">Upload</button>
        </form>
    `);
    });

app.post('/upload', (req, res) => {
    //handle file upload using multer

    const upload = multer({ dest: 'uploads/' });
    upload.single('audio')(req, res, async (err) => {
        if (err) {
            return res.status(500).send('Error uploading file.');
        }
        const filePath = req.file.path;
        console.log(filePath);
        // now send this file path to openai for transcription
        const response= await client.audio.transcriptions.create({
            model: model,
            file: fs.createReadStream(filePath), 
            language: language,
            prompt: prompt,
            role: role   

        });
        console.log(response.text);
        res.send(response.text);

        // writeFileSync('./transcription.txt', response.text, 'utf-8');
    });
});


// const response= await client.audio.transcriptions.create({
//     model: model,
//     file: file,
//     language: language,
//     prompt: prompt,
//     role: role
// });

// console.log(response.usage); // here token getting. role, instruction ==> also. token+7, response tokens getting. total token getting. 

// return response.text;

// writeFileSync('./transcription.txt', response.text, 'utf-8');