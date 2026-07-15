# Student Records API

The backend half of the Student Records Portal — a small TypeScript/Express API for managing student records. See the [root README](../README.md) for the overall project status and how to run this alongside the frontend.

## What it does

- Full CRUD for student records (create, list, get by ID, update, delete)
- Pagination, search, sorting, and filtering on the list endpoint
- Rejects duplicate Student IDs, ignoring dashes/spaces/formatting
- Validates input and returns clear error messages
- Persists everything to `data/students.json` (no real database yet)

## Project structure

- `src/server.ts` — HTTP server entrypoint
- `src/app.ts` — Express app and route handlers
- `src/repository.ts` — file-backed repository storage
- `src/models/student.ts` — student model definitions
- `src/validation.ts` — input validation logic
- `src/index.ts` — an earlier CLI-based student manager, superseded by the REST API; kept around for history, not used by anything
- `data/students.json` — persisted student data

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
4. The API is now at `http://localhost:3000/students`.

## API endpoints

- `GET /students` — list students, paginated, searchable, sortable, and filterable (see below)
- `GET /students/:id` — get student by ID
- `POST /students` — create a new student
- `PUT /students/:id` — update a student
- `DELETE /students/:id` — delete a student

### GET /students query params

| Param       | Default | Notes                                                    |
|-------------|---------|-----------------------------------------------------------|
| `page`      | `1`     | Positive integer. Asking for a page past the end just returns an empty `data` array, not an error. |
| `limit`     | `10`    | Positive integer, max `100`.                              |
| `search`    | -       | Case-insensitive match across first name, last name, email, student ID, and program. |
| `sortBy`    | -       | One of `firstName`, `lastName`, `studentId`, `program`, `year`, `status`, `enrolledAt`. If omitted, results default to newest-created first. |
| `sortOrder` | `asc`   | `asc` or `desc`. Ignored if `sortBy` isn't set.           |
| `status`    | -       | Exact match: `Active`, `On Leave`, `Graduated`, or `Withdrawn`. |
| `program`   | -       | Case-insensitive exact match against a student's program. |
| `year`      | -       | Integer 1-4, exact match.                                 |

Search, filters, and sort all combine — filtering narrows the list first, then sorting is applied, then pagination slices the result, so ordering stays correct across pages. Invalid `page`, `limit`, `sortBy`, `sortOrder`, or `year` values return `400`.

Response shape:
```json
{
  "data": [ /* StudentRecord[] for this page */ ],
  "page": 1,
  "limit": 10,
  "total": 15,
  "totalPages": 2
}
```

### Student ID uniqueness

`POST /students` and `PUT /students/:id` reject a `studentId` that already belongs to another student. The comparison strips everything except digits, so `"2024-1001"`, `"2024 1001"`, and `"S2024/1001"` all count as the same ID. Returns `400` with `{ "error": "A student with this Student ID already exists." }`.

## Example POST request

From PowerShell, use valid JSON like this (all fields are required, and `status` must be one of `Active`, `On Leave`, `Graduated`, `Withdrawn`):

```powershell
$body = '{"firstName":"Ada","lastName":"Lovelace","email":"ada@example.com","studentId":"2024-1001","program":"Computer Science","year":2,"status":"Active","enrolledAt":"2024-09-01"}'
curl.exe -i -X POST http://localhost:3000/students -H "Content-Type: application/json" -d $body
```
Or just use Postman.

## Persistence

Student records are written to `data/students.json` (relative to this folder), so they survive server restarts.

## Run tests

From this `backend` folder:

```bash
npm run typecheck
npm test
```
