# Flux AI

An intelligent AI-powered chatbot built with React, FastAPI, and modern LLM technologies. Flux AI supports streaming conversations, document understanding, image analysis, authentication, and a modern responsive interface.

A full-stack AI chatbot built with React, FastAPI, and the Groq API, featuring real-time conversational AI, modern UI, and scalable architecture.

---

## Overview

Flux AI is a modern full-stack AI assistant designed to deliver fast, interactive, and context-aware conversations.

The application combines a React frontend with a FastAPI backend and integrates Large Language Models through the Groq API to provide real-time streaming responses.

Users can authenticate securely, upload documents or images for AI analysis, choose AI models, interact using voice input, and enjoy a clean, responsive user experience.

Flux AI demonstrates modern full-stack architecture, REST API design, authentication, scalable backend practices, and production deployment.

---

## Features

- AI-powered conversations
- Real-time streaming responses
- Secure Clerk authentication
- Voice input support
- Markdown rendering
- Image understanding
- Document upload & analysis
- Drag & Drop file uploads
- Multiple AI model support
- Modern responsive UI
- Conversation history during session
- Loading indicators
- Error handling
- Mobile-friendly design
---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Markdown
- Clerk Authentication
- Lucide React

### Backend

- Python
- FastAPI
- SQLAlchemy
- Alembic
- PostgreSQL
- Groq SDK
- Pydantic
- python-dotenv
- Uvicorn

### AI

- Groq API
- Llama 3.3 70B
- Llama 4 Scout

### Deployment

- Vercel
- Render

---

## Project Structure

```
Flux-AI/

├── backend/
│   ├── app/
│   ├── alembic/
│   ├── requirements.txt
│   └── main.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── docs/
│
└── README.md
```
---

## Architecture

```
Frontend (React + TypeScript)
        │
        ▼
   Clerk Authentication
        │
        ▼
 FastAPI Backend (Render)
        │
        ▼
    Groq API (LLMs)
        │
        ▼
 Streaming AI Responses
```
---

## Environment Variables

### Backend

```env
GROQ_API_KEY=
CLERK_SECRET_KEY=
DATABASE_URL=
```

### Frontend

```env
VITE_API_URL=
VITE_CLERK_PUBLISHABLE_KEY=
```
---


## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/AI-Chatbot.git
```

### Backend

```bash
cd backend
```

Install dependencies

```bash
pip install -r requirements.txt
```

Create a `.env` file

```env
GROQ_API_KEY=your_api_key
```

Run server

```bash
uvicorn main:app --reload
```

---

### Frontend

```bash
cd frontend
```

Install packages

```bash
npm install
```

Run

```bash
npm run dev
```

---

## Future Improvements

- Persistent chat history
- Multiple conversations
- User profile management
- AI memory
- More LLM providers
- Chat export
- Dark/Light themes
- Mobile App

---

## Disclaimer

Flux AI is developed for educational, learning, and portfolio purposes. AI responses may not always be accurate. Users should verify important information independently.

---
