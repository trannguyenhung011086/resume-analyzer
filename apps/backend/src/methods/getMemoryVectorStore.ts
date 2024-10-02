import { Document } from '@langchain/core/documents';
import { vectorStore } from '../services/openAI';

export const getMemoryVectorStore = async (documentSplits: Document[]) => {
  await vectorStore.addDocuments(documentSplits);
  return vectorStore;
};
