# ClientFlow — CRM Management Platform

<p align="center">
  <strong>A Production-Oriented Full-Stack CRM Application with Docker, CI/CD and Cloud Deployment</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React.js-61DAFB?logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/API-Express.js-000000?logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Container-Docker-2496ED?logo=docker&logoColor=white" alt="Docker">
  <img src="https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white" alt="GitHub Actions">
  <img src="https://img.shields.io/badge/Deployment-Render-46E3B7" alt="Render">
</p>

---

## 📌 Overview

**ClientFlow** is a full-stack Customer Relationship Management (CRM) application designed to provide a centralized platform for managing leads, customers, and business interactions.

The application is built using a modern JavaScript-based technology stack with a React.js frontend, Node.js/Express.js backend, and MongoDB database.

Beyond application development, ClientFlow demonstrates a complete software delivery lifecycle including **containerization with Docker, automated Continuous Integration using GitHub Actions, Docker image publishing to Docker Hub, and Continuous Deployment to Render**.

The project is designed with a clear separation between the frontend, backend, database, and deployment layers, making it easier to develop, test, deploy, and maintain.

---

# ✨ Features

## 🔐 Authentication

- User registration
- User login
- Authentication API integration
- Secure environment-based configuration

## 👥 Lead Management

- Create leads
- View leads
- Update lead information
- Delete leads
- Manage lead-related information through the CRM interface

## 📊 CRM Interface

- Centralized lead/customer management
- Clean and responsive user interface
- Backend API integration
- Dynamic data fetching
- CRUD-based workflow

## 🔄 REST API

The backend exposes RESTful APIs for:

- Authentication
- Lead management
- CRUD operations
- Database interaction

## 🚀 Production Deployment

The application is deployed using:

- **Frontend:** Render Static Site
- **Backend:** Render Web Service
- **Database:** MongoDB
- **Containerization:** Docker
- **Container Registry:** Docker Hub
- **CI/CD:** GitHub Actions

## ⚙️ Automated CI/CD

A push to the `main` branch triggers the automated delivery pipeline:

