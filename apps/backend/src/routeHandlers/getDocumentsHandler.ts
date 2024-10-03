import { Request, Response } from 'express';
import { documentRepo } from '../repos/documents';

const getDocumentsHandler = async (req: Request, res: Response) => {
  const docs = await documentRepo().getAll();

  return res.json({
    data: docs.map((doc) => ({
      ...doc,
      url: `${req.protocol}://${req.get('host')}/${doc.id}`,
    })),
  });
};

export default getDocumentsHandler;
