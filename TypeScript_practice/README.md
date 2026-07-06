# TypeScript Practice API

This project is a small student management backend built with TypeScript and Express.

## What it does

- Creates students
- Lists all students
- Gets one student by ID
- Updates a student
- Deletes a student
- Persists student data to `data/students.json`

## Project structure

- `src/server.ts` - HTTP server entrypoint
- `src/app.ts` - Express app and route handlers
- `src/repository.ts` - file-backed repository storage
- `src/models/student.ts` - student model definitions
- `src/validation.ts` - input validation logic
- `data/students.json` - persisted student data

## How to run

1. Open a terminal in this folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```
4. Use the API at:
   - `http://localhost:3000/students`

## API endpoints

- `GET /students` - list all students
- `GET /students/:id` - get student by ID
- `POST /students` - create a new student
- `PUT /students/:id` - update a student
- `DELETE /students/:id` - delete a student

## Example POST request

From PowerShell, use valid JSON like this:

```powershell
$body = '{"name":"Hadi","age":20,"email":"hadi@example.com"}'
curl.exe -i -X POST http://localhost:3000/students -H "Content-Type: application/json" -d $body
```
or use Postman to post JSON

## Persistence

The app writes student records to:

- `TypeScript_practice/data/students.json`

This means new students persist across server restarts.

## Run tests

From the `TypeScript_practice` folder:

```bash
npm run typecheck
node --test -r ts-node/register ./src/app.test.ts
```


