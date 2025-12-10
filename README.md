# Automata Tutor – Finite Automata Learning Platform

**Live site:** https://finite-automata-bdae0.web.app/

Automata Tutor is a full-stack web application that helps students learn **finite automata and automata theory**, inspired by Michael Sipser’s *Introduction to the Theory of Computation*.  
It combines interactive visualisation, graded quizzes, and gamification (XP and leaderboards) with real-time collaboration features.

This project started as my final year dissertation and evolved into a production-deployed learning tool.

---

## ✨ Key Features

- 📚 **Chapter-based lessons**  
  Concepts from the first chapters of automata theory (DFA, NFA, regular expressions, pumping lemma, etc.), structured as bite-sized learning units.

- ✅ **Graded quizzes (first 5 chapters)**  
  Auto-marked multiple-choice and short-answer questions with instant feedback so students can self-assess their understanding.

- ⚙️ **Interactive DFA builder**  
  - Create custom deterministic finite automata (DFAs) visually  
  - Validate transitions and states  
  - Test input strings against the constructed automaton

- 💬 **Real-time chatroom**  
  A simple chat so students can ask questions, share hints, and support each other while working through exercises.

- 🏆 **Leaderboard & XP system**  
  Points awarded for quiz completion and activity, displayed on a leaderboard to encourage engagement.

- 🧠 **“Custom mode” using Gemini API**  
  An experimental mode using a public Gemini API key to provide AI-powered hints or explanations related to automata concepts.

- 🔗 **Resources hub**  
  Curated list of textbooks and online resources (including purchase links) for further study.

---

## 🧰 Tech Stack

**Frontend**

- React + Vite  
- TypeScript or JavaScript (depending on branch – this repo started JS and evolved towards TS)  
- Tailwind CSS / custom CSS for layout and design  
- D3.js (or similar) for interactive DFA visualisation (state diagrams, transitions)

**Backend / Services**

- **Firebase**  
  - Hosting (deployment)  
  - Authentication (email/password and/or OAuth providers)  
  - Firestore / Realtime Database for user data

- **Supabase**  
  - Additional storage/tracking of student activity and quiz results

- **Gemini API**  
  - Used in “Custom mode” to provide automated hints or explanations alongside giggles chatbot.

---

## 🏗 Architecture Overview

At a high level:

- The **React client** handles UI, quiz logic, and DFA visualisation.  
- **Firebase Auth** secures access and identifies users.  
- **Firestore / Supabase** store:
  - User profiles
  - Quiz scores and XP
  - Custom DFA submissions
  - Chat messages
- The **leaderboard** and **chatroom** are built on top of this persisted data.  
- The **Gemini API** is called from the frontend (via a serverless function or proxied backend, depending on configuration) for AI-powered support.

You can find the main app code under:

- `src/` – React components, pages, and DFA logic
- `public/` – Static assets
- Config files – Firebase & Vite configuration

---

## Getting Started (Local Development)

> ⚠️ Caution. Before running locally, make sure you **do not commit any real API keys or secrets**. Store them in `.env.local` and add them to `.gitignore`.

1. **Clone the repository**

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>

```
2. **Install dependencies**
```
npm install
```
3. **Modify environmental variables**
```
Create a .env  .local in the project root and add values for:

VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...

VITE_GEMINI_API_KEY=...
```
4. **Run the dev server**
```
npm run dev
```
5. **Build for protection**
```
npm run build
```


Project Structure (Directory: Full-Stack-Web-App/automata-tutor-app)
.
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page-level views (Lessons, Quiz, DFA Builder, Chat, Leaderboard)
│   ├── dfa/             # DFA models, validation & graph logic
│   ├── hooks/           # Custom React hooks (auth, data fetching, etc.)
│   ├── services/        # Firebase/Supabase/Gemini integration
│   └── styles/          # Global styles / Tailwind config
├── .env.local           # Local environment vars (NOT committed)
├── package.json
├── vite.config.js
└── README.md

