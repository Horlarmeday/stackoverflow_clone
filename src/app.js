import winston from 'winston';
import { port } from './config/secret';
import server from './startup/server';

export const app = server.listen(port, () => winston.info(`Running on port ${port}...`));
