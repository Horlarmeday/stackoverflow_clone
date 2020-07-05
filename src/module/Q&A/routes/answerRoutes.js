import { Router } from 'express';
import AnswerController from '../controller/AnswerController';
import verify from '../../../middleware/verify';

const router = Router();
router.get('/', verify, AnswerController.searchAnswers);
router.post('/:id', verify, AnswerController.answerQuestion);

export default router;
