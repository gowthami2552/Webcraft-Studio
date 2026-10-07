"""
WebCraft Studio - Project Routes
Handles project submission, retrieval, and status management.
"""

from flask import Blueprint, request, jsonify, session
from database.db import get_db, generate_project_code
from datetime import datetime

projects_bp = Blueprint("projects", __name__)


def require_auth():
    """Check if user is authenticated and return user_id, or None."""
    return session.get("user_id")


def require_admin():
    """Check if user is admin."""
    return session.get("user_role") == "admin"


@projects_bp.route("/submit", methods=["POST"])
def submit_project():
    """Submit a new project request."""
    user_id = require_auth()
    if not user_id:
        return jsonify({"error": "Please log in to submit a project"}), 401
    
    data = request.get_json()
    
    # ── Validation ─────────────────────────────────────────────────────────────
    required = ["service", "project_name", "budget", "timeline"]
    for field in required:
        if not data.get(field):
            return jsonify({"error": f"Field '{field}' is required"}), 400
    
    conn = get_db()
    try:
        project_code = generate_project_code()
        
        cursor = conn.execute("""
            INSERT INTO projects 
            (project_code, user_id, service, project_name, description, 
             target_audience, required_pages, reference_websites, special_features,
             design_preference, budget, timeline, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'submitted')
        """, (
            project_code,
            user_id,
            data.get("service", ""),
            data.get("project_name", ""),
            data.get("description", ""),
            data.get("target_audience", ""),
            data.get("required_pages", ""),
            data.get("reference_websites", ""),
            data.get("special_features", ""),
            data.get("design_preference", ""),
            data.get("budget", ""),
            data.get("timeline", ""),
        ))
        
        project_id = cursor.lastrowid
        
        # Auto-create initial project update
        conn.execute("""
            INSERT INTO project_updates (project_id, title, description)
            VALUES (?, ?, ?)
        """, (project_id, "Project Request Received",
              f"Your project '{data.get('project_name')}' has been submitted successfully. We'll review it and get back to you within 24 hours."))
        
        # Create notification for the client
        conn.execute("""
            INSERT INTO notifications (user_id, title, message, type)
            VALUES (?, ?, ?, ?)
        """, (user_id, "Project Request Submitted! ✅",
              f"Your project '{data.get('project_name')}' (ID: {project_code}) has been received. We'll be in touch shortly!", "success"))
        
        conn.commit()
        
        return jsonify({
            "message": "Project submitted successfully",
            "project_code": project_code,
            "project_id": project_id
        }), 201
        
    except Exception as e:
        conn.rollback()
        return jsonify({"error": "Failed to submit project. Please try again."}), 500
    finally:
        conn.close()


@projects_bp.route("/my-projects", methods=["GET"])
def get_my_projects():
    """Get all projects for the logged-in client."""
    user_id = require_auth()
    if not user_id:
        return jsonify({"error": "Not authenticated"}), 401
    
    conn = get_db()
    try:
        projects = conn.execute("""
            SELECT id, project_code, service, project_name, budget, timeline, 
                   status, created_at, updated_at
            FROM projects 
            WHERE user_id = ?
            ORDER BY created_at DESC
        """, (user_id,)).fetchall()
        
        return jsonify({
            "projects": [dict(p) for p in projects]
        }), 200
    finally:
        conn.close()


