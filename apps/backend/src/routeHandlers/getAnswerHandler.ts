import { Request, Response } from 'express';
import retrieveAnswer from '../commands/retrieveAnswer';

const getAnswerHandler = async (req: Request, res: Response) => {
  // For demo purpose, retrieve answer for a pre-defined resume only
  const { question, fileId = 'Hung - resume.pdf' } = req.body;

  // in reality, we need to have a proper method to check if question is meaningful to proceed
  if (!question || typeof question !== 'string' || question.length <= 3) {
    return res.status(400).json({ error: 'Please enter a valid question.' });
  }

  if (!fileId || typeof fileId !== 'string') {
    return res.status(400).json({ error: 'Please use a valid document.' });
  }

  const result = await retrieveAnswer(question, fileId);

  if (result.outcome === 'error') {
    return res.status(500).json({ error: result.reason });
  }

  return res.json({ data: result.answerRecord });
};

export default getAnswerHandler;
