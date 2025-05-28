# Practical Vehicle Parts Management System


## Screen Shots


## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. The Sql table qury
```
CREATE DATABASE IF NOT EXISTS vehicle;
USE vehicle;

CREATE TABLE IF NOT EXISTS parts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    partType VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    quantityInStock INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
); 
```
4. Start the backend server:
```bash
npm start
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Running the Application
- Backend runs on: http://localhost:3000
- Frontend runs on: http://localhost:5173

## Technologies Used
- Frontend: React.js with Vite
- Backend: Node.js with Express
- Database: MySQL
