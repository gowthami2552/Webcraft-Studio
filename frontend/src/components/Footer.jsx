import { Link } from 'react-router-dom';
import { Mail, MessageCircle, MapPin, ArrowRight } from 'lucide-react';
import VectorLogo from './vectors/VectorLogo';

const SERVICES_LINKS = [
  { label: 'Portfolio Website', to: '/services/portfolio' },
  { label: 'Business Website', to: '/services/business' },
  { label: 'Landing Page', to: '/services/landing-pages' },
  { label: 'E-commerce', to: '/services/ecommerce' },
  { label: 'UI/UX Design', to: '/services/ui-ux' },
  { label: 'AI Website', to: '/services/ai-websites' },
];

const QUICK_LINKS = [
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/work' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Start a Project', to: '/start-project' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: '#2F1F16', // Dark brown
      color: '#FFFFFF',
      paddingTop: '80px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="container">
        {/* Main footer grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1.3fr',
          gap: '48px',
          paddingBottom: '60px',
        }} className="footer-grid">
          
          {/* Brand column */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 16 }}>
              <VectorLogo size={36} />
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 18, color: '#FFFFFF' }}>
                WebCraft Studio
              </span>
            </Link>
            <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 24, color: 'rgba(255,255,255,0.7)', maxWidth: 280 }}>
              Websites Built Around Your Ideas. We design and develop modern websites for individuals, 
              startups and businesses.
            </p>
            {/* Social links placeholder */}
            <div style={{ display: 'flex', gap: 10 }}>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF', marginBottom: 20 }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {QUICK_LINKS.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'var(--transition)' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF', marginBottom: 20 }}>Services</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SERVICES_LINKS.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'var(--transition)' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF', marginBottom: 20 }}>Get In Touch</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <a href="mailto:hello@webcraftstudio.com" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
                <Mail size={15} color="#E4D5C5" />
                hello@webcraftstudio.com
              </a>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
                <MessageCircle size={15} color="#E4D5C5" style={{ marginTop: 2 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <a href="https://wa.me/919494973995" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>+91 94949 73995</a>
                  <a href="https://wa.me/919032913846" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>+91 90329 13846</a>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
                <MapPin size={15} color="#E4D5C5" />
                Andhra Pradesh, India
              </div>
            </div>
            
            <div style={{ marginTop: 24 }}>
              <Link
                to="/start-project"
                className="btn"
                style={{ display: 'inline-flex', background: '#FFFFFF', color: '#2F1F16' }}
              >
                Start a Project <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          padding: '24px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
        }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
            © {year} WebCraft Studio. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link to="/privacy" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to="/terms" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </footer>
  );
}
