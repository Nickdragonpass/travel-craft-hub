# Backend (Flask + Firebase)

## Setup

1. Create a Firebase service account and download the credentials JSON file.
2. Place the file in this directory as `firebase-credentials.json` (or set the `FIREBASE_CRED_PATH` environment variable).
3. Create and activate the Python virtual environment:

```sh
python3 -m venv venv
source venv/bin/activate
pip install flask firebase-admin
```

## Running the server

```sh
source venv/bin/activate
python app.py
```

The server will run on [http://localhost:5000](http://localhost:5000) 