# Employee Search Application

Angular application for searching employees with pagination.

## Setup

1. Install dependencies:
```
npm install
```

2. Start the application:
```
npm start
```

The application will run on `http://localhost:4200`

## Backend API

The application connects to backend API at `http://localhost:5100`

### API Endpoints:
- GET /api/employee?page=1&pageSize=10
- GET /api/employee/search?firstName=John&lastName=Smith&companyName=TechCorp&position=Engineer&page=1&pageSize=10
- GET /api/employee/by-firstname?firstName=John&page=1&pageSize=10
- GET /api/employee/by-lastname?lastName=Smith&page=1&pageSize=10
- GET /api/employee/by-company?companyName=TechCorp&page=1&pageSize=10
- GET /api/employee/by-position?position=Engineer&page=1&pageSize=10

## Features

- Search employees by first name, last name, company name, and position
- Pagination support
- Responsive table view
