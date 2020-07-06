/* eslint-disable no-underscore-dangle */
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';
import Question from '../../src/module/Q&A/model/question';
import Answer from '../../src/module/Q&A/model/answer';
import User from '../../src/module/User/model/user';
import server from '../../src/startup/server';

const request = require('supertest');

describe('Answer Endpoints /answers', () => {
  let token;
  let user;
  beforeAll(async () => {
    user = new User({
      firstname: 'Ajao',
      lastname: 'Mahmud',
      phone: '07035120699',
      password: '123456',
      email: 'ajao@gmail.com',
    });
    await user.save();
    token = await user.generateAuthToken();
  }, 14000);

  afterAll(async () => {
    await Question.remove();
    await User.remove();
    await Answer.remove();
  });

  it('should answer a question', async () => {
    const question = new Question({
      question: 'Who is Abacha?',
      user: user._id,
    });
    await question.save();

    const res = await request(server)
      .post(`/api/answers/${question._id}`)
      .set('x-auth-token', token)
      .send({
        answer: 'Abacha was a former head of state',
      });
    await expect(res.status).toBe(201);
    await expect(res.body).toHaveProperty('data');
    await expect(res.body.data).toHaveProperty('_id');
  }, 10000);

  it('should search answers', async () => {
    const res = await request(server)
      .get('/api/answers?search=Abacha')
      .set('x-auth-token', token);

    await expect(res.status).toBe(200);
    await expect(res.body.data).toHaveProperty('answers');
    await expect(res.body.data.answers).toHaveLength(1);
    await expect(res.body.data).toHaveProperty('meta');
    await expect(res.body.data.meta.pageSize).toBeGreaterThan(0);
  }, 10000);
});
