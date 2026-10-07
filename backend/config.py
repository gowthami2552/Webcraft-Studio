"""
WebCraft Studio - Configuration Module
Centralizes all business and application configuration.
Edit this file to change business details without touching other files.
"""

import os
from datetime import timedelta

# ─── Business Configuration ────────────────────────────────────────────────────
BUSINESS_CONFIG = {
    "name": "WebCraft Studio",
    "tagline": "Websites Built Around Your Ideas.",
    "email": "hello@webcraftstudio.com",
    "whatsapp": "+919494973995",
    "phone": "+91 94949 73995",
    "location": "Andhra Pradesh, India",
    "linkedin": "https://linkedin.com/company/webcraftstudio",
    "github": "https://github.com/webcraftstudio",
    "instagram": "https://instagram.com/webcraftstudio",
    "twitter": "https://twitter.com/webcraftstudio",
}

# ─── Pricing Configuration ─────────────────────────────────────────────────────
PRICING_CONFIG = {
    "starter": {
        "name": "Starter",
        "price": 3999,
        "description": "Perfect for personal websites and simple projects",
        "features": [
            "Responsive design",
            "Up to 4 pages",
            "Contact form",
            "Basic animations",
            "Deployment assistance",
            "1 month support",
        ],
    },
    "pro": {
        "name": "Pro",
        "price": 7999,
        "description": "Great for professionals and growing businesses",
        "features": [
            "Up to 8 pages",
            "Custom UI design",
            "Advanced animations",
            "Responsive design",
            "SEO basics",
            "Deployment included",
            "2 months support",
        ],
    },
    "premium": {
        "name": "Premium",
        "price": 14999,
        "description": "Full-featured web applications and complex projects",
        "features": [
            "Custom web application",
            "Admin dashboard",
            "Database integration",
            "API integration",
            "Advanced UI/UX",
            "Deployment support",
            "3 months support",
        ],
    },
}

# ─── Services Configuration ────────────────────────────────────────────────────
SERVICES_CONFIG = [
    {
        "id": "portfolio",
        "name": "Portfolio Website",
        "slug": "portfolio",
        "icon": "briefcase",
        "description": "Build a professional online presence that showcases your skills, projects, experience and achievements.",
        "starting_price": 750,
        "delivery": "3–7 days",
        "features": ["Hero section", "About section", "Skills", "Projects", "Experience", "Resume", "Contact", "Social links", "Responsive design", "SEO basics", "Deployment"],
    },
    {
        "id": "business",
        "name": "Business Website",
        "slug": "business",
        "icon": "building",
        "description": "Create a strong online presence for your business or brand with a professional website.",
        "starting_price": 5999,
        "delivery": "5–10 days",
        "features": ["Home", "About", "Services", "Gallery", "Testimonials", "Contact", "Google Maps integration", "WhatsApp contact", "Responsive design"],
    },
    {
        "id": "landing-pages",
        "name": "Landing Page",
        "slug": "landing-pages",
        "icon": "layout",
        "description": "High-converting landing pages for your product, service, app or campaign.",
        "starting_price": 1200,
        "delivery": "3–7 days",
        "features": ["Conversion-focused design", "Hero section", "CTA", "Features", "Testimonials", "Pricing", "FAQ"],
    },
    {
        "id": "ecommerce",
        "name": "E-commerce Website",
        "slug": "ecommerce",
        "icon": "shopping-cart",
        "description": "Sell your products online with a modern and secure e-commerce store.",
        "starting_price": 2000,
        "delivery": "7–14 days",
        "features": ["Product catalogue", "Product details", "Shopping cart", "Checkout UI", "Order management", "Responsive design"],
    },
    {
        "id": "ui-ux",
        "name": "UI/UX Design",
        "slug": "ui-ux",
        "icon": "pen-tool",
        "description": "User-centered designs that make your product shine with great UX.",
        "starting_price": 4999,
        "delivery": "5–10 days",
        "features": ["User research", "Wireframes", "User flows", "UI design", "Responsive design", "Design systems", "Prototyping"],
    },
    {
        "id": "ai-websites",
        "name": "AI Website",
        "slug": "ai-websites",
        "icon": "cpu",
        "description": "Integrate AI APIs to create smart web applications and dashboards.",
        "starting_price": 9999,
        "delivery": "7–14 days",
        "features": ["AI chatbots", "AI assistants", "AI content tools", "AI productivity applications", "AI dashboards", "AI document tools"],
    },
    {
        "id": "custom-web-app",
        "name": "Custom Web Application",
        "slug": "custom-web-app",
        "icon": "code",
        "description": "Tailored web apps for your unique requirements — dashboards, SaaS, tools.",
        "starting_price": 12999,
        "delivery": "10–30 days",
        "features": ["Dashboards", "SaaS platforms", "Management systems", "Booking systems", "Student platforms", "Business tools"],
    },
    {
        "id": "redesign",
        "name": "Website Redesign",
        "slug": "redesign",
        "icon": "refresh-cw",
        "description": "Give your existing website a fresh and modern look with improved UX.",
        "starting_price": 4999,
        "delivery": "5–10 days",
        "features": ["Modern UI", "Improved UX", "Responsive design", "Performance optimization", "SEO improvements"],
    },
]

