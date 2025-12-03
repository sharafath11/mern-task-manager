# Full-Stack Task Management Application

This is a comprehensive full-stack task management application designed to help users organize their tasks efficiently. It features a robust authentication system, a complete task management dashboard with CRUD operations, and a modular architecture for easy maintenance and scalability.

## ✨ Features

### Client-side Features
*   **User Authentication:** Secure signup and login functionalities.
*   **Task Management Dashboard:** Create, read, update, and delete tasks.
*   **Task Filtering and Search:** Efficiently find tasks based on various criteria.
*   **Protected Routes:** Ensure only authenticated users can access certain parts of the application.
*   **Axios Request Wrapper:** Centralized handling of API requests for consistency and error management.
*   **Context-based User State:** Manage user authentication and profile information globally.
*   **Reusable UI Components:** A library of custom UI components for a consistent and modern user experience (e.g., `Card`, `Badge`, `Select`, `Skeleton`).
*   **Client-side Validation:** Real-time input validation for forms (e.g., auth, tasks).

### Server-side Features
*   **RESTful API:** Provides endpoints for authentication and task management.
*   **User Authentication:** Secure registration, login, and token refresh using JWTs.
*   **Task CRUD:** Full support for creating, reading, updating, and deleting tasks.
*   **Server-side Validation:** Ensures data integrity and security for all incoming requests.
*   **File Uploads:** Support for attaching files to tasks using Multer.
*   **Modular Architecture:** Organized into repository, service, and controller layers for maintainability.
*   **Token & Refresh Token System:** Secure and efficient user session management.
*   **Custom Middleware:** For authentication (`authenticateToken`) and file uploads (`upload`).
*   **Cron Jobs:** For scheduled tasks (e.g., `overdueCron.ts`).

## 🛠️ Tech Stack

### Client
*   **Framework:** Next.js 14 App Router
*   **Library:** React
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **HTTP Client:** Axios
*   **UI Components:** Custom UI system built with Radix UI primitives, `class-variance-authority`, `clsx`, `tailwind-merge`.
*   **State Management:** React Context API
*   **Toast Notifications:** `react-hot-toast`
*   **Alerts/Modals:** `sweetalert2`

### Server
*   **Runtime:** Node.js
*   **Web Framework:** Express.js
*   **Database:** MongoDB
*   **ORM:** Mongoose
*   **Authentication:** JWT (JSON Web Tokens)
*   **File Uploads:** Multer
*   **Password Hashing:** `bcrypt`/`bcryptjs`
*   **Dependency Injection:** Tsyringe, `reflect-metadata`
*   **Scheduled Tasks:** `node-cron`
*   **Environment Variables:** `dotenv`
*   **CORS:** `cors`
*   **Cookie Parsing:** `cookie-parser`

## 📁 Folder Structure

### Client (`client/src`)
*   `app/`: Contains Next.js App Router pages and their associated components.
    *   `login/`: Login page and its components.
    *   `signup/`: Signup page.
    *   `tasks/`: Task management dashboard page.
    *   `layout.tsx`, `page.tsx`, `not-found.tsx`: Global layout, home page, and 404 page.
*   `components/`: Reusable React components.
    *   `Header/`: Application header component.
    *   `tasks/`: Components specific to task management (e.g., `AddTaskModal`, `TaskCard`, `TaskFilters`).
    *   `ui/`: A comprehensive UI component library (e.g., `badge`, `button`, `card`, `input`, `select`, `skeleton`).
*   `context/`: React Context providers for global state management (e.g., `UserContext.tsx`).
*   `lib/`: Utility functions and configurations.
    *   `axios.ts`: Axios instance with request/response interceptors.
    *   `utils.ts`: General client-side utility functions.
*   `services/`: Functions for interacting with the backend API.
    *   `authService.ts`: API calls related to user authentication.
    *   `taskService.ts`: API calls related to task management.
*   `types/`: TypeScript type definitions for props, responses, and data models.
*   `utils/`: Client-side helper functions.
    *   `confirm.ts`: Confirmation dialog utility.
    *   `debounce.ts`: Debouncing utility.
    *   `formatDate.ts`: Date formatting utility.
    *   `request.ts`: Custom request utility.
    *   `toast.ts`: Toast notification utility.
    *   `url.ts`: URL manipulation utility.
