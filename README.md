MERN Task Manager (Full Stack Application)

This repository contains a complete Task Management application built using:

Next.js 14 (App Router)

Node.js + Express (TypeScript)

MongoDB + Mongoose

Repository Pattern and Service Layer Architecture

JWT Authentication (Access + Refresh Tokens)

File Uploads (Images/PDF up to 5MB)

Cron Job for detecting overdue tasks

Both frontend and backend are implemented using TypeScript with a clean and scalable structure.

Project Structure
.
├── client/      → Frontend (Next.js)
└── server/      → Backend (Express + TypeScript)

Backend Architecture
controller → service → repository → model
             ↓
            DTOs + Response Mappers

middleware → authentication, file upload, validation

Frontend Architecture
app/
components/
services/
utils/
validation/
types/

Backend Setup
Install dependencies
cd server
npm install

Environment variables

Create a .env file inside server/:

MONGO_URI=
JWT_SECRET=
REFRESH_SECRET=
PORT=5000
CLIENT_URL=http://localhost:3000

Start the backend
npm run dev


The backend will run on:

http://localhost:5000

Frontend Setup
Install dependencies
cd client
npm install

Environment variables

Create a .env.local file inside client/:

NEXT_PUBLIC_API_URL=http://localhost:5000/api

Start the frontend
npm run dev


The frontend will run on:

http://localhost:3000

Features
Authentication

Register new users

Login with JWT

Secure HTTP-only cookies

Auto-refreshing tokens

Protected routes on frontend

Task Management

Create new tasks

Edit existing tasks

Delete tasks

Upload attachment (image or PDF)

Validations for task fields

Confirmation dialogs before add/edit/delete

FormData + file handling

Shows task status and due date

Cron Job

A scheduled job runs daily and marks overdue tasks based on their due date.

API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register
POST	/api/auth/login	Login
GET	/api/auth/user	Get logged-in user
GET	/api/auth/refresh-token	Refresh access token
Tasks
Method	Endpoint	Description
GET	/api/task	Get all tasks
POST	/api/task	Create a new task
PUT	/api/task/:id	Update a task
DELETE	/api/task/:id	Delete a task
What This Project Demonstrates

Strong understanding of full-stack TypeScript development

Clean architecture using repository and service layers

Token-based authentication with refresh token rotation

Handling file uploads with validation

Modular, reusable React components

Modern Next.js 14 App Router usage

Cron job usage in real-world apps

Fully validated backend and frontend forms

Professional project structure suitable for scaling

Environment Template
.env.example (backend)
MONGO_URI=
JWT_SECRET=
REFRESH_SECRET=
PORT=5000
CLIENT_URL=http://localhost:3000

.env.local.example (frontend)
NEXT_PUBLIC_API_URL=http://localhost:5000/api

How to Run the Project

Clone this repository

Set up backend environment file

Set up frontend environment file

Run backend

Run frontend

Access the application at http://localhost:3000

Notes

File uploads are limited to PNG, JPG, JPEG, and PDF, with a maximum size of 5MB.

Only authenticated users can access task pages.

DTOs ensure that only necessary fields are returned to the client.

Cookies are HTTP-only to protect against XSS attacks.