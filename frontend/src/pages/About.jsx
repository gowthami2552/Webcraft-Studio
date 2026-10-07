import { ArrowRight, Code, PenTool, Zap, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="page-enter" style={{ paddingTop: 100 }}>
      {/* Hero */}
      <section style={{ padding: '80px 0 60px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-label">About Us</div>
          <h1 style={{ fontSize: 'clamp(32px,5vw,56px)', marginBottom: 16 }}>We Build Digital Experiences.</h1>
          <p style={{ fontSize: 18, maxWidth: 680, color: 'var(--text2)', lineHeight: 1.8 }}>
            WebCraft Studio is a creative web development agency dedicated to building high-quality, modern, and performant websites for individuals, startups, and established businesses.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }} className="about-grid">
            <div>
              <h2 style={{ fontSize: 32, marginBottom: 20 }}>Our Mission</h2>
              <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 16 }}>
                We believe that every great idea deserves a beautiful home on the internet. Our mission is to make premium web design and development accessible to everyone—from students launching their first portfolio to businesses scaling their operations.
              </p>
              <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 32 }}>
                We combine modern technologies like React, Node, and Python with stunning UI/UX principles to deliver platforms that don't just look good, but perform exceptionally well.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {['Client-first approach', 'Clean, maintainable code', 'Pixel-perfect design', 'Performance optimized'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 500 }}>
                    <CheckCircle size={18} color="var(--accent)" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 24, padding: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                <div>
                  <div style={{ marginBottom: 8, color: 'var(--accent)' }}><Code size={42} strokeWidth={2} /></div>
                  <div style={{ color: 'var(--text2)', fontSize: 15, fontWeight: 500, lineHeight: 1.4 }}>Making websites with latest technology</div>
                </div>
                <div>
                  <div style={{ fontSize: 42, fontWeight: 800, color: 'var(--accent2)', fontFamily: 'var(--font-heading)' }}>100%</div>
                  <div style={{ color: 'var(--text2)', fontSize: 15, fontWeight: 500 }}>Client Satisfaction</div>
                </div>
                <div>
                  <div style={{ marginBottom: 8, color: '#F59E0B' }}><Zap size={42} strokeWidth={2} /></div>
                  <div style={{ color: 'var(--text2)', fontSize: 15, fontWeight: 500, lineHeight: 1.4 }}>Easy understanding</div>
                </div>
                <div>
                  <div style={{ fontSize: 42, fontWeight: 800, color: '#10B981', fontFamily: 'var(--font-heading)' }}>24/7</div>
                  <div style={{ color: 'var(--text2)', fontSize: 15, fontWeight: 500 }}>Support Provided</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0', background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(24px,4vw,36px)', marginBottom: 12 }}>Ready to work with us?</h2>
          <p style={{ fontSize: 17, marginBottom: 32, color: 'var(--text2)' }}>Let's discuss how we can help your business grow online.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/start-project" className="btn btn-primary btn-lg">Start a Project <ArrowRight size={18} /></Link>
            <Link to="/contact" className="btn btn-secondary btn-lg">Contact Us</Link>
          </div>
        </div>
      </section>
      <style>{`@media(max-width: 768px) { .about-grid { grid-template-columns: 1fr!important; } }`}</style>
    </div>
  );
}
