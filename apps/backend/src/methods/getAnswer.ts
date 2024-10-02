import { Runnable } from '@langchain/core/runnables';

export const getAnswer = async ({
  question,
  retrievalChain,
}: {
  question: string;
  retrievalChain: Runnable;
}): Promise<string | undefined> => {
  const response = await retrievalChain.invoke({ input: question });
  return response;
};