*   `validation/`: Client-side validation schemas and functions.
    *   `authValidation.ts`: Validation for authentication forms.
    *   `emailValidation.ts`: Email specific validation.
    *   `taskValidation.ts`: Validation for task forms.

### Server (`server/src`)
*   `config/`: Configuration files (e.g., `database.ts` for MongoDB connection).
*   `const/`: Constants used across the application (e.g., `messages.ts`).
*   `controller/`: Handles incoming requests, processes them, and sends responses.
    *   `auth.controller.ts`: Authentication-related logic.
    *   `task.controller.ts`: Task management logic.
*   `core/`: Core application interfaces and types.
    *   `di/`: Dependency Injection setup (`container.ts`).
    *   `interfaces/`: TypeScript interfaces for controllers, repositories, and services.
    *   `types.ts`: Global custom types.
*   `cron/`: Contains scheduled tasks (e.g., `overdueCron.ts` for handling overdue tasks).
*   `dtos/`: Data Transfer Objects for request and response mapping.
    *   `tasks/`: DTOs for task-related data.
    *   `user/`: DTOs for user-related data.
*   `enums/`: Enumerations (e.g., `statusCode.ts`).
*   `middleware/`: Express middleware functions.
    *   `authenticateToken.ts`: JWT authentication middleware.
    *   `upload.ts`: Multer middleware for file uploads.
*   `models/`: Mongoose schemas and models for MongoDB.
    *   `Task.ts`: Task schema.
    *   `userModel.ts`: User schema.
*   `repository/`: Data access layer for interacting with the database.
    *   `authRepository.ts`: User authentication data operations.
    *   `baseRepository.ts`: Generic repository methods.
    *   `TaskRepository.ts`: Task data operations.
*   `routes/`: Defines API endpoints and links them to controllers.
    *   `auth.Routes.ts`: Authentication routes.
    *   `task.routes.ts`: Task management routes.
*   `services/`: Business logic layer.
    *   `auth.Service.ts`: Authentication business logic.
    *   `task.service.ts`: Task management business logic.
*   `types/`: TypeScript type definitions for various modules.
*   `utils/`: Server-side utility functions.
    *   `jwtToken.ts`: JWT token generation and verification.
    *   `parseQuery.ts`: Query parameter parsing.
    *   `regExp.ts`: Regular expressions.
    *   `response.ts`: Standardized API response utility.
    *   `validateRequest.ts`: Request validation utility.

## ⚙️ Environment Setup

### Client (`client/.env.local`)
Create a `.env.local` file in the `client/` directory with the following content:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Server (`server/.env`)
Create a `.env` file in the `server/` directory with the following content:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/tasks
JWT_SECRET=your_secret_jwt_key
REFRESH_TOKEN_SECRET=your_secret_refresh_token_key
```
**Note:** Replace `your_secret_jwt_key` and `your_secret_refresh_token_key` with strong, random strings.

## 🚀 Installation & Running

### 1. Clone the repository
```bash
git clone <repository_url>
cd <repository_name>
```

### 2. Client Setup
Navigate to the `client` directory, install dependencies, and start the development server:

```bash
cd client
npm install
npm run dev
```
The client application will be accessible at `http://localhost:3000` (or another port if 3000 is in use).

### 3. Server Setup
Navigate to the `server` directory, install dependencies, and start the development server:

```bash
cd server
npm install
npm run dev
```
The server will run on `http://localhost:5000` (or the port specified in your `.env` file). The API base URL for the client to interact with the server is `http://localhost:5000/api`.

## API Documentation (Brief)

The API endpoints are prefixed with `/api`.

*   **`POST /auth/login`**: Authenticates a user and returns access and refresh tokens.
*   **`POST /auth/signup`**: Registers a new user with the system.
*   **`GET /tasks`**: Retrieves a list of tasks, with support for filtering and searching. (Requires authentication)
*   **`POST /tasks`**: Creates a new task. (Requires authentication, supports file upload)
*   **`PUT /tasks/:id`**: Updates an existing task by its ID. (Requires authentication, supports file upload)
*   **`DELETE /tasks/:id`**: Deletes a task by its ID. (Requires authentication)
*   **`POST /auth/logout`**: Logs out the authenticated user.
*   **`GET /auth/user`**: Retrieves the profile of the authenticated user.
*   **`GET /auth/refresh-token`**: Refreshes the authentication token.




