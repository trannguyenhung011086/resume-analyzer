import { OpenAIEmbeddings, ChatOpenAI } from '@langchain/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import env from '../env';

export const openAiEmbeddings = new OpenAIEmbeddings({ openAIApiKey: env.OPEN_AI_API_KEY });

export const vectorStore = new MemoryVectorStore(openAiEmbeddings);

export const openAiChatModel = new ChatOpenAI({
  modelName: env.OPEN_AI_MODEL,
  openAIApiKey: env.OPEN_AI_API_KEY,
});
