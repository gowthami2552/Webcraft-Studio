"""
WebCraft Studio - Main Flask Application
Entry point for the backend server.
"""

import os
import sys

# Add backend directory to path
sys.path.insert(0, os.path.dirname(__file__))

from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

from config import Config
from database.db import init_db, seed_sample_data
from routes.auth import auth_bp
from routes.projects import projects_bp
from routes.content import content_bp


def create_app():
    """Application factory — creates and configures the Flask app."""
    app = Flask(__name__, static_folder="static")
    
    # ── Configuration ───────────────────────────────────────────────────────────
    app.config["SECRET_KEY"] = Config.SECRET_KEY
    app.config["MAX_CONTENT_LENGTH"] = Config.MAX_CONTENT_LENGTH
    app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
    app.config["SESSION_COOKIE_SECURE"] = False  # Set True in production with HTTPS
    
    # ── CORS ────────────────────────────────────────────────────────────────────
    CORS(app, 
         supports_credentials=True,
         origins=Config.CORS_ORIGINS,
         allow_headers=["Content-Type", "Authorization"],
         methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
    
    # ── Blueprints (Route Groups) ───────────────────────────────────────────────
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(projects_bp, url_prefix="/api/projects")
    app.register_blueprint(content_bp, url_prefix="/api")
    
    # ── Health Check ────────────────────────────────────────────────────────────
    @app.route("/api/health")
    def health():
        return jsonify({"status": "ok", "message": "WebCraft Studio API is running 🚀"}), 200
    
    # ── 404 Handler ─────────────────────────────────────────────────────────────
    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"error": "Endpoint not found"}), 404
    
    # ── 500 Handler ─────────────────────────────────────────────────────────────
    @app.errorhandler(500)
    def server_error(e):
        return jsonify({"error": "Internal server error. Please try again."}), 500
    
    # ── Request Size Handler ────────────────────────────────────────────────────
    @app.errorhandler(413)
    def request_too_large(e):
        return jsonify({"error": "File too large. Maximum size is 16MB."}), 413
    
    return app


# ── Initialize DB and create app ───────────────────────────────────────────────
app = create_app()

if __name__ == "__main__":
    print("Starting WebCraft Studio Backend...")
    print("📦 Initializing database...")
    
    init_db()
    seed_sample_data()
    
    print("✅ Database ready")
    print("🌐 API running at: http://localhost:5000")
    print("📋 Admin email: admin@webcraftstudio.com")
    print("🔑 Admin password: Admin@2026")
    print("─" * 50)
    
    app.run(
        host="0.0.0.0",
        port=5001,
        debug=Config.DEBUG
    )
