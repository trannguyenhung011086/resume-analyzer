# Resume Q&A Project

This is a learning project to create an OpenAI bot that will be able to answer questions from a PDF resume file.
A practical use case of this is if you are a headhunt and you need to summarize or ask a specific question related to the candidate's skills.

And for demo purpose, I shamelessly use [my resume](apps/backend/src/assets/Hung%20-%20resume.pdf) as a pre-defined asset to test it :D

### Demonstated Skills & Concepts

- Set up a Node.js app using Express.js and TypeScript
- Interact with third-party methods
- Basic usage of OpenAI flow for parsing and analyzing document
- Use caching mechanism to avoid exshausting API limits
- Set up a frontend form to process user input (_TODO_)

## Folder Structure

```
/my-monorepo
│
├── /apps
│   ├── /backend    # Express.js backend
│   │   ├── src
│   │   │   ├── index.ts
│   │   │   └── routes.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── .env
│   └── /frontend   # React.js or any frontend framework
│       ├── src
│       │   ├── index.tsx
│       │   └── App.tsx
│       ├── package.json
│       └── tsconfig.json
├── package.json    # Monorepo-level package.json with workspace settings
└── .gitignore
```

## Backend (apps/backend)

The backend is an Express.js app which expose an endpoint `POST /api/retrieve-answer` to pass the question for the document to multiple methods from `langchain` library to retrieve the final answer.

Overall flow will be like this:
![Flow](apps/backend/src/assets/flow.png)

- Load the PDF document using `PDFLoader`.
- Split the document using `RecursiveCharacterTextSplitter` into smaller chunks of text.
- Generate a vector store to store the documents as vector embeddings so that the text can become searchable. For the demo purpose, this will use `MemoryVectorStore` to store in memory instead of using a persistent storage like Postgres using `pgvector` extension.
- Use `RetrievalQAChain` and set OpenAI's model as LLM and the vector store as the data to process the question from the input.

Notes: to not exhausting OpenAI credits, an in-memory `lruCache` object is used to cache data and result. In reality, we can use Redis cache for this purpose.

A sample response will be like this:
![Sample](apps/backend/src/assets/sample.png)

## Frontend (apps/frontend)

_TODO_
Frontend will be a HTML web page, on which we will render a form where the user can provide questions and click the "Get answer!" button. Once we get the answer from OpenAI using the PDF document, we will render the answer on the web page with a button to copy the answer to the clipboard.

## Deployment

The deployment will use fly.io platform to host.
