# Technical Requirements Document (TRD)

## Architecture

```
React + TypeScript (Vite)
            │
            ▼
     Clerk Authentication
            │
            ▼
FastAPI Backend (Render)
            │
            ▼
     Groq LLM APIs
            │
            ▼
   Streaming AI Responses
```

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Markdown
- Clerk
- Lucide React

---

### Backend

- Python
- FastAPI
- SQLAlchemy
- Alembic
- PostgreSQL
- Pydantic
- Groq SDK
- python-dotenv
- Uvicorn

---

### Database

- PostgreSQL

---

### Authentication

- Clerk

---

### AI Models

- Llama 3.3 70B
- Llama 4 Scout

---

### Deployment

Frontend

- Vercel

Backend

- Render

---

### Version Control

- Git
- GitHub

---

## Folder Structure

```
Flux-AI/

backend/
│
├── alembic/
├── app/
│   ├── api/
│   ├── core/
│   ├── models/
│   ├── services/
│   └── utils/
│
frontend/
│
├── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   └── contexts/
│
README.md
```

---

## Backend Responsibilities

- Authentication verification
- Handle chat requests
- Stream AI responses
- File upload processing
- Connect to Groq APIs
- Database interaction
- Input validation
- Error handling

---

## Frontend Responsibilities

- Authentication
- Display conversations
- Render Markdown
- Upload files
- Upload images
- Streaming response rendering
- Voice input
- Responsive UI

---

## Database

Tables

- users

Future

- chats
- conversations
- uploaded_files

---

## Security

- Environment variables
- Hidden API keys
- Clerk authentication
- Input validation
- CORS configuration

---

## Performance Goals

- Low latency
- Streaming responses
- Modular architecture
- Easy scalability
- Production ready