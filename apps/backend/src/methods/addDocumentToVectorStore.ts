import { Document } from '@langchain/core/documents';
import { memoryVectorStore } from '../services/openAI';

export const addDocumentToVectorStore = async (documentSplits: Document[]) => {
  await memoryVectorStore.addDocuments(documentSplits);
  return memoryVectorStore;
};
