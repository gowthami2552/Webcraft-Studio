import secrets
from datetime import datetime, timedelta

def add_routes(app_content):
    imports = """
import secrets
from datetime import datetime, timedelta

def send_setup_email(to_email, token):
    setup_link = f"http://localhost:5173/set-password?token={token}"
    print("\\n" + "="*50)
    print(f"?? PASSWORD RESET LINK GENERATED FOR: {to_email}")
    print(f"?? CLICK HERE TO SET PASSWORD: {setup_link}")
    print("="*50 + "\\n")

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
"""
    return app_content + imports

with open("routes/auth.py", "r", encoding="utf-8") as f:
    content = f.read()

with open("routes/auth.py", "w", encoding="utf-8") as f:
    f.write(add_routes(content))

