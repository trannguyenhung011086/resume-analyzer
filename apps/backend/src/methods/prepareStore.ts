import path from 'path';
import { getMemoryVectorStore } from './getMemoryVectorStore';
import { loadDocument } from './loadDocument';
import { splitDocs } from './splitDocs';
import lruCache from '../services/lruCache';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';

/**
 * Prepare in-memory vector store from a pre-defined asset for demo purpose.
 * On production, this should use a vector store on a persistent data store like Postgres.
 */
export const prepareStore = async (): Promise<MemoryVectorStore> => {
  const fileId = 'Hung - resume.pdf';
  const filePaths = [path.resolve(__dirname, '../assets/Hung - resume.pdf')];

  const loadedDocs = await loadDocument(filePaths);
  const splittedDocs = await splitDocs(loadedDocs);
  console.debug('check splittedDocs', { splittedDocs: splitDocs.length });

  const cachedStore = lruCache.get(fileId);

  if (cachedStore) {
    console.debug(`found cached store for file ${fileId}`);
    return cachedStore as MemoryVectorStore;
  }

  const store = await getMemoryVectorStore(splittedDocs);
  if (store) {
    lruCache.set(fileId, store);
    console.debug(`cached store for file ${fileId}`);
  }

  return store;
};
