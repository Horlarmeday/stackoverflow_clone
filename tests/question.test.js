import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';
import Question from '../src/module/Q&A/model/question';
import User from '../src/module/User/model/user';
import Subscription from '../src/module/Q&A/model/subscription';
import server from '../src/startup/server';

const request = require('supertest');

describe('Question Endpoints /questions', () => {
  let token;
  let newQuestion;
  beforeAll(async () => {
    const user = new User({
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
    await Subscription.remove();
  });

  it('should create a question', async () => {
    const res = await request(server)
      .post('/api/questions')
      .set('x-auth-token', token)
      .send({
        question: 'Who is babangida?',
      });
    newQuestion = res.body.data;
    await expect(res.status).toBe(201);
    await expect(res.body).toHaveProperty('data');
    await expect(res.body.data).toHaveProperty('_id');
  }, 10000);

  it('should get all questions', async () => {
    const res = await request(server)
      .get('/api/questions')
      .set('x-auth-token', token);

    await expect(res.status).toBe(200);
    await expect(res.body.data).toHaveProperty('questions');
  }, 10000);

  it('should search questions', async () => {
    const res = await request(server)
      .get('/api/questions?search=babangida')
      .set('x-auth-token', token);

    await expect(res.status).toBe(200);
    await expect(res.body.data).toHaveProperty('questions');
    await expect(res.body.data.questions).toHaveLength(1);
    await expect(res.body.data).toHaveProperty('meta');
    await expect(res.body.data.meta.pageSize).toBeGreaterThan(0);
  }, 10000);

  it('should up vote a question', async () => {
    const res = await request(server)
      // eslint-disable-next-line no-underscore-dangle
      .put(`/api/questions/${newQuestion._id}/upvote`)
      .set('x-auth-token', token);

    await expect(res.status).toBe(200);
    await expect(res.body).toHaveProperty('data');
    await expect(res.body.data.vote).toBeGreaterThan(0);
  }, 10000);

  it('should down vote a question', async () => {
    const res = await request(server)
      // eslint-disable-next-line no-underscore-dangle
      .put(`/api/questions/${newQuestion._id}/downvote`)
      .set('x-auth-token', token);

    await expect(res.status).toBe(200);
    await expect(res.body).toHaveProperty('data');
    await expect(res.body.data.vote).toBeLessThan(1);
  }, 10000);

  it('should subscribe to a question', async () => {
    const res = await request(server)
      // eslint-disable-next-line no-underscore-dangle
      .post(`/api/questions/${newQuestion._id}/subscribe`)
      .set('x-auth-token', token);

    await expect(res.status).toBe(201);
    await expect(res.body.data).toHaveProperty('question');
    await expect(res.body.data.user).toHaveProperty('_id');
  }, 10000);

  it('should not allow subscribe to a question after already subscribed', async () => {
    const res = await request(server)
      // eslint-disable-next-line no-underscore-dangle
      .post(`/api/questions/${newQuestion._id}/subscribe`)
      .set('x-auth-token', token);

    await expect(res.status).toBe(400);
  }, 10000);
});
