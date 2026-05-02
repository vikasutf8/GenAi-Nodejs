# Gen-Ai Nodejs


1. OpenAi:
(alias) new OpenAI({ baseURL, apiKey, organization, project, webhookSecret, workloadIdentity, ...opts }?: ClientOptions | undefined): OpenAI


- Roles : [user,system, developer, assitent, tool]
- Reasoning  : how deep search in ans
- instructions: control on result [like : language changes]

- Token



# Image generation
- const prompt = 'generate Elifi tower image';
- const model = 'dall-e-3'; // model name for image generation || gpt-image-variations-001 for image variations --Only for image variations. DALL-E models are used for generating images from text prompts, while gpt-image-variations-001 is used for creating variations of existing images.
- const role = 'tool';
- const size = '1024x1024'; // image size for DALL-E
- const response_format = 'b64_json'; // response format for DALL-E
- const n = 1; // number of images to generate
