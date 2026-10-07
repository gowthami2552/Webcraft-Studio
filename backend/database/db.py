"""
WebCraft Studio - Database Module
Handles SQLite connection and table creation with sample data seeding.
"""

import sqlite3
import os
import hashlib
import secrets
from datetime import datetime, timedelta
import random

# Import config for database path and sample data
import sys
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from config import Config, SERVICES_CONFIG, FAQ_CONFIG, TESTIMONIALS_CONFIG


def get_db():
    """Get a database connection with row_factory for dict-like access."""
    conn = sqlite3.connect(Config.DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def hash_password(password: str) -> str:
    """Hash a password using SHA-256 with a random salt."""
    salt = secrets.token_hex(16)
    hashed = hashlib.sha256((salt + password).encode()).hexdigest()
    return f"{salt}:{hashed}"


def verify_password(stored: str, provided: str) -> bool:
    """Verify a password against its stored hash."""
    try:
        salt, hashed = stored.split(":", 1)
        return hashlib.sha256((salt + provided).encode()).hexdigest() == hashed
    except Exception:
        return False


def init_db():
    """Create all database tables if they don't exist."""
    # Ensure database directory exists
    os.makedirs(os.path.dirname(Config.DATABASE_PATH), exist_ok=True)
    
    conn = get_db()
    cursor = conn.cursor()

    # ── Users Table ──────────────────────────────────────────────────────────────
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT DEFAULT 'client',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # ── Projects Table ────────────────────────────────────────────────────────────
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            project_code TEXT UNIQUE NOT NULL,
            user_id INTEGER NOT NULL,
            service TEXT NOT NULL,
            project_name TEXT NOT NULL,
            description TEXT,
            target_audience TEXT,
            required_pages TEXT,
            reference_websites TEXT,
            special_features TEXT,
            design_preference TEXT,
            budget TEXT,
            timeline TEXT,
            status TEXT DEFAULT 'submitted',
            admin_notes TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)

    # ── Messages Table ────────────────────────────────────────────────────────────
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            project_id INTEGER NOT NULL,
            sender_id INTEGER NOT NULL,
            sender_role TEXT NOT NULL,
            message TEXT NOT NULL,
            is_read INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (project_id) REFERENCES projects(id),
            FOREIGN KEY (sender_id) REFERENCES users(id)
        )
    """)

    # ── Project Updates Table ─────────────────────────────────────────────────────
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS project_updates (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            project_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (project_id) REFERENCES projects(id)
        )
    """)

    # ── Portfolio Projects Table ──────────────────────────────────────────────────
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS portfolio_projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            category TEXT NOT NULL,
            description TEXT NOT NULL,
            long_description TEXT,
            problem TEXT,
            solution TEXT,
            features TEXT,
            technologies TEXT NOT NULL,
            design_approach TEXT,
            results TEXT,
            image_color TEXT DEFAULT '#7C5CFF',
            featured INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # ── Contact Messages Table ────────────────────────────────────────────────────
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS contact_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            subject TEXT,
            message TEXT NOT NULL,
            is_read INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # ── Notifications Table ───────────────────────────────────────────────────────
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS notifications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            message TEXT NOT NULL,
            type TEXT DEFAULT 'info',
            is_read INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)

    conn.commit()
    conn.close()


def generate_project_code():
    """Generate a unique project code like WC-2026-001."""
    conn = get_db()
    year = datetime.now().year
    count = conn.execute(
        "SELECT COUNT(*) as cnt FROM projects WHERE project_code LIKE ?",
        (f"WC-{year}-%",)
    ).fetchone()["cnt"]
    conn.close()
    return f"WC-{year}-{str(count + 1).zfill(3)}"


