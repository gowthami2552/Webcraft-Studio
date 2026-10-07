"""
WebCraft Studio - Authentication Routes
Handles user registration, login, logout, and profile management.
"""

from flask import Blueprint, request, jsonify, session
from database.db import get_db, hash_password, verify_password
import re

auth_bp = Blueprint("auth", __name__)


def validate_email(email: str) -> bool:
    """Basic email format validation."""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))


def validate_password(password: str) -> tuple[bool, str]:
    """Password must be at least 8 chars with 1 uppercase and 1 number."""
    if len(password) < 8:
        return False, "Password must be at least 8 characters"
    if not any(c.isupper() for c in password):
        return False, "Password must contain at least one uppercase letter"
    if not any(c.isdigit() for c in password):
        return False, "Password must contain at least one number"
    return True, ""


@auth_bp.route("/register", methods=["POST"])
def register():
    """Register a new client account."""
    data = request.get_json()
    
    # ── Input Validation ──────────────────────────────────────────────────────
    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    
    if not name or len(name) < 2:
        return jsonify({"error": "Name must be at least 2 characters"}), 400
    
    if not email or not validate_email(email):
        return jsonify({"error": "Please provide a valid email address"}), 400
    
    valid_pwd, pwd_error = validate_password(password)
    if not valid_pwd:
        return jsonify({"error": pwd_error}), 400
    
    conn = get_db()
    try:
        # Check if email already exists
        existing = conn.execute(
            "SELECT id FROM users WHERE email = ?", (email,)
        ).fetchone()
        
        if existing:
            return jsonify({"error": "An account with this email already exists"}), 409
        
        # Create new user
        cursor = conn.execute(
            "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
            (name, email, hash_password(password), "client")
        )
        user_id = cursor.lastrowid
        
        # Welcome notification
        conn.execute("""
            INSERT INTO notifications (user_id, title, message, type)
            VALUES (?, ?, ?, ?)
        """, (user_id, "Welcome to WebCraft Studio! 🎉", 
              "Your account has been created. Start by submitting your first project request!", "success"))
        
        conn.commit()
        
        # Log user in
        session["user_id"] = user_id
        session["user_role"] = "client"
        session["user_name"] = name
        
        return jsonify({
            "message": "Account created successfully",
            "user": {"id": user_id, "name": name, "email": email, "role": "client"}
        }), 201
        
    except Exception as e:
        conn.rollback()
        return jsonify({"error": "Registration failed. Please try again."}), 500
    finally:
        conn.close()


@auth_bp.route("/login", methods=["POST"])
def login():
    """Log in an existing user."""
    data = request.get_json()
    
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400
    
    conn = get_db()
    try:
        user = conn.execute(
            "SELECT * FROM users WHERE email = ?", (email,)
        ).fetchone()
        
        if not user or not verify_password(user["password_hash"], password):
            return jsonify({"error": "Invalid email or password"}), 401
        
        # Set session
        session["user_id"] = user["id"]
        session["user_role"] = user["role"]
        session["user_name"] = user["name"]
        
        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user["id"],
                "name": user["name"],
                "email": user["email"],
                "role": user["role"]
            }
        }), 200
        
    finally:
        conn.close()


@auth_bp.route("/logout", methods=["POST"])
def logout():
    """Log out the current user."""
    session.clear()
    return jsonify({"message": "Logged out successfully"}), 200


@auth_bp.route("/me", methods=["GET"])
def get_current_user():
    """Get the currently logged-in user info."""
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Not authenticated"}), 401
    
    conn = get_db()
    try:
        user = conn.execute(
            "SELECT id, name, email, role, created_at FROM users WHERE id = ?", (user_id,)
        ).fetchone()
        
        if not user:
            session.clear()
            return jsonify({"error": "User not found"}), 404
        
        return jsonify({
            "user": {
                "id": user["id"],
                "name": user["name"],
                "email": user["email"],
                "role": user["role"],
                "created_at": user["created_at"]
            }
        }), 200
    finally:
        conn.close()


@auth_bp.route("/profile", methods=["PUT"])
def update_profile():
    """Update user profile."""
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Not authenticated"}), 401
    
    data = request.get_json()
    name = data.get("name", "").strip()
    
    if not name or len(name) < 2:
        return jsonify({"error": "Name must be at least 2 characters"}), 400
    
    conn = get_db()
    try:
        conn.execute("UPDATE users SET name = ? WHERE id = ?", (name, user_id))
        conn.commit()
        session["user_name"] = name
        return jsonify({"message": "Profile updated successfully"}), 200
    finally:
        conn.close()

import secrets
from datetime import datetime, timedelta

def send_setup_email(to_email, token):
    setup_link = f"http://localhost:5173/set-password?token={token}"
    print("\n" + "="*50)
    print(f"?? PASSWORD RESET LINK GENERATED FOR: {to_email}")
    print(f"?? CLICK HERE TO SET PASSWORD: {setup_link}")
    print("="*50 + "\n")

@auth_bp.route("/request-setup", methods=["POST"])
def request_setup():
    data = request.get_json()
    email = data.get("email", "").strip().lower()
    
    conn = get_db()
    try:
        user = conn.execute("SELECT id FROM users WHERE email = ?", (email,)).fetchone()
        if user:
            token = secrets.token_urlsafe(32)
            # Add 24 hours
            expires_at = datetime.utcnow() + timedelta(hours=24)
            
            conn.execute("DELETE FROM password_resets WHERE user_id = ?", (user["id"],))
            conn.execute(
                "INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, ?)",
                (user["id"], token, expires_at)
            )
            conn.commit()
            
            send_setup_email(email, token)
            
        return jsonify({"message": "If that email exists, a setup link has been sent."}), 200
    finally:
        conn.close()

@auth_bp.route("/set-password", methods=["POST"])
def set_password():
    data = request.get_json()
    token = data.get("token")
    new_password = data.get("password")
    
    if not token or not new_password:
        return jsonify({"error": "Invalid token or password"}), 400
        
    conn = get_db()
    try:
        reset = conn.execute(
            "SELECT user_id, expires_at FROM password_resets WHERE token = ?", 
            (token,)
        ).fetchone()
        
        if not reset:
            return jsonify({"error": "Invalid or expired token"}), 400
            
        expires_at = datetime.strptime(reset["expires_at"].split(".")[0], "%Y-%m-%d %H:%M:%S")
        if datetime.utcnow() > expires_at:
            return jsonify({"error": "Token has expired"}), 400
            
        conn.execute(
            "UPDATE users SET password_hash = ? WHERE id = ?",
            (hash_password(new_password), reset["user_id"])
        )
        conn.execute("DELETE FROM password_resets WHERE user_id = ?", (reset["user_id"],))
        conn.commit()
        
        return jsonify({"message": "Password updated successfully"}), 200
    finally:
        conn.close()
