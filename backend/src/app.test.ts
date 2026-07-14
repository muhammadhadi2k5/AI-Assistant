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
    .send({
      firstName: 'Carol',
      lastName: 'Test',
      email: 'carol@example.com',
      studentId: 'S1003',
      program: 'Business Administration',
      year: 1,
      status: 'Graduated',
      enrolledAt: '2026-01-15',
    })
    .expect(201);

  assert.equal(createResponse.body.firstName, 'Carol');
  assert.equal(createResponse.body.email, 'carol@example.com');

  const listResponse = await request(app)
    .get('/students')
    .expect(200);

  assert.equal(listResponse.body.data.length, 1);
  assert.equal(listResponse.body.data[0].firstName, 'Carol');
  assert.equal(listResponse.body.total, 1);
  assert.equal(listResponse.body.page, 1);
  assert.equal(listResponse.body.totalPages, 1);

  fs.rmSync(tempDir, { recursive: true, force: true });
});

test('persists students to disk between app instances', async () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'students-'));
  const dataFile = path.join(tempDir, 'students.json');

  const appOne = createApp({ dataFilePath: dataFile });
  const createResponse = await request(appOne)
    .post('/students')
    .send({
      firstName: 'Hadi',
      lastName: 'Test',
      email: 'hadi@example.com',
      studentId: 'S1001',
      program: 'Computer Science',
      year: 1,
      status: 'Active',
      enrolledAt: '2026-08-15',
    })

    .expect(201);

  assert.equal(createResponse.body.firstName, 'Hadi');

  const appTwo = createApp({ dataFilePath: dataFile });
  const listResponse = await request(appTwo)
    .get('/students')
    .expect(200);

  assert.equal(listResponse.body.data.length, 1);
  assert.equal(listResponse.body.data[0].firstName, 'Hadi');

  fs.rmSync(tempDir, { recursive: true, force: true });
});

test('paginates, searches, and validates query params on GET /students', async () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'students-page-'));
  const dataFile = path.join(tempDir, 'students.json');
  const app = createApp({ dataFilePath: dataFile });

  for (let i = 1; i <= 15; i++) {
    await request(app)
      .post('/students')
      .send({
        firstName: `Student${i}`,
        lastName: 'Test',
        email: `student${i}@example.com`,
        studentId: `S${1000 + i}`,
        program: i % 2 === 0 ? 'Computer Science' : 'Business Administration',
        year: 1,
        status: 'Active',
        enrolledAt: '2026-01-15',
      })
      .expect(201);
  }

  const pageOne = await request(app).get('/students?page=1&limit=10').expect(200);
  assert.equal(pageOne.body.data.length, 10);
  assert.equal(pageOne.body.total, 15);
  assert.equal(pageOne.body.totalPages, 2);

  const pageTwo = await request(app).get('/students?page=2&limit=10').expect(200);
  assert.equal(pageTwo.body.data.length, 5);

  const outOfRange = await request(app).get('/students?page=99&limit=10').expect(200);
  assert.equal(outOfRange.body.data.length, 0);
  assert.equal(outOfRange.body.total, 15);

  const searched = await request(app).get('/students?search=computer').expect(200);
  assert.equal(searched.body.total, 7);

  await request(app).get('/students?page=0').expect(400);
  await request(app).get('/students?page=abc').expect(400);
  await request(app).get('/students?limit=101').expect(400);

  fs.rmSync(tempDir, { recursive: true, force: true });
});

test('writes to the project data file even when the current working directory changes', async () => {
  const originalCwd = process.cwd();
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'students-cwd-'));
  const expectedFile = path.resolve(__dirname, '..', 'data', 'students.json');
  const originalContent = fs.existsSync(expectedFile) ? fs.readFileSync(expectedFile, 'utf8') : null;

  process.chdir(tempDir);

  try {
    const app = createApp();
    await request(app)
      .post('/students')
      .send({
        firstName: 'Alice',
        lastName: 'Test',
        email: 'Alice@example.com',
        studentId: 'S1002',
        program: 'Visual Arts',
        year: 3,
        status: 'On Leave',
        enrolledAt: '2026-08-15',
      })
      .expect(201);

    assert.equal(fs.existsSync(expectedFile), true);
  } finally {
    process.chdir(originalCwd);
    fs.rmSync(tempDir, { recursive: true, force: true });

    if (originalContent === null) {
      fs.rmSync(expectedFile, { force: true });
    } else {
      fs.writeFileSync(expectedFile, originalContent);
    }
  }
});
