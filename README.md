# 🗣️ Language Learning Voice Conversation App

A modern, interactive voice-based language learning application designed for immersive speaking practice. Built with **FastAPI** on the backend and **React** on the frontend, it leverages **OpenAI's Realtime API over WebRTC** for low-latency, AI-driven conversations. Fully deployed on **Railway.app** for production-grade performance.

---

## 🧩 Features

### 🎓 Core Learning Capabilities
- Real-time voice conversation with AI tutor using OpenAI Realtime API (`gpt-4o-mini-realtime-preview-2024-12-17`)
- Support for multiple languages: **English, Dutch, Spanish, German, French, Portuguese**
- CEFR-aligned proficiency levels: **A1 to C2**
- Topic-based conversations: **Travel, Food, Hobbies, Culture, Music, Technology**, and more
- Web search integration for real-time discussions on **custom topics**
- Advanced sentence assessment with **grammar and vocabulary** feedback
- AI-generated **custom learning plans** with goals and timelines

### 🔊 Pronunciation & Interaction
- Real-time **pronunciation scoring** with visual confidence indicators
- **Interactive pronunciation review modal** with detailed feedback
- Scrollable, color-coded **transcripts** during conversation
- “**Continue Learning**” feature to resume lessons seamlessly

### ⚙️ Technical Stack
- **WebRTC** for real-time streaming
- **FastAPI (Python)** backend with REST APIs
- **React** frontend with responsive design
- **MongoDB** (managed by Railway) for user and plan storage
- **Dockerized** with environment-aware configuration
- Robust **state management**, **error logging**, and **navigation**
- Hosted on **Railway.app** for reliable deployment

---

## ✨ Language Learning Highlights

### 🗂️ Custom Learning Plans
- Choose predefined or custom learning **goals**
- Set duration (1–12 months)
- Track progress visually
- Plans are linked to user profiles (sign-in required)

### 🎯 Topic-Based Practice
- Select from diverse, themed topics:
  - ✈️ Travel
  - 🍲 Food & Cooking
  - 🎨 Hobbies & Interests
  - 🏛️ Culture & Traditions
  - 🎬 Movies & TV Shows
  - 🎵 Music
  - 💻 Technology
  - 🌳 Environment & Nature
  - 🔍 Custom Topic (via real-time web search)

### 🗣️ Sentence Assessment Flow
1. **User speaks** → Transcription via OpenAI
2. **Text analysis** → Grammar, vocabulary, structure
3. **Feedback generated** → Displayed visually with color-coded errors
4. **Actionable suggestions** → Tailored to proficiency level

---

## 🔎 Web Search for Custom Topics

### How it Works:
- Select “Custom Topic”
- Enter a query (e.g., *"Recent breakthroughs in AI"*)
- The app fetches real-time info via **OpenAI Web Search Tools**
- AI tutor uses this context to guide the conversation
- Supports topics like current events, science, technology, politics, and more

---

## 🔐 Authentication System

- JWT-based secure authentication
- Sign up / Log in via **Google OAuth 2.0**
- **Password recovery** and “Remember Me” functionality
- Automatic account creation on first Google login

---

## 🚀 Deployment with Railway

Easily deploy with Railway using the following environment variables:

| Variable         | Description                             |
|------------------|-----------------------------------------|
| `OPENAI_API_KEY` | Your OpenAI API Key                     |
| `NODE_ENV`       | Set to `production`                     |
| `PORT`           | Automatically handled by Railway        |
| `FRONTEND_URL`   | If frontend is deployed separately      |

Railway auto-detects deployment configurations (via `railway.toml`, `nixpacks.toml`, or `Procfile`).

---

## 🗂️ Project Structure

```
taco-app/
├── backend/                # FastAPI backend
│   ├── app/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── __init__.py
│   │   └── main.py
│   ├── venv/               # Python virtual environment
│   ├── requirements.txt    # Python dependencies
│   └── run.py              # Server entry point
├── frontend/               # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
├── Dockerfile              # Docker config
├── railway.json            # Railway deployment setup
└── README.md               # Project documentation
```

> 💡 **Tip:** Always use a virtual environment for Python. Store secrets like API keys in a `.env` file.

---

## Backend (FastAPI)

### Setup

1. Activate the virtual environment:

```bash
# On macOS/Linux
source backend/venv/bin/activate

# On Windows
backend\venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r backend/requirements.txt
```

3. Run the backend server:

```bash
cd backend
python3 run.py
```

4. The API will be available at http://localhost:8000
   - API documentation: http://localhost:8000/docs
   - Alternative API documentation: http://localhost:8000/redoc

## Frontend (React)

### Setup

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Run the development server:

```bash
npm start
```

3. The frontend will be available at http://localhost:3000

---

## API Endpoints (Sample)

- `GET /`: Welcome message
- `GET /api/health`: Health check endpoint
- `GET /api/items`: Sample endpoint that returns a list of items

---

## 🧠 OpenAI Model Usage

| Model Name                        | Purpose                      | Usage Context                           |
|-----------------------------------|------------------------------|-----------------------------------------|
| `gpt-4o-mini-realtime-preview`    | Real-time voice chat         | Low-latency AI tutor conversations      |
| `gpt-4o-mini`                     | Web search synthesis         | Used when discussing custom topics      |
| `gpt-4o`                          | Sentence/Grammar assessment  | AI-driven feedback and scoring          |
| `gpt-4o-mini-transcribe`          | Speech-to-text transcription | Backend transcribes voice input         |

---

## 👣 User Journey

### 👤 New Users
1. Visit homepage → Click **"Get Started"**
2. Select language and proficiency level
3. Choose topic or custom topic
4. (Optional) Sign up for saving progress

### ✅ Logged-in Users
- Resume previous plans
- Track progress
- View feedback and assessment history

### 🧠 AI-Driven Learning Plan
- Navigate to `/assessment/speaking`
- Speak 30–60 seconds
- AI assesses and generates a personalised plan
- Must be signed in to save the plan

---

## 🔄 Conversation + Pronunciation Flow

1. Start a conversation (WebRTC + AI)
2. Speak and get **real-time feedback**
3. Review transcript with:
   - 🟢 Green = Correct
   - 🟡 Yellow = Minor issues
   - 🔴 Red = Major errors
4. View improvement suggestions

---

## 🎛️ Personalization Options

- Choose AI voice from supported Realtime API voices
- Adjust speaking **speed** based on proficiency level

## 🎨 Color Palette
- `#6DE1D2`
- `#FFD63A`
- `#FFA955`
- `#F75A5A`
- `#FFFFFF`
