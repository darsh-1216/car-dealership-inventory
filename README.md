# 🚗 Car Dealership Inventory System

> A full-stack MERN application for managing dealership inventory with secure authentication, role-based access control, inventory management, and a modern responsive user interface.

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Express](https://img.shields.io/badge/Framework-Express-black)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-success)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![TailwindCSS](https://img.shields.io/badge/UI-TailwindCSS-38BDF8)

---

# 📖 Project Overview

The **Car Dealership Inventory System** is a full-stack web application developed to simplify vehicle inventory management for car dealerships. It enables administrators to efficiently manage vehicle inventory while providing customers with an intuitive platform to browse and purchase available vehicles.

The application follows a clean layered backend architecture with a modern React frontend, ensuring scalability, maintainability, and a smooth user experience. Authentication is secured using JWT, and role-based authorization ensures that administrative operations remain protected.

This project was developed as part of the **TDD Kata: Car Dealership Inventory System** assignment while following modern software development practices, including AI-assisted development, clean architecture, and Git version control.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Persistent Login
- Protected Routes
- Role-Based Authorization

---

## 🚘 Vehicle Inventory

- Add New Vehicle
- Update Vehicle Details
- Delete Vehicle
- Purchase Vehicle
- Restock Inventory
- Dynamic Inventory Statistics

---

## 🔍 Search & Filtering

- Search by Make
- Search by Model
- Search by Category
- Search by Price Range
- Real-time Vehicle Filtering

---

## 📊 Dashboard

- Total Vehicles
- Available Vehicles
- Sold Vehicles
- Out of Stock Vehicles
- Inventory Summary
- Responsive Dashboard Cards

---

## 👥 User Roles

### 👨‍💼 Admin

- Manage Inventory
- Add Vehicles
- Edit Vehicles
- Delete Vehicles
- Restock Inventory
- Purchase Vehicles

### 👤 Customer

- Browse Inventory
- Search Vehicles
- Purchase Vehicles

---

## 🎨 User Experience

- Modern Responsive UI
- Mobile Friendly Design
- Clean Dashboard
- Professional Layout
- Fast Navigation
- Dynamic Data Rendering

  ---

# 🛠 Technology Stack

## Frontend

The frontend of the application is built using modern React technologies to provide a responsive and user-friendly interface.

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios

---

## Backend

The backend is developed using Node.js and Express.js with a layered architecture to keep the code modular, maintainable, and scalable.

- Node.js
- Express.js
- JWT Authentication
- bcrypt
- CORS
- dotenv

---

## Database

The application uses MongoDB as its primary database.

- MongoDB
- Mongoose ODM

---

## Development Tools

The following tools were used during development:

- Git
- GitHub
- Postman
- ChatGPT
- OpenAI Codex
- Visual Studio Code

---

# 🏗 Application Architecture

The backend follows a layered architecture to separate responsibilities and improve maintainability.

```
                    Client (React)

                           │
                           ▼

                     Express Routes

                           │
                           ▼

                     Controllers

                           │
                           ▼

                       Services

                           │
                           ▼

                    Repositories

                           │
                           ▼

                     MongoDB Database
```

This architecture ensures that routing, business logic, and database operations remain independent, making the project easier to maintain and extend.

---

# 📁 Project Structure

```
car-dealership-inventory-system/

├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── README.md
├── PROMPTS.md
└── .gitignore
```

The frontend and backend are organized independently to keep responsibilities clearly separated and make future enhancements easier.

---

---

# 🚀 Getting Started

Follow the steps below to set up and run the project locally.

---

# 📋 Prerequisites

Make sure the following software is installed on your system before running the project.

- Node.js (v18 or above recommended)
- npm
- MongoDB Community Server or MongoDB Atlas
- Git

Verify your installation:

```bash
node -v
npm -v
```

---

# ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/<your-username>/car-dealership-inventory-system.git
```

Navigate into the project directory:

```bash
cd car-dealership-inventory-system
```

---

# 🖥 Backend Setup

Navigate to the backend directory.

```bash
cd backend
```

Install dependencies.

```bash
npm install
```

Create a `.env` file inside the backend directory and add the following environment variables.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
```

Start the backend server.

```bash
npm start
```

The backend server will start on:

```
http://localhost:5000
```

---

# 🌐 Frontend Setup

Open a new terminal.

Navigate to the frontend directory.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Start the React development server.

```bash
npm run dev
```

The frontend application will be available at:

```
http://localhost:5173
```

---

# 🔐 Environment Variables

The backend requires the following environment variables.

| Variable | Description |
|----------|-------------|
| PORT | Backend server port |
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret key used for JWT authentication |

---

# ▶️ Running the Application

1. Start MongoDB (if using a local database).
2. Start the backend server.
3. Start the frontend development server.
4. Open the frontend URL in your browser.
5. Register a new account or log in using an existing account.

---

# 👤 User Roles

The application supports two different user roles.

### Admin

- Add Vehicles
- Update Vehicles
- Delete Vehicles
- Restock Inventory
- Purchase Vehicles
- View Dashboard Statistics

### Customer

- Browse Vehicles
- Search Vehicles
- Purchase Vehicles

---

# 📡 API Overview

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | `/api/auth/register` |
| POST | `/api/auth/login` |

---

## Vehicles

| Method | Endpoint |
|---------|----------|
| GET | `/api/vehicles` |
| POST | `/api/vehicles` |
| PUT | `/api/vehicles/:id` |
| DELETE | `/api/vehicles/:id` |

---

## Inventory

| Method | Endpoint |
|---------|----------|
| POST | `/api/vehicles/:id/purchase` |
| POST | `/api/vehicles/:id/restock` |

---

## Search

| Method | Endpoint |
|---------|----------|
| GET | `/api/vehicles/search` |

---

# 📷 Application Screenshots

The following screenshots showcase the key features of the Car Dealership Inventory System.

---

## 🔐 Login Page

<p align="center">
  <img width="1770" height="853" alt="LoginPage" src="https://github.com/user-attachments/assets/5f5c4b91-3c8f-4229-bd6a-f8a6451a5f08" />

</p>

---

## 📝 Registration Page

<p align="center">
 <img width="1752" height="848" alt="RegisterPage" src="https://github.com/user-attachments/assets/715dfd6b-a21c-4cb0-8f02-ffbdc78ec4fc" />

</p>

---

## 🏠 Dashboard

<p align="center">
 <img width="1915" height="879" alt="Dashboard" src="https://github.com/user-attachments/assets/235b97d3-f1e1-4f78-bc43-ff645550fa89" />

</p>

---

## 🚘 Vehicle Inventory

<p align="center">
 <img width="1919" height="876" alt="Vehicles" src="https://github.com/user-attachments/assets/704409f1-0f9a-49d5-a396-8b8f19baa709" />
</p>

---


## 👤 Profile Page

<p align="center">
 <img width="1912" height="871" alt="Profile" src="https://github.com/user-attachments/assets/db131c7b-ad36-44ae-81cc-2fb08c4fb887" />
</p>

---
# 🤖 My AI Usage

Modern software development increasingly involves AI-assisted workflows. Throughout this project, I used AI responsibly as a productivity tool while ensuring that every implementation was reviewed, understood, tested, and integrated manually before becoming part of the final application.

---

## AI Tools Used

### 💬 ChatGPT (GPT-5.5)

**Primary Role:** Planning, Architecture, Problem Solving, Debugging & Documentation

ChatGPT was primarily used during the planning and development phases to discuss implementation approaches, understand technical concepts, solve development challenges, and improve the overall quality of the project.

It assisted with:

- Planning the project roadmap
- Designing the backend architecture
- Discussing JWT authentication and authorization
- Debugging frontend and backend issues
- Improving React component structure
- Suggesting UI/UX improvements
- Preparing project documentation
- Reviewing implementation strategies

---

### 💻 OpenAI Codex

**Primary Role:** AI Coding Assistant

OpenAI Codex was used as a coding assistant during implementation to accelerate development and reduce repetitive coding tasks.

It assisted with:

- Generating boilerplate code
- Implementing CRUD functionality
- API integration
- Form validation
- Refactoring suggestions
- Improving code readability
- Assisting during feature implementation
- Accelerating development workflow

---

## Development Workflow

```text
Planning & Architecture
        │
        ▼
     ChatGPT

Implementation
        │
        ▼
 OpenAI Codex

Debugging & Review
        │
        ▼
ChatGPT + OpenAI Codex

Documentation
        │
        ▼
     ChatGPT

Testing & Final Review
        │
        ▼
      Developer
```

---

## Reflection

Using AI helped reduce development time, simplify debugging, and improve code quality. ChatGPT was mainly used for planning, architecture discussions, debugging, and documentation, while OpenAI Codex accelerated implementation by assisting with repetitive coding tasks and feature development.

Every AI-generated suggestion was reviewed, modified where necessary, and tested before being integrated into the project.

For complete transparency, the complete AI interaction history used during development has been included in the **PROMPTS.md** file, as required by the assignment.

---

# 🧪 Test Report

The application was tested throughout development to validate both backend APIs and frontend functionality.

### Successfully Tested Features

- ✅ User Registration
- ✅ User Login
- ✅ JWT Authentication
- ✅ Protected Routes
- ✅ Role-Based Authorization
- ✅ Vehicle CRUD Operations
- ✅ Vehicle Search & Filtering
- ✅ Purchase Workflow
- ✅ Restock Workflow
- ✅ Dashboard Statistics
- ✅ Responsive User Interface

### Testing Method

The application was verified through manual testing using the frontend interface together with backend API validation to ensure that all major workflows behaved as expected.

---

# 🚀 Future Improvements

Although the project satisfies the assignment requirements, several enhancements could further improve the application.

- Purchase History
- Inventory History
- Vehicle Image Upload
- Cloudinary Integration
- Sales Analytics Dashboard
- Charts & Reports
- Pagination
- Advanced Search & Filtering
- Email Notifications
- Docker Support
- Automated Unit & Integration Tests
- CI/CD Pipeline

---

# 👨‍💻 Author

**DARAJI DARSHAN J**

B.E IT  LD COLLEGE OF ENGINEERING

Developed as part of the **TDD Kata: Car Dealership Inventory System** assignment.