@projects_bp.route("/<int:project_id>", methods=["GET"])
def get_project(project_id):
    """Get detailed info for a specific project."""
    user_id = require_auth()
    if not user_id:
        return jsonify({"error": "Not authenticated"}), 401
    
    conn = get_db()
    try:
        # Clients can only view their own projects; admins can view all
        if require_admin():
            project = conn.execute(
                "SELECT p.*, u.name as client_name, u.email as client_email FROM projects p JOIN users u ON p.user_id = u.id WHERE p.id = ?",
                (project_id,)
            ).fetchone()
        else:
            project = conn.execute(
                "SELECT * FROM projects WHERE id = ? AND user_id = ?",
                (project_id, user_id)
            ).fetchone()
        
        if not project:
            return jsonify({"error": "Project not found"}), 404
        
        # Get project updates
        updates = conn.execute(
            "SELECT * FROM project_updates WHERE project_id = ? ORDER BY created_at ASC",
            (project_id,)
        ).fetchall()
        
        # Get messages
        messages = conn.execute("""
            SELECT m.*, u.name as sender_name 
            FROM messages m 
            JOIN users u ON m.sender_id = u.id
            WHERE m.project_id = ?
            ORDER BY m.created_at ASC
        """, (project_id,)).fetchall()
        
        return jsonify({
            "project": dict(project),
            "updates": [dict(u) for u in updates],
            "messages": [dict(m) for m in messages]
        }), 200
    finally:
        conn.close()


@projects_bp.route("/<int:project_id>/messages", methods=["POST"])
def send_message(project_id):
    """Send a message in a project thread."""
    user_id = require_auth()
    if not user_id:
        return jsonify({"error": "Not authenticated"}), 401
    
    data = request.get_json()
    message_text = data.get("message", "").strip()
    
    if not message_text:
        return jsonify({"error": "Message cannot be empty"}), 400
    if len(message_text) > 2000:
        return jsonify({"error": "Message too long (max 2000 characters)"}), 400
    
    conn = get_db()
    try:
        # Verify project access
        if require_admin():
            project = conn.execute("SELECT * FROM projects WHERE id = ?", (project_id,)).fetchone()
        else:
            project = conn.execute(
                "SELECT * FROM projects WHERE id = ? AND user_id = ?", (project_id, user_id)
            ).fetchone()
        
        if not project:
            return jsonify({"error": "Project not found"}), 404
        
        role = session.get("user_role", "client")
        conn.execute("""
            INSERT INTO messages (project_id, sender_id, sender_role, message)
            VALUES (?, ?, ?, ?)
        """, (project_id, user_id, role, message_text))
        
        # Notify the other party
        if role == "admin":
            # Notify client
            conn.execute("""
                INSERT INTO notifications (user_id, title, message, type)
                VALUES (?, ?, ?, ?)
            """, (project["user_id"], "New message from WebCraft Studio 💬",
                  f"You have a new message on project {project['project_code']}", "info"))
        else:
            # Notify admin (get admin user)
            admin = conn.execute("SELECT id FROM users WHERE role = 'admin' LIMIT 1").fetchone()
            if admin:
                conn.execute("""
                    INSERT INTO notifications (user_id, title, message, type)
                    VALUES (?, ?, ?, ?)
                """, (admin["id"], "New client message 💬",
                      f"New message on project {project['project_code']}", "info"))
        
        conn.commit()
        return jsonify({"message": "Message sent"}), 201
    finally:
        conn.close()


# ── Admin-only routes ──────────────────────────────────────────────────────────

@projects_bp.route("/admin/all", methods=["GET"])
def admin_get_all_projects():
    """Admin: Get all projects with client info."""
    if not require_admin():
        return jsonify({"error": "Access denied"}), 403
    
    conn = get_db()
    try:
        status_filter = request.args.get("status", "")
        
        query = """
            SELECT p.*, u.name as client_name, u.email as client_email
            FROM projects p
            JOIN users u ON p.user_id = u.id
        """
        params = []
        
        if status_filter:
            query += " WHERE p.status = ?"
            params.append(status_filter)
        
        query += " ORDER BY p.created_at DESC"
        
        projects = conn.execute(query, params).fetchall()
        return jsonify({"projects": [dict(p) for p in projects]}), 200
    finally:
        conn.close()


