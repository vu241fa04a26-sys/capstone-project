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
