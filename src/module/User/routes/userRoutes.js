import { Router } from 'express';
import UserController from '../controller/UserController';
import verify from '../../../middleware/verify';

const router = Router();
router.post('/', UserController.userSignUp);
router.post('/login', UserController.userLogin);
router.get('/', verify, UserController.searchUsers);

export default router;
