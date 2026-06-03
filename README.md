# MERN Employee Management App

This repository contains a simple employee management application built with a React frontend and a Node.js/Express backend.

## Project structure

- `client/` — React frontend built with Vite
- `Server/` — Express backend with MongoDB via Mongoose

## What it does

The app supports:

- user registration and login
- creating new employee records
- viewing all employees
- updating employee details
- deleting employees

## Important note

The backend uses MongoDB. You must have MongoDB running locally or use a cloud MongoDB connection before the backend can work.

The current backend connection string is:

```js
mongoose.connect("mongodb://127.0.0.1:27017/employee");
```

## Install and run

### 1. Install dependencies

From the repository root:

```bash
npm install
```

This installs the root helper package and also allows you to run the combined dev script.

Also install the client and server dependencies if needed:

```bash
npm --prefix client install
npm --prefix Server install
```

### 2. Start MongoDB

If you have MongoDB installed locally, start it first. For example:

```powershell
mkdir C:\data\db
mongod --dbpath "C:\data\db"
```

Or if MongoDB is installed as a Windows service:

```powershell
net start MongoDB
```

### 3. Run the app

From the repo root:

```bash
npm run dev
```

This starts both servers together using `concurrently`.

If you only want to start the frontend separately:

```bash
npm --prefix client run dev
```

### 4. Access the frontend

Open:

```text
http://localhost:5173/
```

## API endpoints

The backend provides these routes:

- `POST /` — login
- `POST /register` — register a new user
- `POST /create-employee` — create an employee
- `GET /employees` — list employees
- `DELETE /employees/:id` — delete an employee
- `PUT /employees/:id` — update an employee

## Notes

- The frontend will run without MongoDB, but API operations will fail until the backend can connect to the database.
- If you want, you can switch the backend to MongoDB Atlas by replacing the local connection string in `Server/index.js`.
