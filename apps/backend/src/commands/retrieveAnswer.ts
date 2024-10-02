import { getAnswer } from '../methods/getAnswer';
import { createQAChain } from '../methods/createQAChain';
import { openAiChatModel } from '../services/openAI';
import { prepareStore } from '../methods/prepareStore';
import lruCache from '../services/lruCache';

/**
 * For demo purpose, retrieve answer for a pre-defined resume only
 */
const retrieveAnswer = async (question: string, fileId = 'Hung - resume.pdf') => {
  const cachedKey = `${fileId}::answer`;
  const cachedAnswer = lruCache.get(cachedKey);

  if (cachedAnswer) {
    console.debug(`found cached answer for ${cachedKey}`);
    return cachedAnswer;
  }

  const store = await prepareStore(fileId);
  const retrievalChain = await createQAChain({ vectorStore: store, languageModel: openAiChatModel });
  const answer = await getAnswer({ question, retrievalChain });

  if (answer) {
    lruCache.set(cachedKey, answer);
    console.debug(`cached answer for ${cachedKey}`);
  }

  return answer;
};

export default retrieveAnswer;
