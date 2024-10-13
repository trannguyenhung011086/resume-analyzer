# Resume Q&A Project

This is a learning project to create an OpenAI bot that will be able to answer questions from a parsed document.

Some use cases:

- You are a headhunt and you want to have a quick scan of a candidate's resume to get his/her most notable skills.
- You are a customer support and you want to upload a Knowledge base document to let users easily ask questions for it.

Actually, OpenAI can process many kind of documents. But for a better learning scope, this project focuses on parsing resume pdf files only.

And for demo purpose, I shamelessly use [my resume](apps/backend/src/assets/Hung%20-%20resume.pdf) as a pre-defined document to verify it :D

### Demonstrated Skills

- [x] Set up a Node.js app using Express.js and TypeScript
- [x] Set up a frontend to process user input with React and Vite
- [x] Interact with third-party SDKs like OpenAI
- [x] Get a basic concept of using OpenAI for parsing and analyzing documents
- [x] Use caching mechanism to avoid exshausting OpenAI credits
- [ ] Deploy backend and frontend apps separately to fly.io platform as different services like in real world projects (_TODO_)

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

Endpoints:

- `GET /documents`: return a list of candidate's profiles. For demo purpose, this is an in-memory object instead of using a real database like Postgres.
- `POST /retrieve-answer`: pass user question for a specific file

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

Frontend will be a HTML web page, on which we will render a form where the user can provide questions and click the "Get answer!" button.
Once we get the answer from OpenAI using the PDF document, we will render the answer on the web page with a button to copy the answer to the clipboard.

Components:

- ProfileList: display a list of candidate's profiles to select. The list will be fetched on page load, and the first record is used as default selection.
- PDFViewer: render the PDF file for selected profile.
- QuestionForm: render a form for user to input questions for the selected profile.

![Sample FE](apps/backend/src/assets/sample_fe.png)

## Deployment

The deployment will use fly.io platform to create 2 separate apps for backend and frontend.

_NOTE 1_
Fly.io requires a credit card to create fly machine, so the deployment for this app will fail :(

```
hungtran@Hungs-Mac-mini backend % fly machine create --app resume-analyzer-api --name my_machine registry.fly.io/resume-analyzer-api:latest
Searching for image 'registry.fly.io/resume-analyzer-api:latest' remotely...
image found: img_nk3yvlnz2zmdpome
Image: registry.fly.io/resume-analyzer-api:latest
Image size: 163 MB

Error: could not launch machine: failed to launch VM: machines are disabled for this organization (Request ID: 01JA3654R1ESFQV2R3EC1RFAGJ-hkg)
```

_NOTE 2_
Reference to use Terraform with Fly provider, but they are abandonned now :(

- https://github.com/fly-apps/terraform-provider-fly/blob/main/examples/main.tf
- https://github.com/fly-apps/terraformed-machines/blob/main/main.tf

## Some improvement ideas

- Add an endpoint to allow uploading pdf files
- Add a controller to store pdf files on Postgres
- Add methods to store questions and answers on Postgres
- Use Redis to cache answers from OpenAI
- Use server push event or websocket to stream answer response to frontend
