/* eslint-disable import/first */
import helmet from 'helmet';
import cors from 'cors';
import '../config/env';
import express from 'express';
import userRoutes from '../module/User/routes/userRoutes';
import questionRoutes from '../module/Q&A/routes/questionRoutes';
import answerRoutes from '../module/Q&A/routes/answerRoutes';
import error from '../middleware/error';

const server = express();

import './logger';
import './database';
import './validation';

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use('/api/users', userRoutes);
server.use('/api/questions', questionRoutes);
server.use('/api/answers', answerRoutes);
server.use((req, res, next) => {
  const err = res.status(404).json('Resource does not exist');
  next(err);
});
server.use(error);

export default server;
