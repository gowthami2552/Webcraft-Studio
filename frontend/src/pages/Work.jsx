import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Filter } from 'lucide-react';
import { contentAPI } from '../api';
import { useScrollReveal } from '../hooks/useScrollReveal';

const CATS = ['All', 'Portfolio', 'Business', 'Landing Page', 'AI', 'E-commerce', 'UI/UX'];

export default function Work() {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [active, setActive] = useState('All');
  const [loading, setLoading] = useState(true);
  const ref = useScrollReveal();

  useEffect(() => {
    document.title = 'Our Work | WebCraft Studio';
    contentAPI.getPortfolio().then(r => { setProjects(r.data.projects || []); setFiltered(r.data.projects || []); }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filter = (cat) => {
    setActive(cat);
    setFiltered(cat === 'All' ? projects : projects.filter(p => p.category.toLowerCase() === cat.toLowerCase()));
  };

  return (
    <div className="page-enter" style={{ paddingTop: 100 }}>
      <style>{`@media(max-width:1024px){.work-pg{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:640px){.work-pg{grid-template-columns:1fr!important}}`}</style>
      <section style={{ padding: '80px 0 60px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-label">Portfolio</div>
          <h1 style={{ fontSize: 'clamp(32px,5vw,56px)', marginBottom: 16 }}>Our Work</h1>
          <p style={{ fontSize: 18, maxWidth: 560, color: 'var(--text2)' }}>A showcase of projects we've built for clients across different industries and use cases.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', gap: 8, marginBottom: 48, flexWrap: 'wrap' }}>
            {CATS.map(cat => (
              <button key={cat} onClick={() => filter(cat)} style={{ padding: '8px 20px', borderRadius: 100, fontSize: 14, fontWeight: 600, cursor: 'pointer', border: active === cat ? 'none' : '1px solid var(--border)', background: active === cat ? 'var(--accent)' : 'transparent', color: active === cat ? '#fff' : 'var(--text2)', transition: 'all .2s ease' }}>{cat}</button>
            ))}
          </div>
          {loading ? (<div className="loading-container"><div className="spinner" /></div>) : filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon"><Filter size={28} /></div>
              <h3>No projects in this category</h3>
              <p>Check back soon — we're always working on new projects.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }} className="work-pg page-enter">
              {filtered.map(p => (
                <Link key={p.id} to={`/work/${p.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden', transition: 'all .25s ease', height: '100%', display: 'flex', flexDirection: 'column' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,.4)'; e.currentTarget.style.borderColor = 'rgba(64,45,34,.3)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = 'var(--border)'; }}>
                    <div style={{ height: 200, background: `linear-gradient(135deg,${p.image_color}44,${p.image_color}11)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      <div style={{ width: 120, height: 80, background: p.image_color + '22', border: `1px solid ${p.image_color}44`, borderRadius: 10, padding: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
                        <div style={{ height: 5, background: p.image_color, borderRadius: 3, width: '50%', opacity: .9 }} />
                        <div style={{ height: 3, background: p.image_color + '55', borderRadius: 2 }} />
                        <div style={{ height: 3, background: p.image_color + '55', borderRadius: 2, width: '75%' }} />
                        <div style={{ flex: 1, background: p.image_color + '22', borderRadius: 6, marginTop: 4 }} />
                      </div>
                      {p.featured === 1 && <span style={{ position: 'absolute', top: 12, right: 12, fontSize: 10, fontWeight: 700, background: 'rgba(64,45,34,.9)', color: '#fff', padding: '3px 8px', borderRadius: 4 }}>Featured</span>}
                    </div>
                    <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <span className="tag" style={{ marginBottom: 10, display: 'inline-flex' }}>{p.category}</span>
                      <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>{p.title}</h3>
                      <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65, marginBottom: 14 }}>{p.description}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16, marginTop: 'auto' }}>
                        {(p.technologies || []).slice(0, 4).map(t => <span key={t} style={{ fontSize: 11, color: 'var(--text3)', background: 'var(--card2)', padding: '3px 8px', borderRadius: 4, fontWeight: 600 }}>{t.trim()}</span>)}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--accent)', fontSize: 13, fontWeight: 600 }}>View Project <ArrowRight size={13} /></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
