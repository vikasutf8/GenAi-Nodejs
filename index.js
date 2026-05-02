import OpenAI from 'openai';
import dotenv from 'dotenv';
import { encoding_for_model } from 'tiktoken';
import {ChatOpenAI} from 'langchain'
import { ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate } from 'langchain/prompts';
import {StringOutputParser, CommaSeparatedOutputParser } from 'langchain/core/output_parsers';
import { VectorStores } from 'openai/resources';

dotenv.config();

const openai = process.env.OPENAI_API_KEY  || null;
console.log(openai);


// const client = new OpenAI({ apiKey: openai });

const model =new ChatOpenAI({
    modelName: 'gpt-3.5-turbo',
    openAIApiKey: openai,
})

async const vectorPrompt = new MemoryVectorStore(new OpenAIEmbeddings());
await vectorPrompt.addDocuments([
    {
        id: '1',
        text: 'What is the capital of France?',
        metadata: { source: 'Wikipedia' },
    },
    {
        id: '2',
        text: 'The capital of France is Paris.',
        metadata: { source: 'Wikipedia' },
    },
]);

const vectorRetriever = vectorPrompt.asRetriever();
vectorRetriever.getRelevantDocuments('What is the capital of France?').then((docs) => {
    console.log(docs);
});

await vectorPrompt.addDocuments(
    new Document({
        id: '3',
        text: 'The capital of France is Paris.',
        metadata: { source: 'Wikipedia' },
    })
)


const chain= prompt.pipe(model);
async function main() {
const prompt = ChatPromptTemplate.fromMessages([
   [SystemMessagePromptTemplate.fromTemplate("You are a helpful assistant that translates English to French."),
    HumanMessagePromptTemplate.fromTemplate("{input}")]
]);
//"{input}" === {input:
const formatedMsg = await prompt.formatPromptValue({input: "What is the capital of France?"}).format();
console.log(formatedMsg);


   const response = await model.invoke(formatedMsg);
   console.log(response); 
}
main