# ─── FAQ Configuration ─────────────────────────────────────────────────────────
FAQ_CONFIG = [
    {
        "question": "How long does a website take?",
        "answer": "It depends on the complexity. A simple portfolio takes 3–7 days, a business website 5–10 days, and a custom web application 10–30 days. We always agree on a timeline before starting.",
    },
    {
        "question": "How much does a website cost?",
        "answer": "Our projects start from ₹3,999. The final price depends on the type of website, number of pages, features, and complexity. Submit your requirements and we'll provide a custom quote.",
    },
    {
        "question": "Can I request a custom design?",
        "answer": "Absolutely! Every project we build is custom-designed based on your brand, preferences, and requirements. We don't use pre-made templates.",
    },
    {
        "question": "Do you provide hosting?",
        "answer": "We can guide you in choosing the right hosting provider and help you set it up. We work with Vercel, Netlify, Hostinger, and other platforms based on your needs.",
    },
    {
        "question": "Can you deploy the website?",
        "answer": "Yes! Deployment assistance is included in all our packages. We'll deploy your website and make sure it's live and working properly.",
    },
    {
        "question": "Can I update my website later?",
        "answer": "Yes. We build websites that are easy to maintain. We can also provide a content management panel if required. Post-launch support is included in all packages.",
    },
    {
        "question": "Do you build portfolio websites for students?",
        "answer": "Yes! We've helped many students create impressive portfolios. Starting from ₹3,999, we can build you a portfolio that helps you land internships and jobs.",
    },
    {
        "question": "Can you integrate AI?",
        "answer": "Yes! We integrate AI APIs like OpenAI, Google Gemini, and others to create chatbots, assistants, content tools, and smart dashboards.",
    },
    {
        "question": "Can I request changes after delivery?",
        "answer": "Yes. We offer a revision period after delivery. Minor changes are included. For larger changes, we'll discuss and quote accordingly.",
    },
]

# ─── Testimonials ──────────────────────────────────────────────────────────────
TESTIMONIALS_CONFIG = [
    {
        "name": "Priya Sharma",
        "role": "Software Developer",
        "company": "Infosys",
        "rating": 5,
        "text": "WebCraft Studio transformed my idea into a professional portfolio that I can confidently share with recruiters. The design is clean and modern — exactly what I wanted!",
        "avatar": "PS",
    },
    {
        "name": "Rahul Mehta",
        "role": "Startup Founder",
        "company": "TechBridge",
        "rating": 5,
        "text": "The team is professional, creative and always responsive. Our business website looks amazing and has already helped us get new clients. Worth every rupee!",
        "avatar": "RM",
    },
    {
        "name": "Sneha Varma",
        "role": "Business Owner",
        "company": "Varma Boutique",
        "rating": 5,
        "text": "Excellent work! They delivered our e-commerce store on time and the design is exactly what we wanted. Our online sales have doubled since launch.",
        "avatar": "SV",
    },
    {
        "name": "Arjun Nair",
        "role": "Freelance Designer",
        "company": "Self-employed",
        "rating": 5,
        "text": "I needed a portfolio to showcase my design work. WebCraft Studio delivered an incredibly beautiful site that perfectly represents my style. Highly recommended!",
        "avatar": "AN",
    },
    {
        "name": "Kavya Reddy",
        "role": "Marketing Manager",
        "company": "GrowthHive",
        "rating": 5,
        "text": "Our landing page conversion rate went up by 40% after the redesign. The team truly understands design and user experience. Amazing collaboration!",
        "avatar": "KR",
    },
]

# ─── Flask App Configuration ───────────────────────────────────────────────────
class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY") or "webcraft-studio-secret-key-2026-change-in-production"
    DATABASE_PATH = os.environ.get("DATABASE_PATH") or os.path.join(os.path.dirname(__file__), "database", "webcraft.db")
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY") or "webcraft-jwt-secret-2026-change-in-production"
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max upload
    UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "static", "uploads")
    CORS_ORIGINS = os.environ.get("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")
    DEBUG = os.environ.get("DEBUG", "True").lower() == "true"
    ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@webcraftstudio.com")
    ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "Admin@2026")
