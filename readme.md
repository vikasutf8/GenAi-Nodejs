# Gen-Ai Nodejs


1. OpenAi:
(alias) new OpenAI({ baseURL, apiKey, organization, project, webhookSecret, workloadIdentity, ...opts }?: ClientOptions | undefined): OpenAI


- Roles : [user,system, developer, assitent, tool]
- Reasoning  : how deep search in ans
- instructions: control on result [like : language changes]

- Token


## LangChain

```const model =new ChatOpenAI({
    modelName: 'gpt-3.5-turbo',
    openAIApiKey: openai,
})```


- function :
- invoke : single questions
- batch : mutliple question
- stream -- data/ans in chunchs


- ChatPromptTemplate
    -   frommssage
    -    fromtemplate


- OutputParser
    -   StringOutputParser
    -   CommaSeparatedOutputParser

- in-memoryDatabase
 --> add
 --> search
 --> delete