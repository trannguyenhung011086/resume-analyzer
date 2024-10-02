import { Request, Response } from 'express';
import { documentRepo } from '../repos/documents';

const getDocumentsHandler = async (_req: Request, res: Response) => {
  const docs = await documentRepo().getAll();
  return res.json({ data: docs });
};

export default getDocumentsHandler;
