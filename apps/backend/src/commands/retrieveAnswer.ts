import { getAnswer } from '../methods/getAnswer';
import { createQAChain } from '../methods/createQAChain';
import { openAiChatModel } from '../services/openAI';
import { prepareStore } from '../methods/prepareStore';

const retrieveAnswer = async (question: string) => {
  const store = await prepareStore();
  const retrievalChain = await createQAChain({ vectorStore: store, languageModel: openAiChatModel });
  const answer = await getAnswer({ question, retrievalChain });
  return answer;
};

export default retrieveAnswer;
