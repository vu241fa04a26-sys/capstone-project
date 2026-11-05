# MERN Stack Project

A lightweight, minimal setup for the MERN (MongoDB, Express, React, and Node.js) stack.

## Architecture

- **Backend**: Node.js & Express API with Mongoose ORM
- **Frontend**: React client (located in `/client`)
- **Database**: MongoDB

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB running locally or a MongoDB Atlas URI

### 1. Installation

Install backend dependencies:

```bash
npm install
```

Install frontend dependencies:

```bash
cd client
npm install
cd ..
```

### 2. Development

Make sure MongoDB is running before starting the API. The backend connects to
`mongodb://127.0.0.1:27017/training-mern` by default; set `MONGODB_URI` to use a
different local or hosted database. The API waits for the database connection
and reports an error if it cannot connect.

Run the backend server (starts on default port 5000):

```bash
npm start
```

In a separate terminal, run the React client:

```bash
cd client
npm start
```

The React frontend will be available at [http://localhost:3000](http://localhost:3000).

### 3. Production Build

Build the React frontend:

```bash
npm run build
```

Start the production server:

```bash
npm run start:prod
```

The application will be served at [http://localhost:5000](http://localhost:5000).
