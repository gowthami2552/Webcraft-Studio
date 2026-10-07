import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { projectsAPI, contentAPI } from '../api';
import { getStatusColor, getStatusLabel, formatDate } from '../utils/helpers';
import { Plus, FolderOpen, Bell, ChevronRight, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const { user, isLoggedIn, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('projects');

  useEffect(() => {
    if (authLoading) return;
    if (!isLoggedIn) { navigate('/login', { state: { from: '/dashboard' } }); return; }
    if (isAdmin) { navigate('/admin'); return; }
    document.title = 'Dashboard | WebCraft Studio';
    loadData();
  }, [authLoading, isLoggedIn, isAdmin]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [pRes, nRes] = await Promise.all([
        projectsAPI.getMyProjects(),
        contentAPI.getNotifications(),
      ]);
      setProjects(pRes.data.projects || []);
      setNotifications(nRes.data.notifications || []);
    } catch {}
    finally { setLoading(false); }
  };

  const markRead = async () => {
    await contentAPI.markNotificationsRead();
    setNotifications(n => n.map(x => ({ ...x, is_read: 1 })));
  };

  const statusCounts = {
    total: projects.length,
    active: projects.filter(p => ['design','development','discussion','review'].includes(p.status)).length,
    completed: projects.filter(p => p.status === 'completed').length,
    submitted: projects.filter(p => p.status === 'submitted').length,
  };

  const unread = notifications.filter(n => !n.is_read).length;

  if (authLoading || loading) return <div className="loading-container" style={{ minHeight: '100vh', paddingTop: 100 }}><div className="spinner" /></div>;

  return (
    <div style={{ minHeight: '100vh', paddingTop: 100, background: 'var(--bg)' }}>
      <div className="container" style={{ maxWidth: 1000, padding: '40px 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div className="section-label">Client Portal</div>
            <h1 style={{ fontSize: 'clamp(24px,4vw,36px)', marginBottom: 6 }}>Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
            <p style={{ color: 'var(--text2)', fontSize: 15 }}>Here's an overview of your projects and updates.</p>
          </div>
          <Link to="/start-project" className="btn btn-primary"><Plus size={16} /> New Project</Link>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 36 }} className="dash-stats">
          {[
            { label: 'Total Projects', value: statusCounts.total, color: 'var(--accent)' },
            { label: 'Submitted', value: statusCounts.submitted, color: '#94A3B8' },
            { label: 'In Progress', value: statusCounts.active, color: '#60A5FA' },
            { label: 'Completed', value: statusCounts.completed, color: '#10B981' },
          ].map((s, i) => (
            <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: s.color, fontFamily: 'var(--font-heading)' }}>{s.value}</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'var(--card2)', borderRadius: 12, padding: 4, width: 'fit-content' }}>
          {['projects', 'notifications'].map(tab => (
            <button key={tab} onClick={() => { setActiveTab(tab); if (tab === 'notifications') markRead(); }}
              style={{ padding: '9px 20px', borderRadius: 9, border: 'none', cursor: 'pointer', background: activeTab === tab ? 'var(--card)' : 'transparent', color: activeTab === tab ? 'var(--text)' : 'var(--text2)', fontWeight: 600, fontSize: 14, transition: 'all .2s ease', display: 'flex', alignItems: 'center', gap: 8 }}>
              {tab === 'projects' ? <FolderOpen size={15} /> : <Bell size={15} />}
              {tab === 'projects' ? 'My Projects' : 'Notifications'}
              {tab === 'notifications' && unread > 0 && <span style={{ background: 'var(--error)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '1px 5px', borderRadius: 10 }}>{unread}</span>}
            </button>
          ))}
        </div>

        {/* Projects tab */}
        {activeTab === 'projects' && (
          <div>
            {projects.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon"><FolderOpen size={28} /></div>
                <h3>No projects yet</h3>
                <p>Start your first project and let's build something great together.</p>
                <Link to="/start-project" className="btn btn-primary"><Plus size={16} /> Start a Project</Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {projects.map(p => (
                  <Link key={p.id} to={`/dashboard/project/${p.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 20, transition: 'all .25s ease', flexWrap: 'wrap' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(64,45,34,.4)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = ''; }}>
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 11, color: 'var(--accent)', letterSpacing: '0.05em' }}>{p.project_code}</span>
                          <span className={`status-badge ${getStatusColor(p.status)}`}>{getStatusLabel(p.status)}</span>
                        </div>
                        <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{p.project_name}</h3>
                        <div style={{ fontSize: 13, color: 'var(--text3)' }}>{p.service}</div>
                      </div>
                      <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexShrink: 0, flexWrap: 'wrap' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: 11, color: 'var(--text3)' }}>Budget</div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)' }}>{p.budget || 'TBD'}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: 11, color: 'var(--text3)' }}>Timeline</div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)' }}>{p.timeline || 'TBD'}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: 11, color: 'var(--text3)' }}>Submitted</div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)' }}>{formatDate(p.created_at)}</div>
                        </div>
                        <ChevronRight size={18} color="var(--text3)" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Notifications tab */}
        {activeTab === 'notifications' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {notifications.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon"><Bell size={28} /></div>
                <h3>No notifications</h3>
                <p>You'll be notified when there are updates on your projects.</p>
              </div>
            ) : (
              notifications.map(n => (
                <div key={n.id} style={{ border: `1px solid ${!n.is_read ? 'rgba(64,45,34,.3)' : 'var(--border)'}`, borderRadius: 12, padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'flex-start', background: !n.is_read ? 'rgba(64,45,34,.04)' : 'var(--card)' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: n.type === 'success' ? 'rgba(16,185,129,.12)' : 'rgba(64,45,34,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {n.type === 'success' ? <CheckCircle size={16} color="#10B981" /> : <Bell size={16} color="var(--accent)" />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)', marginBottom: 4 }}>{n.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 6 }}>{n.message}</div>
                    <div style={{ fontSize: 11, color: 'var(--text3)' }}>{formatDate(n.created_at)}</div>
                  </div>
                  {!n.is_read && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, marginTop: 6 }} />}
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <style>{`@media(max-width:768px){.dash-stats{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:480px){.dash-stats{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
