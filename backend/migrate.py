import sqlite3

conn = sqlite3.connect("database/webcraft.db")
try:
    conn.execute("""
        CREATE TABLE IF NOT EXISTS password_resets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            token TEXT NOT NULL,
            expires_at TIMESTAMP NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
    """)
    print("Table password_resets created.")
except Exception as e:
    print(f"Migration failed: {e}")

conn.commit()
conn.close()
