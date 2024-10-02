import { Router } from 'express';
import { withAsyncRequestHandling } from './middlewares/withAsyncRequest';
import getAnswerHandler from './routeHandlers/getAnswerHandler';
import getDocumentsHandler from './routeHandlers/getDocumentsHandler';

const router = Router();

router.get('/documents', withAsyncRequestHandling(getDocumentsHandler));
router.post('/retrieve-answer', withAsyncRequestHandling(getAnswerHandler));

export default router;
