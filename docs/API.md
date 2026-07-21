# API Documentation

## Base URL

http://localhost:8000

---

## Endpoints

### Health Check

GET /

Response

```json
{
  "status": "running"
}
```

---

### Chat

POST /chat

Request

```json
{
  "message":"Hello"
}
```

Response

```json
{
  "response":"Hello! How can I help you today?"
}
```

---

## Status Codes

200 OK

400 Bad Request

500 Internal Server Error

---

## Future APIs

POST /login

POST /register

GET /history

DELETE /chat/{id}

POST /upload

GET /models