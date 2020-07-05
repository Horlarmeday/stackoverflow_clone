import { Router } from 'express';
import QuestionController from '../controller/QuestionController';
import verify from '../../../middleware/verify';

const router = Router();
router.post('/', verify, QuestionController.askQuestion);
router.post('/:id/subscribe', verify, QuestionController.subscribeQuestion);
router.get('/', verify, QuestionController.getQuestions);
router.put('/:id/upvote', verify, QuestionController.upVoteQuestion);
router.put('/:id/downvote', verify, QuestionController.downVoteQuestion);
export default router;
