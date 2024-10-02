import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { createRetrievalChain } from 'langchain/chains/retrieval';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { ChatOpenAI } from '@langchain/openai';

export const createQAChain = async ({
  vectorStore,
  languageModel,
}: {
  vectorStore: MemoryVectorStore;
  languageModel: ChatOpenAI;
}) => {
  const prompt = ChatPromptTemplate.fromTemplate(
    `Answer the user's question: {input} based on the following context {context}`
  );

  const combineDocsChain = await createStuffDocumentsChain({
    llm: languageModel,
    prompt,
  });
  const retriever = vectorStore.asRetriever();

  const retrievalChain = await createRetrievalChain({
    combineDocsChain,
    retriever,
  });

  return retrievalChain;
};
