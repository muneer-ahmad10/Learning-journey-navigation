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
    database="Learning_journey_navigation"
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
            return jsonify({'message': 'Login successful'}), 200
        else:
            return jsonify({'message': 'Invalid credentials'}), 401

    except Exception as e:
        print("Error during login:", e)
        return jsonify({'message': 'Login failed', 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
