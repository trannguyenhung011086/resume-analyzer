import path from 'path';
import { addDocumentToVectorStore } from './addDocumentToVectorStore';
import { loadDocument } from './loadDocument';
import { splitDocs } from './splitDocs';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';

/**
 * Prepare in-memory vector store from a pre-defined asset for demo purpose.
 * On production, this should use a vector store on a persistent data store like Postgres.
 */
export const prepareStore = async (fileId = 'Hung - resume.pdf'): Promise<MemoryVectorStore> => {
  const filePaths = [path.resolve(__dirname, '../assets/', fileId)];

  const loadedDocs = await loadDocument(filePaths);
  const splittedDocs = await splitDocs(loadedDocs);
  console.debug('check splittedDocs', { splittedDocs: splitDocs.length });

  return await addDocumentToVectorStore(splittedDocs);
};
