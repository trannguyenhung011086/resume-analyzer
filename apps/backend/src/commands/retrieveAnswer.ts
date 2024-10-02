import crypto from 'crypto';
import { getAnswer } from '../methods/getAnswer';
import { createQAChain } from '../methods/createQAChain';
import { openAiChatModel } from '../services/openAI';
import { prepareStore } from '../methods/prepareStore';
import lruCache from '../services/lruCache';
import { documentRepo } from '../repos/documents';
import { AnswerRecord } from '../types/answer';

const hashQuestion = (question: string): string => {
  return crypto.createHash('md5').update(question).digest('hex');
};

type RetrieveAnswerSuccessOutcome = {
  outcome: 'success';
  answerRecord: AnswerRecord;
};
type RetrieveAnswerErrorOutcome = {
  outcome: 'error';
  reason: 'File not found' | 'Failed to get answer';
};

/**
 * Retrieve answer for a document.
 * For demo purpose, store it to an in-memory LRU cache for using.
 */
const retrieveAnswer = async (
  question: string,
  fileId: string
): Promise<RetrieveAnswerSuccessOutcome | RetrieveAnswerErrorOutcome> => {
  const cachedKey = hashQuestion(`${fileId}::${question}`);
  console.debug(`generate cachedKey for ${fileId}::${question}`, cachedKey);

  const cachedAnswer = lruCache.get(cachedKey);
  if (cachedAnswer) {
    console.debug(`found cached answer for ${cachedKey}`, cachedAnswer);
    return {
      outcome: 'success',
      answerRecord: cachedAnswer as AnswerRecord,
    };
  }

  const doc = await documentRepo().getById(fileId);
  if (!doc?.path) {
    return {
      outcome: 'error',
      reason: 'File not found',
    };
  }

  const store = await prepareStore(doc.path);
  const retrievalChain = await createQAChain({ vectorStore: store, languageModel: openAiChatModel });

  const answerRecord = await getAnswer({ question, retrievalChain });
  if (!answerRecord) {
    return {
      outcome: 'error',
      reason: 'Failed to get answer',
    };
  }

  lruCache.set(cachedKey, answerRecord);
  console.debug(`cached answer for ${cachedKey}`);

  return {
    outcome: 'success',
    answerRecord,
  };
};

export default retrieveAnswer;
