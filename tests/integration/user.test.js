// eslint-disable-next-line import/no-extraneous-dependencies
import { afterAll, describe, expect, it } from '@jest/globals';

import User from '../../src/module/User/model/user';
import server from '../../src/startup/server';

const request = require('supertest');

describe('User Endpoints /users', () => {
  let token;
  afterAll(async () => {
    await User.remove();
  });

  it('should sign up user', async () => {
    const res = await request(server)
      .post('/api/users')
      .send({
        firstname: 'Ajao',
        lastname: 'Mahmud',
        phone: '07035120699',
        password: '123456',
        email: 'ajao@gmail.com',
      });
    await expect(res.status).toBe(201);
    await expect(res.body).toHaveProperty('data');
    await expect(res.body.data).toHaveProperty('_id');
  }, 10000);

  it('should login user', async () => {
    const res = await request(server)
      .post('/api/users/login')
      .send({
        password: '123456',
        email: 'ajao@gmail.com',
      });
    token = res.body.data;
    await expect(res.status).toBe(200);
    await expect(res.body).toHaveProperty('data');
  }, 10000);

  it('should return searched user', async () => {
    const res = await request(server)
      .get('/api/users?search=Ajao')
      .set('x-auth-token', token);
    await expect(res.status).toBe(200);
    await expect(res.body.data).toHaveProperty('users');
    await expect(res.body.data).toHaveProperty('meta');
    await expect(res.body.data.meta.pageSize).toBeGreaterThan(0);
  }, 10000);

  it('should not allow user sign up', async () => {
    const res = await request(server)
      .post('/api/users')
      .send({
        firstname: 'Ajao',
        lastname: 'Mahmud',
        phone: '07035120699',
        password: '123456',
        email: 'ajao@gmail.com',
      });
    await expect(res.status).toBe(400);
  }, 10000);

  it('should not allow user login', async () => {
    const res = await request(server)
      .post('/api/users/login')
      .send({
        password: '12345',
        email: 'ajao@gmail.com',
      });
    await expect(res.status).toBe(400);
  }, 10000);
});
