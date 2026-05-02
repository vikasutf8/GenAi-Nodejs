# Gen-Ai Nodejs


1. OpenAi:
(alias) new OpenAI({ baseURL, apiKey, organization, project, webhookSecret, workloadIdentity, ...opts }?: ClientOptions | undefined): OpenAI


- Roles : [user,system, developer, assitent, tool]
- Reasoning  : how deep search in ans
- instructions: control on result [like : language changes]

- Token



## Embedding:
data---> number ---> store db[vector]
dimensions
generate from json 
 ---> json -->arr --> embedded --> arr-> json

DotProduct --> similiar 
find ans--> most similiar at zero the index

## vector DB : chroma