import { Request, Response } from 'express';
import retrieveAnswer from '../commands/retrieveAnswer';

const getAnswerHandler = async (req: Request, res: Response) => {
  const { question } = req.body;

  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Please enter a valid question.' });
  }

  const answer = await retrieveAnswer(question);

  if (!answer) {
    return res.status(500).json({ error: 'Failed to get answer.' });
  }

  return res.json({ answer });
};

export default getAnswerHandler;
