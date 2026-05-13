# Job Tracker

A full-stack MERN application to track job applications and manage job search progress.

The application helps users organize and track job applications with filtering and real-time updates.

## Features

- Add job applications
- Update application status
- Delete job entries
- Search jobs by company name
- Filter jobs by status
- Responsive frontend UI

## Tech Stack

### Frontend
- React.js
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Installation

### Clone Repository

```bash
git clone https://github.com/prathmeshcool/job-tracker
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Frontend Setup

```bash
npm install
npm start
```

## Environment Variables

Create a `.env` file inside the backend folder:

```env
MONGO_URI=your_mongodb_connection_string
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /jobs | Fetch all jobs |
| POST | /jobs | Add new job |
| PUT | /jobs/:id | Update job |
| DELETE | /jobs/:id | Delete job |

## Live Demo

[Live Demo](https://job-tracker-weld-gamma.vercel.app/)