@projects_bp.route("/admin/<int:project_id>/status", methods=["PUT"])
def admin_update_status(project_id):
    """Admin: Update project status and add an update."""
    if not require_admin():
        return jsonify({"error": "Access denied"}), 403
    
    data = request.get_json()
    new_status = data.get("status", "")
    update_title = data.get("title", "")
    update_desc = data.get("description", "")
    
    valid_statuses = ["submitted", "under_review", "discussion", "design", "development", "review", "completed", "cancelled"]
    if new_status not in valid_statuses:
        return jsonify({"error": "Invalid status"}), 400
    
    conn = get_db()
    try:
        project = conn.execute("SELECT * FROM projects WHERE id = ?", (project_id,)).fetchone()
        if not project:
            return jsonify({"error": "Project not found"}), 404
        
        conn.execute("""
            UPDATE projects SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
        """, (new_status, project_id))
        
        # Add status update entry
        status_labels = {
            "submitted": "Project Submitted",
            "under_review": "Under Review",
            "discussion": "In Discussion",
            "design": "Design Phase",
            "development": "Development Phase",
            "review": "Ready for Review",
            "completed": "Project Completed! 🎉",
            "cancelled": "Project Cancelled"
        }
        
        title = update_title or f"Status Updated: {status_labels.get(new_status, new_status)}"
        description = update_desc or f"Your project status has been updated to '{status_labels.get(new_status, new_status)}'."
        
        conn.execute("""
            INSERT INTO project_updates (project_id, title, description)
            VALUES (?, ?, ?)
        """, (project_id, title, description))
        
        # Notify client
        notification_msg = {
            "design": "Your project has moved to the Design phase! 🎨",
            "development": "Your project is now in Development! 💻",
            "review": "Your website is ready for review! 👀",
            "completed": "Your website is complete! 🎉 Congratulations!",
        }.get(new_status, f"Your project status has been updated to: {status_labels.get(new_status, new_status)}")
        
        conn.execute("""
            INSERT INTO notifications (user_id, title, message, type)
            VALUES (?, ?, ?, ?)
        """, (project["user_id"], "Project Update 📢", notification_msg, "info"))
        
        conn.commit()
        return jsonify({"message": "Status updated successfully"}), 200
    finally:
        conn.close()


@projects_bp.route("/admin/stats", methods=["GET"])
def admin_stats():
    """Admin: Get overview stats."""
    if not require_admin():
        return jsonify({"error": "Access denied"}), 403
    
    conn = get_db()
    try:
        total = conn.execute("SELECT COUNT(*) as cnt FROM projects").fetchone()["cnt"]
        new_req = conn.execute("SELECT COUNT(*) as cnt FROM projects WHERE status = 'submitted'").fetchone()["cnt"]
        active = conn.execute("SELECT COUNT(*) as cnt FROM projects WHERE status IN ('design','development','review','discussion')").fetchone()["cnt"]
        completed = conn.execute("SELECT COUNT(*) as cnt FROM projects WHERE status = 'completed'").fetchone()["cnt"]
        clients = conn.execute("SELECT COUNT(*) as cnt FROM users WHERE role = 'client'").fetchone()["cnt"]
        unread_contacts = conn.execute("SELECT COUNT(*) as cnt FROM contact_messages WHERE is_read = 0").fetchone()["cnt"]
        
        return jsonify({
            "total_projects": total,
            "new_requests": new_req,
            "active_projects": active,
            "completed_projects": completed,
            "total_clients": clients,
            "unread_contacts": unread_contacts
        }), 200
    finally:
        conn.close()


@projects_bp.route("/admin/clients", methods=["GET"])
def admin_get_clients():
    """Admin: Get all client users."""
    if not require_admin():
        return jsonify({"error": "Access denied"}), 403
    
    conn = get_db()
    try:
        clients = conn.execute("""
            SELECT u.id, u.name, u.email, u.created_at,
                   COUNT(p.id) as project_count
            FROM users u
            LEFT JOIN projects p ON p.user_id = u.id
            WHERE u.role = 'client'
            GROUP BY u.id
            ORDER BY u.created_at DESC
        """).fetchall()
        return jsonify({"clients": [dict(c) for c in clients]}), 200
    finally:
        conn.close()
