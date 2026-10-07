import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { projectsAPI } from '../api';
import { getStatusColor, getStatusLabel, formatDate, getInitials } from '../utils/helpers';
import { Send, ArrowLeft, Clock, FileText } from 'lucide-react';

export default function ClientProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isLoggedIn, isAdmin, loading: authLoading } = useAuth();
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (authLoading) return;
    if (!isLoggedIn) { navigate('/login'); return; }
    loadProject();
  }, [authLoading, isLoggedIn, id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [data?.messages]);

  const loadProject = async () => {
    try {
      const res = await projectsAPI.getProject(id);
      setData(res.data);
      document.title = `Project: ${res.data.project.project_name} | WebCraft Studio`;
    } catch (err) {
      alert('Failed to load project details');
      navigate(isAdmin ? '/admin' : '/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || sending) return;
    setSending(true);
    try {
      await projectsAPI.sendMessage(id, message);
      setMessage('');
      loadProject(); // refresh messages
    } catch (err) {
      alert(err.message || 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  if (authLoading || loading) return <div className="loading-container" style={{ minHeight: '100vh', paddingTop: 100 }}><div className="spinner" /></div>;
  if (!data) return null;

  const { project, messages } = data;

  return (
    <div className="page-enter" style={{ minHeight: '100vh', paddingTop: 100, background: 'var(--bg2)' }}>
      <div className="container" style={{ maxWidth: 1000, padding: '40px 24px' }}>
        <Link to={isAdmin ? '/admin' : '/dashboard'} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text2)', marginBottom: 24, fontSize: 14, fontWeight: 600 }}>
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: 32 }}>
          {/* Main Chat Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="card" style={{ padding: '24px 32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <div className="section-label" style={{ marginBottom: 8 }}>{project.project_code}</div>
                  <h1 style={{ fontSize: 'clamp(24px, 3vw, 32px)', marginBottom: 8 }}>{project.project_name}</h1>
                  <p style={{ color: 'var(--text2)' }}>{project.service} • {project.package}</p>
                </div>
                <span className={`status-badge ${getStatusColor(project.status)}`}>{getStatusLabel(project.status)}</span>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text)', background: 'var(--bg2)', padding: 16, borderRadius: 12 }}>{project.description}</p>
            </div>

            {/* Chat Box */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', height: 500, padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', background: 'var(--bg2)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff' }}>
                  {isAdmin ? getInitials(project.client_name || 'Client') : 'WS'}
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>{isAdmin ? project.client_name : 'WebCraft Studio Team'}</div>
                  <div style={{ fontSize: 12, color: 'var(--text3)' }}>{isAdmin ? project.client_email : 'We usually reply within a few hours'}</div>
                </div>
              </div>
              
              <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {messages.length === 0 ? (
                  <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--text3)' }}>
                    <p>No messages yet.</p>
                    <p style={{ fontSize: 13 }}>Send a message to start the conversation.</p>
                  </div>
                ) : (
                  messages.map((m, i) => {
                    const isMe = m.sender_id === user.id;
                    return (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, maxWidth: '80%', flexDirection: isMe ? 'row-reverse' : 'row' }}>
                          <div style={{ width: 28, height: 28, borderRadius: '50%', background: isMe ? 'var(--accent)' : 'var(--card2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>
                            {getInitials(m.sender_name)}
                          </div>
                          <div style={{ background: isMe ? 'var(--accent)' : 'var(--card2)', color: isMe ? '#fff' : 'var(--text)', padding: '12px 16px', borderRadius: 16, borderBottomRightRadius: isMe ? 4 : 16, borderBottomLeftRadius: isMe ? 16 : 4, fontSize: 14, lineHeight: 1.5 }}>
                            {m.message}
                          </div>
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4, marginHoriztontal: 36 }}>{formatDate(m.created_at)}</div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)', background: 'var(--bg2)' }}>
                <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: 12 }}>
                  <input type="text" className="form-input" style={{ flex: 1, background: 'var(--card)', borderRadius: 100, padding: '12px 20px' }} placeholder="Type your message..." value={message} onChange={e => setMessage(e.target.value)} disabled={sending} />
                  <button type="submit" disabled={sending || !message.trim()} className="btn btn-primary" style={{ borderRadius: 100, width: 46, height: 46, padding: 0, flexShrink: 0, opacity: (!message.trim() || sending) ? 0.5 : 1 }}>
                    <Send size={18} style={{ marginLeft: -2 }} />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 16, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><FileText size={18} color="var(--accent)" /> Project Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 4 }}>Budget</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{project.budget}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 4 }}>Requested Date</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{formatDate(project.created_at)}</div>
                </div>
                {isAdmin && (
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 4 }}>Client</div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{project.client_name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text3)' }}>{project.client_email}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.container>div{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
