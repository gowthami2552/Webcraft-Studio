# WebCraft Studio

A complete, modern, production-ready freelancing website for a web development and UI/UX service business.

## Features

- **Frontend:** React + Vite, fully responsive, modern dark-themed UI (Glassmorphism, custom CSS)
- **Backend:** Python Flask API
- **Database:** SQLite (No external DB setup required)
- **Authentication:** Custom session-based auth (Admin & Client roles)
- **Functionality:** 
  - Dynamic Portfolio and Services system
  - 6-step project requirement submission form
  - Client Dashboard (view projects, statuses, and notifications)
  - Admin Dashboard (manage clients, update project statuses, view stats)
  - Contact form processing

## Getting Started

Follow these steps to run the project locally.

### 1. Setup the Backend
1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. (Optional) Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
5. Run the server (this will automatically initialize and seed the SQLite database):
   ```bash
   python app.py
   ```
  

### 2. Setup the Frontend
1. Open a second terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` (if not already present) and ensure it contains:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on http://localhost:5173*

