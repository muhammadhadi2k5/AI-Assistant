import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from './app.js';

test('creates and lists students through the API', async () => {
  const app = createApp();

  const createResponse = await request(app)
    .post('/students')
    .send({ name: 'Hadi', age: 20, email: 'hadi@example.com' })
    .expect(201);

  assert.equal(createResponse.body.name, 'Hadi');
  assert.equal(createResponse.body.email, 'hadi@example.com');

  const listResponse = await request(app)
    .get('/students')
    .expect(200);

  assert.equal(listResponse.body.length, 1);
  assert.equal(listResponse.body[0].name, 'Hadi');
});
