from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Database connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Bca@22550058",
    database="Learning_journey_navigation",
    ssl_disabled=True
)
cursor = db.cursor(dictionary=True)

@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()

        fname = data.get('fname')
        lname = data.get('lname')
        username = data.get('username')
        gender = data.get('gender')
        dob = data.get('dob')
        email = data.get('email')
        password = data.get('password')
        profile_pic = data.get('profile_pic', None)

        if not all([fname, lname, username, gender, dob, email, password]):
            return jsonify({'message': 'All fields are required'}), 400

        # Check if username or email already exists
        cursor.execute("SELECT * FROM users WHERE username = %s OR email = %s", (username, email))
        existing_user = cursor.fetchone()

        if existing_user:
            return jsonify({'message': 'Username or Email already exists'}), 409

        # Directly store the plain password (no hashing)
        insert_query = """
            INSERT INTO users (fname, lname, username, gender, dob, email, password, profile_pic)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(insert_query, (fname, lname, username, gender, dob, email, password, profile_pic))
        db.commit()

        return jsonify({'message': 'Signup successful'}), 201

    except Exception as e:
        print("Error during signup:", e)
        return jsonify({'message': 'Signup failed', 'error': str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()

        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'message': 'Email and password are required'}), 400

        # Find user by email
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()

        if not user:
            return jsonify({'message': 'User not found'}), 404

        stored_password = user['password']

        # Compare directly
        if password == stored_password:
            return jsonify({
                'message': 'Login successful',
                'user_id': user['user_id']  # ✅ Send user_id
            }), 200
        else:
            return jsonify({'message': 'Invalid credentials'}), 401

    except Exception as e:
        print("Error during login:", e)
        return jsonify({'message': 'Login failed', 'error': str(e)}), 500


@app.route('/history/search', methods=['POST'])
def store_search():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        search_term = data.get('search_term')

        if not user_id or not search_term:
            return jsonify({'message': 'Missing user_id or search_term'}), 400

        action = f"Searched for: {search_term}"
        cursor.execute("INSERT INTO user_history (user_id, action) VALUES (%s, %s)", (user_id, action))
        db.commit()

        return jsonify({'message': 'Search history stored'}), 201
    except Exception as e:
        print("Error storing search:", e)
        return jsonify({'message': 'Failed to store search', 'error': str(e)}), 500

@app.route('/history/watch', methods=['POST'])
def store_video_watch():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        video_title = data.get('video_title')

        if not user_id or not video_title:
            return jsonify({'message': 'Missing user_id or video_title'}), 400

        action = f"Watched video: {video_title}"
        cursor.execute("INSERT INTO user_history (user_id, action) VALUES (%s, %s)", (user_id, action))
        db.commit()

        return jsonify({'message': 'Video watch history stored'}), 201
    except Exception as e:
        print("Error storing watch history:", e)
        return jsonify({'message': 'Failed to store watch history', 'error': str(e)}), 500

# @app.route('/history/<int:user_id>', methods=['GET'])
# def get_user_history(user_id):
#     try:
#         # Debug: print the incoming user_id
#         print(f"Fetching history for user_id: {user_id}")

#         cursor.execute("SELECT action, timestamp FROM user_history WHERE user_id = %s ORDER BY timestamp DESC", (user_id,))
#         rows = cursor.fetchall()

#         print(f"Fetched rows: {rows}")  # Debug: print fetched rows

#         history = []
#         for row in rows:
#             action = row[0]
#             timestamp = row[1]
#             # Safely format timestamp
#             if isinstance(timestamp, datetime):
#                 timestamp_str = timestamp.strftime('%Y-%m-%d %H:%M:%S')
#             else:
#                 timestamp_str = str(timestamp)

#             history.append({
#                 "action": action,
#                 "timestamp": timestamp_str
#             })

#         return jsonify(history), 200
#     except Exception as e:
#         import traceback
#         traceback.print_exc()  # Print full traceback for debug
#         return jsonify({'message': 'Failed to fetch history', 'error': repr(e)}), 500



if __name__ == '__main__':
    app.run(port=5000, debug=True)
