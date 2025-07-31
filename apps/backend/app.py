import firebase_admin
from firebase_admin import credentials
from flask import Flask, jsonify
import os

app = Flask(__name__)

# Initialize Firebase Admin SDK
FIREBASE_CRED_PATH = os.environ.get(
    'FIREBASE_CRED_PATH', 'firebase-credentials.json'
)
if os.path.exists(FIREBASE_CRED_PATH):
    cred = credentials.Certificate(FIREBASE_CRED_PATH)
    firebase_admin.initialize_app(cred)
else:
    print(
        f"Warning: Firebase credentials file "
        f"'{FIREBASE_CRED_PATH}' not found. "
        "Firebase not initialized."
    )


@app.route('/')
def health():
    status = {
        'status': 'ok',
        'firebase_initialized': firebase_admin._apps != {}
    }
    return jsonify(status)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
