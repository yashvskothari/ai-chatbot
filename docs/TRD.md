# Technical Requirements Document (TRD)

## Architecture

Frontend

React + Vite

↓

FastAPI Backend

↓

Groq API

---

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Markdown
- Lucide React

### Backend

- Python
- FastAPI
- Groq SDK
- Pydantic
- python-dotenv
- Uvicorn

### Deployment

Frontend
- Vercel

Backend
- Render

Version Control
- Git
- GitHub

---

## Folder Structure

AI-Chatbot/

backend/

frontend/

docs/

README.md

---

## Backend Responsibilities

- Handle incoming requests
- Validate input
- Connect with Groq API
- Return AI responses
- Handle exceptions

---

## Frontend Responsibilities

- Display conversations
- Send requests
- Render Markdown
- Handle loading state
- Responsive design

---

## Security

- Environment Variables
- Hidden API Keys
- CORS Configuration
- Input Validation

---

## Performance Goals

- Low response latency
- Clean API design
- Modular architecture
- Easy scalability