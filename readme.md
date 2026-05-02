# Gen-Ai Nodejs


1. OpenAi:
(alias) new OpenAI({ baseURL, apiKey, organization, project, webhookSecret, workloadIdentity, ...opts }?: ClientOptions | undefined): OpenAI


- Roles : [user,system, developer, assitent, tool]
- Reasoning  : how deep search in ans
- instructions: control on result [like : language changes]

- Token


```   temperature: 0.7, //bydefualt=1.0, higher values = more creative responses
    max_output_tokens:20, //bydefualt=2048, maximum number of tokens in the responses
    store_history: false, //bydefualt=true, whether to store the conversation history for future reference
    store: false, //bydefualt=true, whether to store the conversation for future reference
    ```