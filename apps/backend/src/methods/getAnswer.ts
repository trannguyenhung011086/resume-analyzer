import { Runnable } from '@langchain/core/runnables';
import { AnswerRecord } from '../types/answer';

export const getAnswer = async ({
  question,
  retrievalChain,
}: {
  question: string;
  retrievalChain: Runnable;
}): Promise<AnswerRecord | undefined> => {
  const response = await retrievalChain.invoke({ input: question });
  return response;
};
