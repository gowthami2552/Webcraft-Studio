import { ArrowRight, Code, PenTool, Zap, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import VectorBackground from '../components/vectors/VectorBackground';
import AboutVectorScene from '../components/vectors/AboutVectorScene';
import VectorWaveDivider from '../components/vectors/VectorWaveDivider';

export default function About() {
  return (
    <div className="page-enter" style={{ paddingTop: 100 }}>
      {/* Hero */}
      <section style={{ padding: '80px 0 60px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <VectorBackground style={{ opacity: 0.4 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-label">About Us</div>
          <h1 style={{ fontSize: 'clamp(32px,5vw,56px)', marginBottom: 16 }}>We Build Digital Experiences.</h1>
          <p style={{ fontSize: 18, maxWidth: 680, color: 'var(--text2)', lineHeight: 1.8 }}>
            WebCraft Studio is a creative web development agency dedicated to building high-quality, modern, and performant websites for individuals, startups, and established businesses.
          </p>
        </div>
      </section>

      <VectorWaveDivider color="var(--bg2)" flip />

      {/* Story */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.1fr', gap: 60, alignItems: 'center' }} className="about-grid">
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
            <div>
              <AboutVectorScene />
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
