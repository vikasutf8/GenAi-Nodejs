# Gen-Ai Nodejs


1. OpenAi:
(alias) new OpenAI({ baseURL, apiKey, organization, project, webhookSecret, workloadIdentity, ...opts }?: ClientOptions | undefined): OpenAI


- Roles : [user,system, developer, assitent, tool]
- Reasoning  : how deep search in ans
- instructions: control on result [like : language changes]

- Token


2. Gemini ai

```config:{
        temperature:0.7, //controls the randomness of the output, higher values make it more random
        systemInstruction:" tell ans in 50 words only",
        thinkingConfig:{
            includeThoughts:true, //whether to include the model's thoughts in the response
            thinkingBudget:1000 //how deep the model should think before answering, in milliseconds
        }
    }```

### generateContentStream 