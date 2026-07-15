# Student Records Portal

This is a student records app I've been building during my software development internship at Highnoon Laboratories. The original roadmap was a 16-week plan (compressed into 6 weeks) that was supposed to grow this into a full AI campus assistant, complete with a chatbot, voice interaction, document Q&A, and realtime features. For now, development has stayed on the records-management stage, so that's what actually lives in this repo.

## What's working right now

- Full CRUD for student records (create, list, view, update, delete) through a TypeScript/Express API
- Pagination, free-text search, sortable columns, and filters for status/program/year
- A recent-searches dropdown on the search bar
- Per-field form validation that tells you what format is expected (e.g. "Enter a valid email, e.g. name@example.com")
- Duplicate Student ID detection — it ignores dashes, spaces, and other formatting and just compares the digits
- A React frontend for browsing and managing the directory
- Backend tests (`node:test` + supertest)

Records live in a JSON file (`backend/data/students.json`), not a real database. So this is closer to "a solid student records manager" than the AI campus assistant the roadmap describes — auth, an actual database, the AI/voice/RAG features, realtime updates, and deployment are all still unbuilt.

## Tech stack

- **Backend:** Node.js, TypeScript (strict mode), Express, file-based persistence
- **Frontend:** React, TanStack Start/Router, Vite, Tailwind CSS
- **Testing:** `node:test` + supertest
- **Tooling:** ESLint, Prettier, Postman for manual API checks

## Project structure

```
AI-Assistant/
├── backend/                        Express + TypeScript API
│   ├── src/
│   │   ├── server.ts                Entry point (starts the HTTP server)
│   │   ├── app.ts                   Express app, routes, request handling
│   │   ├── repository.ts            Generic file-backed data layer
│   │   ├── validation.ts            Input validation
│   │   ├── models/student.ts        Types/DTOs
│   │   ├── index.ts                 Superseded CLI student manager (kept for history, unused)
│   │   └── app.test.ts              API tests
│   ├── data/students.json           Persisted student records
│   └── docs/                        Requirements doc, code review notes
├── frontend/student-records-portal-main/   React/TanStack frontend
└── package.json                     Root convenience script to run both at once
```

## Running it

You'll need Node.js and npm.

**1. Install dependencies** (backend, frontend, and the root dev-runner are separate installs):
```bash
npm install
npm install --prefix backend
npm install --prefix frontend/student-records-portal-main
```

**2. Start everything at once** from the repo root:
```bash
npm run dev
```
This runs the backend (`http://localhost:3000`) and frontend (`http://localhost:8080`) together, with labeled output. Open `http://localhost:8080` in a browser.

Or run them separately in two terminals:
```bash
npm run dev --prefix backend
npm run dev --prefix frontend/student-records-portal-main
```

**3. Run the backend tests:**
```bash
npm test --prefix backend
```

## API reference

Base URL: `http://localhost:3000`

| Method | Path             | Description              |
|--------|------------------|--------------------------|
| GET    | `/students`      | List students — supports pagination, search, sort, and filters. See [backend README](backend/README.md#get-students-query-params) for the query params. |
| GET    | `/students/:id`  | Get one student by ID    |
| POST   | `/students`      | Create a student         |
| PUT    | `/students/:id`  | Update a student         |
| DELETE | `/students/:id`  | Delete a student         |
