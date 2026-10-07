"""
WebCraft Studio - Content Routes
Serves portfolio, services, FAQs, testimonials, and contact form data.
"""

from flask import Blueprint, request, jsonify, session
from database.db import get_db
from config import SERVICES_CONFIG, FAQ_CONFIG, TESTIMONIALS_CONFIG, BUSINESS_CONFIG, PRICING_CONFIG

content_bp = Blueprint("content", __name__)


# ── Portfolio Routes ────────────────────────────────────────────────────────────

@content_bp.route("/portfolio", methods=["GET"])
def get_portfolio():
    """Get all portfolio projects with optional category filter."""
    category = request.args.get("category", "")
    featured = request.args.get("featured", "")
    
    conn = get_db()
    try:
        query = "SELECT * FROM portfolio_projects"
        params = []
        conditions = []
        
        if category and category.lower() != "all":
            conditions.append("LOWER(category) = ?")
            params.append(category.lower())
        
        if featured == "true":
            conditions.append("featured = 1")
        
        if conditions:
            query += " WHERE " + " AND ".join(conditions)
        
        query += " ORDER BY featured DESC, created_at DESC"
        
        projects = conn.execute(query, params).fetchall()
        result = []
        for p in projects:
            project = dict(p)
            project["technologies"] = project["technologies"].split(",") if project["technologies"] else []
            project["features"] = project["features"].split(",") if project["features"] else []
            result.append(project)
        
        return jsonify({"projects": result}), 200
    finally:
        conn.close()


@content_bp.route("/portfolio/<slug>", methods=["GET"])
def get_portfolio_project(slug):
    """Get a single portfolio project by slug."""
    conn = get_db()
    try:
        project = conn.execute(
            "SELECT * FROM portfolio_projects WHERE slug = ?", (slug,)
        ).fetchone()
        
        if not project:
            return jsonify({"error": "Project not found"}), 404
        
        result = dict(project)
        result["technologies"] = result["technologies"].split(",") if result["technologies"] else []
        result["features"] = result["features"].split(",") if result["features"] else []
        
        return jsonify({"project": result}), 200
    finally:
        conn.close()


# ── Services Routes ────────────────────────────────────────────────────────────

@content_bp.route("/services", methods=["GET"])
def get_services():
    """Get all services configuration."""
    return jsonify({"services": SERVICES_CONFIG}), 200


@content_bp.route("/services/<slug>", methods=["GET"])
def get_service(slug):
    """Get a single service by slug."""
    service = next((s for s in SERVICES_CONFIG if s["slug"] == slug), None)
    if not service:
        return jsonify({"error": "Service not found"}), 404
    return jsonify({"service": service}), 200


# ── FAQ Routes ─────────────────────────────────────────────────────────────────

@content_bp.route("/faqs", methods=["GET"])
def get_faqs():
    """Get all FAQs."""
    return jsonify({"faqs": FAQ_CONFIG}), 200


# ── Testimonials Routes ────────────────────────────────────────────────────────

@content_bp.route("/testimonials", methods=["GET"])
def get_testimonials():
    """Get all testimonials."""
    return jsonify({"testimonials": TESTIMONIALS_CONFIG}), 200


# ── Business Info Route ────────────────────────────────────────────────────────

@content_bp.route("/business-info", methods=["GET"])
def get_business_info():
    """Get business contact info and configuration."""
    return jsonify({"info": BUSINESS_CONFIG, "pricing": PRICING_CONFIG}), 200


# ── Contact Form Route ─────────────────────────────────────────────────────────

