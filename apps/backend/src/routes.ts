import { Router } from 'express';
import getAnswerHandler from './routeHandlers/getAnswerHandler';
import { withAsyncRequestHandling } from './middlewares/withAsyncRequest';

const router = Router();

router.post('/get-answer', withAsyncRequestHandling(getAnswerHandler));

export default router;
