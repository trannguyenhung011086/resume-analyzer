import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';

export const loadDocument = async (filePaths: string[]) => {
  const docs = await Promise.all(
    filePaths.map(async (filePath) => {
      const loader = new PDFLoader(filePath);
      const docs = await loader.load();
      return docs;
    })
  );
  return docs.flat();
};
