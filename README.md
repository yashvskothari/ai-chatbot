# AI Chatbot

A full-stack AI chatbot built with React, FastAPI, and the Groq API, featuring real-time conversational AI, modern UI, and scalable architecture.

---

## Overview

AI Chatbot is a conversational AI application designed to provide an intuitive chat experience powered by Large Language Models (LLMs). The project demonstrates modern full-stack development practices, REST API integration, and responsive frontend design.

---

## Features

- AI-powered conversations
- Groq API integration
- Modern React interface
- FastAPI backend
- Responsive design
- Markdown rendering
- Loading indicators
- Error handling

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

### Deployment

- Vercel
- Render

---

## Project Structure

```
AI-Chatbot/

├── backend/

├── frontend/

├── docs/

├── README.md

└── LICENSE
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

- Authentication
- Chat history
- Database integration
- Voice support
- Image upload
- Model selection
- Streaming responses
- Export chats

---

## Disclaimer

This project is developed for educational and portfolio purposes. It is not intended for production use without additional security, authentication, and scalability enhancements.

---
