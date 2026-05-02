# Gen-Ai Nodejs


1. OpenAi:
(alias) new OpenAI({ baseURL, apiKey, organization, project, webhookSecret, workloadIdentity, ...opts }?: ClientOptions | undefined): OpenAI


- Roles : [user,system, developer, assitent, tool]
- Reasoning  : how deep search in ans
- instructions: control on result [like : language changes]

- Token


## Audio to text
-  Transcriptions feature

- const file = fs.createReadStream('./audio.mp3');
const prompt = 'Transcribe this audio file.';
- const model = 'whisper-1'; // Specify the model to use for transcription (e.g., 'whisper-1')
- const role = 'user';
- const language = 'en'; // Specify the language of the audio file (e.g., 'en' for English)


## Text to audio

-   const model = 'gpt-4o'; // Specify the model to use for transcription (e.g.,'whisper-1')
-     const prompt = 'What is the capital of France?';
 -    const language = 'en'; // Specify the language of the audio file (e.g., 'en' for English)
-     const voice = 'alloy'; // Specify the voice to use for synthesis (e.g., 'alloy')