def seed_sample_data():
    """Insert sample data if tables are empty."""
    conn = get_db()
    
    # ── Seed Admin User ─────────────────────────────────────────────────────────
    from config import Config
    admin_exists = conn.execute(
        "SELECT id FROM users WHERE email = ?", (Config.ADMIN_EMAIL,)
    ).fetchone()
    
    if not admin_exists:
        conn.execute(
            "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
            ("Admin", Config.ADMIN_EMAIL, hash_password(Config.ADMIN_PASSWORD), "admin")
        )
        print(f"✅ Admin user created: {Config.ADMIN_EMAIL}")

    # ── Seed Sample Client ──────────────────────────────────────────────────────
    client_exists = conn.execute(
        "SELECT id FROM users WHERE email = ?", ("demo@webcraftstudio.com",)
    ).fetchone()
    
    if not client_exists:
        conn.execute(
            "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
            ("Demo Client", "demo@webcraftstudio.com", hash_password("Demo@2026"), "client")
        )

    # ── Seed Portfolio Projects ─────────────────────────────────────────────────
    portfolio_count = conn.execute("SELECT COUNT(*) as cnt FROM portfolio_projects").fetchone()["cnt"]
    
    if portfolio_count == 0:
        portfolio_projects = [
            {
                "title": "Developer Portfolio",
                "slug": "developer-portfolio",
                "category": "Portfolio",
                "description": "A modern portfolio website for a developer showcasing skills and projects.",
                "long_description": "A fully responsive, modern portfolio website built for a full-stack developer. Features a stunning hero section with animated text, project showcase, skills visualization, and an integrated contact form.",
                "problem": "The client needed a professional online presence to showcase their technical skills and attract potential employers and clients.",
                "solution": "We designed a clean, dark-themed portfolio with smooth animations, clear project cards, and an easy-to-navigate structure that highlights the developer's strongest work.",
                "features": "Animated hero,Project showcase,Skills section,Experience timeline,Contact form,Dark mode,Mobile responsive",
                "technologies": "React,Tailwind CSS,Framer Motion",
                "design_approach": "Dark premium aesthetic with purple accents, focusing on typography and whitespace to let the content breathe.",
                "results": "Client received 3 job offers within 2 weeks of launch. Portfolio page views increased by 400%.",
                "image_color": "#7C5CFF",
                "featured": 1,
            },
            {
                "title": "AI Productivity Dashboard",
                "slug": "ai-productivity-dashboard",
                "category": "AI",
                "description": "AI-powered dashboard for task and productivity management with smart insights.",
                "long_description": "An intelligent productivity dashboard that uses AI to help users manage tasks, track habits, and get smart suggestions for improving their workflow.",
                "problem": "The startup wanted to differentiate their productivity app with AI features that provide personalized suggestions and insights.",
                "solution": "We integrated OpenAI API to create smart task suggestions, sentiment analysis for journal entries, and an AI assistant that helps prioritize work.",
                "features": "AI task suggestions,Habit tracking,Analytics dashboard,AI chatbot,Data visualization,Real-time updates",
                "technologies": "React,Python,OpenAI API,Chart.js",
                "design_approach": "Clean data-dense layout with clear visual hierarchy. Used blue and purple gradients to convey intelligence and technology.",
                "results": "User engagement increased by 60%. The AI features became the most-used feature within the first month.",
                "image_color": "#00C2FF",
                "featured": 1,
            },
            {
                "title": "Restaurant Website",
                "slug": "restaurant-website",
                "category": "Business",
                "description": "Modern website for a restaurant with menu, gallery and online booking.",
                "long_description": "A beautiful restaurant website with an online menu, photo gallery, reservation system, and integration with Google Maps. Designed to attract local diners and manage table bookings.",
                "problem": "The restaurant had no online presence and was losing potential customers who searched for restaurants online.",
                "solution": "We built a warm, inviting website with high-quality food photography layout, online menu with categories, and a reservation form connected to their email.",
                "features": "Online menu,Photo gallery,Reservation system,Google Maps,WhatsApp contact,Opening hours,Testimonials",
                "technologies": "HTML,CSS,JavaScript,Flask",
                "design_approach": "Warm earth tones with elegant typography. Large food imagery that makes visitors hungry just by browsing.",
                "results": "Online reservations increased by 80% in the first month. Website became the primary source of new customers.",
                "image_color": "#FF6B35",
                "featured": 1,
            },
            {
                "title": "Startup Landing Page",
                "slug": "startup-landing-page",
                "category": "Landing Page",
                "description": "High-converting landing page for a SaaS startup with waitlist signup.",
                "long_description": "A conversion-focused landing page for a B2B SaaS startup, designed to capture early adopter signups and communicate the product value proposition clearly.",
                "problem": "The startup needed to validate their idea and build a waitlist before their product launch.",
                "solution": "We created a compelling landing page with a clear value proposition, feature highlights, social proof, and a prominent email capture form.",
                "features": "Hero with CTA,Feature showcase,Pricing section,FAQ,Testimonials,Email capture,Analytics integration",
                "technologies": "React,Tailwind CSS,Framer Motion",
                "design_approach": "Clean SaaS aesthetic with a blue-purple gradient hero. Clear hierarchy guides users toward the signup CTA.",
                "results": "Collected 500+ waitlist signups in the first week. Conversion rate of 12% (industry average is 2-4%).",
                "image_color": "#5B4FE8",
                "featured": 0,
            },
            {
                "title": "E-commerce Store",
                "slug": "ecommerce-store",
                "category": "E-commerce",
                "description": "Online store with product catalogue, cart and checkout system.",
                "long_description": "A full-featured e-commerce store for a fashion brand, featuring product catalogues, advanced filtering, shopping cart, wishlist, and a complete checkout flow.",
                "problem": "The fashion brand was selling exclusively through Instagram DMs and needed a proper online store to scale their business.",
                "solution": "We built a modern e-commerce platform with intuitive product browsing, size guides, cart management, and a streamlined checkout process.",
                "features": "Product catalogue,Advanced filters,Shopping cart,Wishlist,Order tracking,Mobile-first design",
                "technologies": "React,Node.js,MongoDB",
                "design_approach": "Clean minimal fashion aesthetic. Lots of whitespace to let products shine. Mobile-first approach.",
                "results": "Monthly revenue increased by 200%. Cart abandonment reduced by 35% with the optimized checkout flow.",
                "image_color": "#EC4899",
                "featured": 1,
            },
            {
                "title": "Business Website",
                "slug": "corporate-business-website",
                "category": "Business",
                "description": "Professional business website for a consulting firm with service pages.",
                "long_description": "A comprehensive business website for a management consulting firm, featuring detailed service pages, case studies, team profiles, and an integrated contact system.",
                "problem": "The consulting firm's outdated website was failing to convert visitors into leads, with a poor mobile experience driving away potential clients.",
                "solution": "Complete redesign with a modern professional look, improved information architecture, and clear calls-to-action that guide visitors toward booking a consultation.",
                "features": "Service pages,Case studies,Team profiles,Blog,Contact system,Lead capture,SEO optimized",
                "technologies": "React,Flask,SQLite",
                "design_approach": "Professional navy and gold color scheme. Trust-building elements throughout — certifications, case studies, and client logos.",
                "results": "Lead generation increased by 150%. Average time on site doubled. Mobile traffic conversion improved by 90%.",
                "image_color": "#1E40AF",
                "featured": 0,
            },
            {
                "title": "Student Portfolio",
                "slug": "student-portfolio",
                "category": "Portfolio",
                "description": "Clean portfolio website for a design student to showcase their work.",
                "long_description": "A creative portfolio for a final-year design student, featuring an interactive project gallery, design process showcases, and a personal brand that stands out in internship applications.",
                "problem": "A design student needed a portfolio that would stand out among thousands of applicants for competitive design internships.",
                "solution": "We created a bold, creative portfolio that showcases their design process, not just final outcomes. Interactive project cards reveal the thinking behind each design decision.",
                "features": "Project gallery,Design process showcase,Resume download,Skills visualization,Contact form,Blog",
                "technologies": "HTML,CSS,JavaScript,GSAP",
                "design_approach": "Playful yet professional. Used the student's personal brand colors and a grid-based layout that demonstrates design sensibility.",
                "results": "Client landed 3 internship interviews within the first 2 weeks of sharing the portfolio.",
                "image_color": "#10B981",
                "featured": 0,
            },
            {
                "title": "Travel Platform",
                "slug": "travel-platform",
                "category": "UI/UX",
                "description": "UI/UX design for a modern travel booking and experience platform.",
                "long_description": "Complete UI/UX design for a travel startup, covering user research, wireframes, design system creation, and high-fidelity prototypes for web and mobile apps.",
                "problem": "The travel startup had a great product idea but needed professional design to attract investors and validate the concept with users.",
                "solution": "We conducted user research with 20 potential users, created detailed wireframes, developed a comprehensive design system, and delivered interactive Figma prototypes.",
                "features": "User research,50+ wireframes,Design system,Mobile app design,Web app design,Interactive prototype",
                "technologies": "Figma,FigJam,Protopie",
                "design_approach": "Vibrant, inspiring travel aesthetic. Large destination photography with clean booking UI overlaid. Focused on the emotional aspect of travel planning.",
                "results": "Startup raised seed funding using the prototype. Usability testing showed 90% task completion rate.",
                "image_color": "#F59E0B",
                "featured": 1,
            },
        ]
        
        for project in portfolio_projects:
            conn.execute("""
                INSERT INTO portfolio_projects 
                (title, slug, category, description, long_description, problem, solution, 
                 features, technologies, design_approach, results, image_color, featured)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                project["title"], project["slug"], project["category"],
                project["description"], project["long_description"],
                project["problem"], project["solution"], project["features"],
                project["technologies"], project["design_approach"],
                project["results"], project["image_color"], project["featured"]
            ))
        
        print("✅ Sample portfolio projects seeded")

    # ── Seed Sample Projects for Demo Client ────────────────────────────────────
    demo_user = conn.execute("SELECT id FROM users WHERE email = 'demo@webcraftstudio.com'").fetchone()
    if demo_user:
        project_count = conn.execute(
            "SELECT COUNT(*) as cnt FROM projects WHERE user_id = ?", (demo_user["id"],)
        ).fetchone()["cnt"]
        
        if project_count == 0:
            statuses = ["completed", "development", "submitted"]
            services = ["Portfolio Website", "Business Website", "Landing Page"]
            project_names = ["My Developer Portfolio", "Restaurant Business Site", "Product Launch Page"]
            
            for i, (status, service, name) in enumerate(zip(statuses, services, project_names)):
                year = datetime.now().year
                code = f"WC-{year}-{str(i + 1).zfill(3)}"
                conn.execute("""
                    INSERT INTO projects 
                    (project_code, user_id, service, project_name, description, budget, timeline, status)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """, (code, demo_user["id"], service, name, 
                      f"Sample project for {name}", "₹5,000 – ₹10,000", "2 weeks", status))
        
            conn.commit()
            
            # Add some updates and messages for demo project
            demo_project = conn.execute(
                "SELECT id FROM projects WHERE user_id = ? LIMIT 1", (demo_user["id"],)
            ).fetchone()
            
            admin = conn.execute("SELECT id FROM users WHERE role = 'admin' LIMIT 1").fetchone()
            
            if demo_project and admin:
                conn.execute("""
                    INSERT INTO project_updates (project_id, title, description)
                    VALUES (?, ?, ?)
                """, (demo_project["id"], "Project Started", "We have reviewed your requirements and started working on your project."))
                
                conn.execute("""
                    INSERT INTO messages (project_id, sender_id, sender_role, message)
                    VALUES (?, ?, ?, ?)
                """, (demo_project["id"], admin["id"], "admin", "Hello! We've reviewed your project requirements. We'll start with the design mockups. Do you have any specific color preferences?"))
                
                conn.execute("""
                    INSERT INTO notifications (user_id, title, message, type)
                    VALUES (?, ?, ?, ?)
                """, (demo_user["id"], "Project Update", "Your project has moved to Design phase!", "success"))

    conn.commit()
    conn.close()
    print("✅ Database seeded successfully")


if __name__ == "__main__":
    init_db()
    seed_sample_data()
    print("✅ Database initialized")
