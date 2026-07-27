# Flux AI API Documentation

---

# Base URL

### Production

```
https://flux-ai-voi3.onrender.com
```

### Local Development

```
http://localhost:8000
```

---

# Authentication

Flux AI uses **Clerk Authentication**.

Protected endpoints require:

```
Authorization: Bearer <JWT_TOKEN>
```

---

# API Endpoints

---

## Health Check

### GET /

Returns backend status.

### Response

```json
{
  "status": "running"
}
```

---

## Chat

### POST /chat

Generate a complete AI response.

### Headers

```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

### Request

```json
{
  "message": "Hello",
  "history": [],
  "attachments": [],
  "modelId": "llama-3.3-70b-versatile"
}
```

### Response

```json
{
  "response": "Hello! How can I help you today?"
}
```

---

## Streaming Chat

### POST /chat/stream

Returns AI responses as Server-Sent Events (SSE).

### Headers

```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

### Request

```json
{
  "message": "Explain Quantum Computing",
  "history": [],
  "attachments": [],
  "modelId": "llama-3.3-70b-versatile"
}
```

### Stream Response

```
data: {"token":"Quantum"}

data: {"token":" computing"}

data: {"token":" is"}

...

data: [DONE]
```

---

## Upload

### POST /upload

Uploads images or documents for AI processing.

### Headers

```
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data
```

### Form Data

| Key | Type |
|------|------|
| file | File |
| provider | String |
| model | String |

### Response

```json
{
  "id":"abc123",
  "filename":"notes.pdf",
  "type":"document",
  "content":"Extracted text...",
  "preview":null,
  "size":125930
}
```

---

# Supported Models

| Provider | Model |
|----------|------------------------------|
| Groq | llama-3.3-70b-versatile |
| Groq | llama-4-scout-17b-16e-instruct |

---

# Status Codes

| Code | Meaning |
|------|----------|
| 200 | Success |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 422 | Validation Error |
| 500 | Internal Server Error |

---

# Tech Stack

Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- Alembic
- Groq API

Frontend

- React
- TypeScript
- Clerk
- Axios

Deployment

- Render
- Vercel

---

# Future API Roadmap

- Chat History
- Conversation Management
- User Preferences
- AI Memory
- Chat Export
- Multiple Providers