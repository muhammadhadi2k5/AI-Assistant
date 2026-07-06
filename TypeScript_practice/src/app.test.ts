import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import request from 'supertest';
import { createApp } from './app';

test('creates and lists students through the API', async () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'students-'));
  const dataFile = path.join(tempDir, 'students.json');
  const app = createApp({ dataFilePath: dataFile });

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

  fs.rmSync(tempDir, { recursive: true, force: true });
});

test('persists students to disk between app instances', async () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'students-'));
  const dataFile = path.join(tempDir, 'students.json');

  const appOne = createApp({ dataFilePath: dataFile });
  const createResponse = await request(appOne)
    .post('/students')
    .send({ name: 'Alice', age: 22, email: 'alice@example.com' })
    .expect(201);

  assert.equal(createResponse.body.name, 'Alice');

  const appTwo = createApp({ dataFilePath: dataFile });
  const listResponse = await request(appTwo)
    .get('/students')
    .expect(200);

  assert.equal(listResponse.body.length, 1);
  assert.equal(listResponse.body[0].name, 'Alice');

  fs.rmSync(tempDir, { recursive: true, force: true });
});

test('writes to the project data file even when the current working directory changes', async () => {
  const originalCwd = process.cwd();
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'students-cwd-'));
  const expectedFile = path.resolve(__dirname, '..', 'data', 'students.json');

  process.chdir(tempDir);

  try {
    const app = createApp();
    await request(app)
      .post('/students')
      .send({ name: 'Carol', age: 24, email: 'carol@example.com' })
      .expect(201);

    assert.equal(fs.existsSync(expectedFile), true);
  } finally {
    process.chdir(originalCwd);
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});
