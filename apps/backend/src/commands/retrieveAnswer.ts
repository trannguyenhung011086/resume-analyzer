import crypto from 'crypto';
import { getAnswer } from '../methods/getAnswer';
import { createQAChain } from '../methods/createQAChain';
import { openAiChatModel } from '../services/openAI';
import { prepareStore } from '../methods/prepareStore';
import lruCache from '../services/lruCache';

const hashQuestion = (question: string): string => {
  return crypto.createHash('md5').update(question).digest('hex');
};

/**
 * For demo purpose, retrieve answer for a pre-defined resume only
 * and add it to in-memory LRU cache for reusing
 */
const retrieveAnswer = async (question: string, fileId = 'Hung - resume.pdf') => {
  const cachedKey = hashQuestion(`${fileId}::${question}`);
  console.debug(`generate cachedKey for ${fileId}::${question}`, cachedKey);

  const cachedAnswer = lruCache.get(cachedKey);

  if (cachedAnswer) {
    console.debug(`found cached answer for ${cachedKey}`, cachedAnswer);
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
