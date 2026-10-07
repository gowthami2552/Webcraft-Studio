import sqlite3
from werkzeug.security import generate_password_hash

def hash_password(password):
    return generate_password_hash(password)

conn = sqlite3.connect("database/webcraft.db")

try:
    conn.execute(
        "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
        ("Gowthami", "gowthami@webcraftstudio.com", hash_password("Admin@2026"), "admin")
    )
    print("Admin Gowthami added (gowthami@webcraftstudio.com / Admin@2026)")
except Exception as e:
    print(f"Failed to add gowthami: {e}")

try:
    conn.execute(
        "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
        ("Partner", "partner@webcraftstudio.com", hash_password("Admin@2026"), "admin")
    )
    print("Admin Partner added (partner@webcraftstudio.com / Admin@2026)")
except Exception as e:
    print(f"Failed to add partner: {e}")

conn.commit()
conn.close()
