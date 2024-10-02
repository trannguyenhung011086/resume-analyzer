import { Document } from '@langchain/core/documents';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

export const splitDocs = async (docs: Document[]) => {
  const textSplitter = new RecursiveCharacterTextSplitter();
  const listOfSplitDocs = await textSplitter.splitDocuments(docs);
  return listOfSplitDocs;
};