@content_bp.route("/contact", methods=["POST"])
def submit_contact():
    """Submit a contact form message."""
    data = request.get_json()
    
    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    phone = data.get("phone", "").strip()
    subject = data.get("subject", "").strip()
    message = data.get("message", "").strip()
    
    if not name or len(name) < 2:
        return jsonify({"error": "Please provide your name"}), 400
    if not email or "@" not in email:
        return jsonify({"error": "Please provide a valid email"}), 400
    if not message or len(message) < 10:
        return jsonify({"error": "Message must be at least 10 characters"}), 400
    if len(message) > 2000:
        return jsonify({"error": "Message too long (max 2000 characters)"}), 400
    
    conn = get_db()
    try:
        conn.execute("""
            INSERT INTO contact_messages (name, email, phone, subject, message)
            VALUES (?, ?, ?, ?, ?)
        """, (name, email, phone, subject, message))
        conn.commit()
        return jsonify({"message": "Message sent successfully! We'll get back to you within 24 hours."}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({"error": "Failed to send message. Please try again."}), 500
    finally:
        conn.close()


# ── Search Route ───────────────────────────────────────────────────────────────

@content_bp.route("/search", methods=["GET"])
def search():
    """Search across services, portfolio, and FAQs."""
    query = request.args.get("q", "").strip().lower()
    
    if not query or len(query) < 2:
        return jsonify({"results": [], "message": "Please enter at least 2 characters"}), 200
    
    results = []
    
    # Search services
    for service in SERVICES_CONFIG:
        if (query in service["name"].lower() or 
            query in service["description"].lower()):
            results.append({
                "type": "service",
                "title": service["name"],
                "description": service["description"],
                "url": f"/services/{service['slug']}",
                "icon": service["icon"]
            })
    
    # Search FAQs
    for faq in FAQ_CONFIG:
        if (query in faq["question"].lower() or 
            query in faq["answer"].lower()):
            results.append({
                "type": "faq",
                "title": faq["question"],
                "description": faq["answer"][:120] + "...",
                "url": "/faq"
            })
    
    # Search portfolio
    conn = get_db()
    try:
        portfolio = conn.execute("""
            SELECT title, slug, category, description FROM portfolio_projects
            WHERE LOWER(title) LIKE ? OR LOWER(description) LIKE ? OR LOWER(category) LIKE ?
            LIMIT 5
        """, (f"%{query}%", f"%{query}%", f"%{query}%")).fetchall()
        
        for p in portfolio:
            results.append({
                "type": "project",
                "title": p["title"],
                "description": p["description"],
                "url": f"/work/{p['slug']}",
                "category": p["category"]
            })
    finally:
        conn.close()
    
    return jsonify({"results": results[:10], "query": query}), 200


# ── Notifications Route ────────────────────────────────────────────────────────

@content_bp.route("/notifications", methods=["GET"])
def get_notifications():
    """Get notifications for logged-in user."""
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Not authenticated"}), 401
    
    conn = get_db()
    try:
        notifications = conn.execute("""
            SELECT * FROM notifications 
            WHERE user_id = ?
            ORDER BY created_at DESC
            LIMIT 20
        """, (user_id,)).fetchall()
        
        unread_count = conn.execute(
            "SELECT COUNT(*) as cnt FROM notifications WHERE user_id = ? AND is_read = 0",
            (user_id,)
        ).fetchone()["cnt"]
        
        return jsonify({
            "notifications": [dict(n) for n in notifications],
            "unread_count": unread_count
        }), 200
    finally:
        conn.close()


@content_bp.route("/notifications/mark-read", methods=["POST"])
def mark_notifications_read():
    """Mark all notifications as read."""
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Not authenticated"}), 401
    
    conn = get_db()
    try:
        conn.execute(
            "UPDATE notifications SET is_read = 1 WHERE user_id = ?", (user_id,)
        )
        conn.commit()
        return jsonify({"message": "Notifications marked as read"}), 200
    finally:
        conn.close()


# ── Admin: Contact Messages ────────────────────────────────────────────────────

@content_bp.route("/admin/contacts", methods=["GET"])
def admin_get_contacts():
    """Admin: Get all contact messages."""
    if session.get("user_role") != "admin":
        return jsonify({"error": "Access denied"}), 403
    
    conn = get_db()
    try:
        contacts = conn.execute(
            "SELECT * FROM contact_messages ORDER BY created_at DESC"
        ).fetchall()
        return jsonify({"contacts": [dict(c) for c in contacts]}), 200
    finally:
        conn.close()


@content_bp.route("/admin/contacts/<int:contact_id>/read", methods=["PUT"])
def admin_mark_contact_read(contact_id):
    """Admin: Mark contact message as read."""
    if session.get("user_role") != "admin":
        return jsonify({"error": "Access denied"}), 403
    
    conn = get_db()
    try:
        conn.execute("UPDATE contact_messages SET is_read = 1 WHERE id = ?", (contact_id,))
        conn.commit()
        return jsonify({"message": "Marked as read"}), 200
    finally:
        conn.close()