```text
Developer
    │
    │ git push
    ▼
GitHub Repository
    │
    ▼
GitHub Actions
    │
    ├───────────────┐
    │               │
    ▼               ▼
Backend CI      Frontend CI
    │               │
    └───────┬───────┘
            ▼
      Docker Build
            │
            ▼
       Docker Hub
            │
            ▼
      Deploy to Render
            │
       ┌────┴────┐
       ▼         ▼
    Backend   Frontend
       │         │
       └────┬────┘
            ▼
       Production


**##🏗️ System Architecture**
                         ┌─────────────────┐
                         │      User       │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │ React Frontend  │
                         │      Vite       │
                         └────────┬────────┘
                                  │
                             HTTP / REST
                                  │
                                  ▼
                         ┌─────────────────┐
                         │ Node.js /       │
                         │ Express Backend │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │     MongoDB     │
                         │   Data Storage  │
                         └─────────────────┘


                    CI/CD ARCHITECTURE

                         ┌─────────────────┐
                         │     GitHub      │
                         └────────┬────────┘
                                  │
                              git push
                                  │
                                  ▼
                       ┌────────────────────┐
                       │   GitHub Actions   │
                       └─────────┬──────────┘
                                 │
                    ┌────────────┼────────────┐
                    │            │            │
                    ▼            ▼            ▼
               Backend CI   Frontend CI   Docker Build
                                               │
                                               ▼
                                          Docker Hub
                                               │
                                               ▼
                                             Render
                                               │
                              ┌────────────────┴────────────────┐
                              │                                 │
                              ▼                                 ▼
                       Backend Service                    Frontend Site


**🛠️ Technology Stack**
Frontend
React.js
Vite
JavaScript
Axios
HTML5
CSS3
Backend
Node.js
Express.js
JavaScript
REST APIs
Middleware-based architecture
Database
MongoDB
DevOps & Deployment
Git
GitHub
GitHub Actions
Docker
Docker Hub
Render
Environment Variables
CI/CD

**📂 Project Structure**
ClientFlow/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   │
│   ├── Dockerfile
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md

**🔄 Application Flow**
ClientFlow follows a standard client-server architecture.
User
 │
 ▼
React Frontend
 │
 │ Axios HTTP Request
 ▼
Express REST API
 │
 ▼
Route
 │
 ▼
Controller
 │
 ▼
MongoDB
 │
 ▼
API Response
 │
 ▼
React UI

Example: Creating a Lead
User submits lead form
        │
        ▼
React captures form data
        │
        ▼
Axios sends POST request
        │
        ▼
Express receives request
        │
        ▼
Route identifies controller
        │
        ▼
Controller processes request
        │
        ▼
MongoDB stores lead
        │
        ▼
Backend returns response
        │
        ▼
Frontend updates UI

**🐳 Docker**

The backend is containerized using Docker to provide a consistent runtime environment across development, CI, and deployment.

Dockerfile

The backend contains a Dockerfile that defines the environment required to run the Node.js application.

Build Docker Image

From the project root:

docker build -t clientflow-backend ./server
Run Docker Container
docker run --env-file ./server/.env -p 5000:5000 clientflow-backend
Verify Docker Image
docker images
Push Docker Image
docker push YOUR_DOCKERHUB_USERNAME/clientflow-backend:latest

**🔁 CI/CD Pipeline**

ClientFlow implements an automated CI/CD pipeline using GitHub Actions.

The workflow is triggered by pushes to the main branch.

Continuous Integration

The CI stage validates both application layers.

                  Git Push
                     │
                     ▼
              GitHub Actions
                /         \
               /           \
              ▼             ▼
        Backend CI      Frontend CI
Backend CI

The backend CI process:

Checks out the repository
Sets up the Node.js environment
Installs dependencies
Validates the backend application
Frontend CI

The frontend CI process:

Checks out the repository
Sets up the Node.js environment
Installs dependencies
Runs the production build
Verifies that the frontend can be successfully built

**📦 Docker Image Automation**

After the CI stages complete successfully, the Docker stage automatically builds and publishes the backend image.

Backend CI
     │
Frontend CI
     │
     ▼
Docker Build
     │
     ▼
Docker Login
     │
     ▼
Docker Hub
     │
     ▼
Published Backend Image

The Docker image is automatically pushed to Docker Hub from the GitHub Actions workflow.

**🚀 Continuous Deployment**

After the CI and Docker stages complete successfully, GitHub Actions triggers the Render deployment using secure deploy hooks.

Successful CI
      │
      ▼
Docker Image Published
      │
      ▼
GitHub Actions
      │
      ├──────────────────────┐
      │                      │
      ▼                      ▼
Backend Deploy Hook    Frontend Deploy Hook
      │                      │
      ▼                      ▼
Render Backend         Render Frontend
      │                      │
      └──────────┬───────────┘
                 ▼
          Production System

This enables automated deployment without requiring manual deployment after every code change.

**🔐 Environment Variables**

Sensitive configuration values are not committed to the Git repository.

Environment variables are used for application configuration.

Example:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret

The exact variables required depend on the application's implementation.

Security Practices
.env files are excluded from Git
Database credentials are not hardcoded
Production secrets are configured separately
GitHub Secrets are used for CI/CD credentials
Render environment variables are used for production configuration

Never commit production credentials, API keys, database passwords, Docker Hub tokens, or deploy hooks to GitHub.

**💻 Local Development**
Prerequisites

Install the following:

Node.js
npm
Git
Docker
MongoDB
1. Clone the Repository
git clone https://github.com/MeghanaKanchiboina1616/CRM-ClientFlow
cd CRM-ClientFlow
2. Configure Backend Environment

Create a .env file inside the server directory.

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret

Use the actual environment variables required by the application.

3. Install Backend Dependencies
cd server
npm install
4. Start Backend
npm run dev

The backend will run on:

http://localhost:5000
5. Install Frontend Dependencies

Open another terminal:

cd client
npm install
6. Start Frontend
npm run dev

Vite will display the local development URL in the terminal.

**🧪 Production Build**

To create an optimized production build of the React application:

cd client
npm run build

The production files are generated in:

client/dist/

A successful build confirms that the frontend is ready for production deployment.

**🧰 Useful Commands**
Backend
cd server
npm install
npm run dev
Frontend
cd client
npm install
npm run dev
npm run build
Git
git status
git add .
git commit -m "your commit message"
git push origin main
Docker
docker build -t clientflow-backend ./server

docker run --env-file ./server/.env -p 5000:5000 clientflow-backend

docker images

docker push YOUR_DOCKERHUB_USERNAME/clientflow-backend:latest

**🌐 Deployment**
**Frontend**

Platform: Render Static Site

The React/Vite frontend is deployed from the GitHub repository.

**Backend**

Platform: Render Web Service

The Node.js/Express backend is deployed as a production web service.

**Database**

Database: MongoDB

The backend communicates with MongoDB using an environment-based connection string.

Container Registry

**Registry: Docker Hub**

The backend Docker image is automatically built and published through GitHub Actions.

**🔄 Deployment Workflow**

The complete production workflow is:
Developer
    │
    │ Code Changes
    ▼
Git Repository
    │
    │ git push
    ▼
GitHub
    │
    ▼
GitHub Actions
    │
    ├── Backend CI
    │
    ├── Frontend CI
    │
    ├── Docker Build
    │
    ├── Docker Push
    │
    └── Render Deploy Hooks
              │
              ▼
           Render
          /      \
         /        \
        ▼          ▼
   Backend       Frontend
        \          /
         \        /
          ▼      ▼
        Production

**📈 DevOps Practices Demonstrated**

This project demonstrates practical experience with:

Version control using Git
GitHub repository management
Continuous Integration
Continuous Deployment
GitHub Actions workflows
Docker containerization
Docker image management
Docker Hub
Environment-based configuration
Cloud deployment
Automated production deployments
Separation of frontend and backend services

**🔒 Security Considerations**

The project follows basic security and deployment best practices:

Sensitive configuration is stored using environment variables
.env files are excluded from version control
Production secrets are managed outside the source code
Docker Hub authentication uses GitHub Secrets
Render deployment hooks are stored as GitHub Secrets
Database credentials are not hardcoded into the application

**🎯 Project Objectives**

ClientFlow was developed to demonstrate practical knowledge of modern full-stack development and DevOps practices.

The project focuses on:

Building a complete full-stack web application
Designing frontend-backend communication
Implementing RESTful APIs
Integrating MongoDB
Containerizing backend services
Automating CI workflows
Automating Docker image publishing
Implementing continuous deployment
Deploying frontend and backend independently
Managing production configuration securely

**🚧 Future Enhancements**

Potential future improvements include:

Role-based access control
Advanced CRM analytics
Lead status pipelines
Customer activity timelines
Advanced search and filtering
Pagination
Email notifications
Automated API testing
Redis caching
Centralized logging
Application monitoring
Infrastructure as Code
Kubernetes-based deployment

**🌍 Live Application**
**Frontend**
https://clientflow-frontend-8sdv.onrender.com

**Backend API**
https://clientflow-backend-4hs4.onrender.com

**GitHub Repository**
https://github.com/MeghanaKanchiboina1616/CRM-ClientFlow

**🧑‍💻 Author**
**Meghana Kanchiboyina**
**Computer Science Engineering (AI & ML)**
