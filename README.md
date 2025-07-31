# Travel Craft Hub Monorepo

This is a monorepo managed with TurboRepo, containing:

- **Frontend:** React (JavaScript, Vite)
- **Backend:** Python (Flask) with Firebase connection

## Getting Started

### Prerequisites
- Node.js (for frontend)
- Python 3 (for backend)

### Frontend (React)

```sh
cd apps/frontend
npm install
npm run dev
```

### Backend (Flask + Firebase)

```sh
cd apps/backend
python3 -m venv venv
source venv/bin/activate
pip install flask firebase-admin
python app.py
```

- Place your Firebase service account JSON as `firebase-credentials.json` in `apps/backend/`.

## TurboRepo

You can add TurboRepo tasks to manage both apps together. See the [TurboRepo docs](https://turbo.build/repo/docs) for more info.
