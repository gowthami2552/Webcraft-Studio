import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { projectsAPI, contentAPI } from '../api';
import { getStatusColor, getStatusLabel, formatDate } from '../utils/helpers';
import { LayoutDashboard, Users, MessageSquare, CheckCircle, FolderOpen, ArrowRight, Mail } from 'lucide-react';

export default function AdminDashboard() {
  const { user, isLoggedIn, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!isLoggedIn || !isAdmin) { navigate('/'); return; }
    document.title = 'Admin Dashboard | WebCraft Studio';
    loadData();
  }, [authLoading, isLoggedIn, isAdmin]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [sRes, pRes, cRes] = await Promise.all([
        projectsAPI.getStats(),
        projectsAPI.getAllProjects(),
        contentAPI.getContacts()
      ]);
      setStats(sRes.data);
      setProjects(pRes.data.projects || []);
      setContacts(cRes.data.contacts || []);
    } catch {}
    finally { setLoading(false); }
  };

  const updateStatus = async (projectId, newStatus) => {
    try {
      await projectsAPI.updateStatus(projectId, { status: newStatus });
      loadData(); // Reload projects
    } catch (err) {
      alert(err.message || 'Failed to update status');
    }
  };

  if (authLoading || loading) return <div className="loading-container" style={{ minHeight: '100vh', paddingTop: 100 }}><div className="spinner" /></div>;

  return (
    <div style={{ minHeight: '100vh', paddingTop: 100, background: 'var(--bg)' }}>
      <div className="container" style={{ maxWidth: 1200, padding: '40px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div className="section-label">Admin Portal</div>
            <h1 style={{ fontSize: 'clamp(24px,4vw,36px)', marginBottom: 6 }}>WebCraft Studio Admin</h1>
            <p style={{ color: 'var(--text2)', fontSize: 15 }}>Manage projects, clients, and platform content.</p>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 40 }} className="admin-stats">
            <div className="card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text2)', marginBottom: 12 }}>
                <FolderOpen size={16} /> <span style={{ fontSize: 13, fontWeight: 600 }}>Total Projects</span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'var(--font-heading)' }}>{stats.total_projects}</div>
            </div>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--info)', marginBottom: 12 }}>
                <CheckCircle size={16} /> <span style={{ fontSize: 13, fontWeight: 600 }}>New Requests</span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'var(--font-heading)' }}>{stats.new_requests}</div>
            </div>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--warning)', marginBottom: 12 }}>
                <LayoutDashboard size={16} /> <span style={{ fontSize: 13, fontWeight: 600 }}>Active Projects</span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'var(--font-heading)' }}>{stats.active_projects}</div>
            </div>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--accent)', marginBottom: 12 }}>
                <Users size={16} /> <span style={{ fontSize: 13, fontWeight: 600 }}>Total Clients</span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'var(--font-heading)' }}>{stats.total_clients}</div>
            </div>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--success)', marginBottom: 12 }}>
                <MessageSquare size={16} /> <span style={{ fontSize: 13, fontWeight: 600 }}>Unread Contacts</span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'var(--font-heading)' }}>{stats.unread_contacts}</div>
            </div>
          </div>
        )}

        {/* Projects Table */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700 }}>All Projects</h3>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--card2)', fontSize: 12, textTransform: 'uppercase', color: 'var(--text3)', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Project ID</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Client</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Project Name</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Date</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p, i) => (
                  <tr key={p.id} style={{ borderBottom: i === projects.length - 1 ? 'none' : '1px solid var(--border)', transition: 'background .2s ease' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--card2)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '16px 24px', fontSize: 13, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-heading)' }}>{p.project_code}</td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{p.client_name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text3)' }}>{p.client_email}</div>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{p.project_name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text3)' }}>{p.service}</div>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <select 
                        value={p.status} 
                        onChange={(e) => updateStatus(p.id, e.target.value)}
                        style={{ background: 'var(--card2)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', padding: '6px 10px', fontSize: 12, cursor: 'pointer' }}>
                        <option value="submitted">Submitted</option>
                        <option value="discussion">In Discussion</option>
                        <option value="design">Design Phase</option>
                        <option value="development">Development</option>
                        <option value="review">Ready for Review</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td style={{ padding: '16px 24px', fontSize: 13, color: 'var(--text2)' }}>{formatDate(p.created_at)}</td>
                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                      <Link to={`/dashboard/project/${p.id}`} className="btn btn-secondary btn-sm">View <ArrowRight size={14} /></Link>
                    </td>
                  </tr>
                ))}
                {projects.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--text3)' }}>No projects found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Contacts Table */}
        <div className="card" style={{ padding: 0, overflow: 'hidden', marginTop: 32 }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <Mail color="var(--accent)" />
            <h3 style={{ fontSize: 18, fontWeight: 700 }}>Contact & Quote Requests</h3>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--card2)', fontSize: 12, textTransform: 'uppercase', color: 'var(--text3)', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Sender</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Subject</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Message</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c, i) => (
                  <tr key={c.id} style={{ borderBottom: i === contacts.length - 1 ? 'none' : '1px solid var(--border)', background: c.is_read ? 'transparent' : 'rgba(124,92,255,0.05)' }}>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text3)' }}>{c.email}</div>
                      <div style={{ fontSize: 12, color: 'var(--text3)' }}>{c.phone}</div>
                    </td>
                    <td style={{ padding: '16px 24px', fontSize: 14, fontWeight: 600 }}>{c.subject}</td>
                    <td style={{ padding: '16px 24px', fontSize: 13, color: 'var(--text2)', maxWidth: 300, whiteSpace: 'pre-wrap' }}>{c.message}</td>
                    <td style={{ padding: '16px 24px', fontSize: 13, color: 'var(--text2)' }}>
                      {formatDate(c.created_at)}
                      {!c.is_read && (
                        <button onClick={async () => { await contentAPI.markContactRead(c.id); loadData(); }} className="btn btn-sm" style={{ display: 'block', marginTop: 8, background: 'var(--accent)', color: '#fff' }}>Mark Read</button>
                      )}
                    </td>
                  </tr>
                ))}
                {contacts.length === 0 && (
                  <tr>
                    <td colSpan="4" style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--text3)' }}>No requests found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
      <style>{`@media(max-width:1024px){.admin-stats{grid-template-columns:repeat(3,1fr)!important}}@media(max-width:768px){.admin-stats{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </div>
  );
}
