import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { contentAPI } from '../api';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    contentAPI.getPortfolioProject(slug)
      .then(r => {
        setProject(r.data.project);
        document.title = `${r.data.project.title} | WebCraft Studio`;
      })
      .catch(() => setError('Project not found'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="loading-container" style={{ minHeight: '100vh', paddingTop: 100 }}><div className="spinner" /></div>;
  if (error || !project) return (
    <div style={{ minHeight: '100vh', paddingTop: 140, textAlign: 'center' }} className="container">
      <AlertCircle size={48} color="var(--text3)" style={{ margin: '0 auto 16px' }} />
      <h2 style={{ marginBottom: 8 }}>Project Not Found</h2>
      <p style={{ marginBottom: 24 }}>This project doesn't exist or has been removed.</p>
      <Link to="/work" className="btn btn-primary"><ArrowLeft size={16} /> Back to Work</Link>
    </div>
  );

  return (
    <div className="page-enter" style={{ paddingTop: 100 }}>
      {/* Hero */}
      <section style={{
        padding: '60px 0',
        background: `linear-gradient(135deg, ${project.image_color}22 0%, transparent 60%)`,
        borderBottom: '1px solid var(--border)',
      }}>
        <div className="container">
          <Link to="/work" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--text2)', marginBottom: 24, textDecoration: 'none' }}>
            <ArrowLeft size={14} /> Back to Work
          </Link>
          <span className="tag" style={{ display: 'inline-flex', marginBottom: 16 }}>{project.category}</span>
          <h1 style={{ fontSize: 'clamp(28px,5vw,52px)', marginBottom: 16 }}>{project.title}</h1>
          <p style={{ fontSize: 18, color: 'var(--text2)', maxWidth: 600, marginBottom: 24 }}>{project.description}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {(project.technologies || []).map(t => (
              <span key={t} className="tag tag-blue">{t.trim()}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Preview */}
      <section style={{ padding: '60px 0', background: 'var(--bg2)' }}>
        <div className="container">
          <div style={{
            height: 400,
            background: `linear-gradient(135deg, ${project.image_color}33, ${project.image_color}11)`,
            borderRadius: 20,
            border: `1px solid ${project.image_color}33`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{ textAlign: 'center', color: 'var(--text2)' }}>
              <div style={{ width: 200, height: 140, background: project.image_color + '22', border: `1px solid ${project.image_color}44`, borderRadius: 12, margin: '0 auto 16px', display: 'flex', flexDirection: 'column', gap: 6, padding: 16 }}>
                <div style={{ display: 'flex', gap: 4 }}>{['#EF4444','#F59E0B','#10B981'].map(c => <span key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />)}</div>
                <div style={{ height: 6, background: project.image_color, borderRadius: 3, width: '50%', opacity: 0.9 }} />
                <div style={{ height: 4, background: project.image_color + '55', borderRadius: 2 }} />
                <div style={{ height: 4, background: project.image_color + '55', borderRadius: 2, width: '70%' }} />
                <div style={{ flex: 1, background: project.image_color + '22', borderRadius: 8, marginTop: 4 }} />
              </div>
              <p style={{ fontSize: 13 }}>Project Preview — {project.title}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 48 }} className="project-detail-grid">
            <div>
              {project.long_description && (
                <div style={{ marginBottom: 40 }}>
                  <h2 style={{ fontSize: 24, marginBottom: 14 }}>Project Overview</h2>
                  <p style={{ fontSize: 16, lineHeight: 1.8 }}>{project.long_description}</p>
                </div>
              )}
              {project.problem && (
                <div style={{ marginBottom: 40 }}>
                  <h2 style={{ fontSize: 24, marginBottom: 14 }}>The Problem</h2>
                  <p style={{ fontSize: 16, lineHeight: 1.8 }}>{project.problem}</p>
                </div>
              )}
              {project.solution && (
                <div style={{ marginBottom: 40 }}>
                  <h2 style={{ fontSize: 24, marginBottom: 14 }}>Our Solution</h2>
                  <p style={{ fontSize: 16, lineHeight: 1.8 }}>{project.solution}</p>
                </div>
              )}
              {project.design_approach && (
                <div style={{ marginBottom: 40 }}>
                  <h2 style={{ fontSize: 24, marginBottom: 14 }}>Design Approach</h2>
                  <p style={{ fontSize: 16, lineHeight: 1.8 }}>{project.design_approach}</p>
                </div>
              )}
              {project.results && (
                <div style={{ padding: '24px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 16, marginBottom: 40 }}>
                  <h2 style={{ fontSize: 20, marginBottom: 10, color: '#10B981' }}>Results 🎉</h2>
                  <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text2)' }}>{project.results}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {project.features && (
                <div className="card">
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Key Features</h3>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {(project.features || []).map(f => (
                      <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text2)' }}>
                        <CheckCircle size={14} color="var(--accent)" /> {f.trim()}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="card">
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Technologies</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {(project.technologies || []).map(t => (
                    <span key={t} className="tag">{t.trim()}</span>
                  ))}
                </div>
              </div>
              <div className="card" style={{ textAlign: 'center', background: 'rgba(64,45,34,0.06)', borderColor: 'rgba(64,45,34,0.2)' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Want Something Similar?</h3>
                <p style={{ fontSize: 13, marginBottom: 16 }}>Let's build your project from the ground up.</p>
                <Link to="/start-project" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Start a Project <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{`@media (max-width: 1024px) { .project-detail-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
