import { useState } from 'react';
import { Mail, MessageCircle, MapPin, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { contentAPI } from '../api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState('');

  const [waMsg, setWaMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = `*New Contact Message*\n\n*Name:* ${form.name}\n*Email:* ${form.email}\n*Subject:* ${form.subject}\n\n*Message:*\n${form.message}`;
    setWaMsg(msg);
    setStatus('success');
  };

  return (
    <div className="page-enter" style={{ paddingTop: 100 }}>
      {/* Hero */}
      <section style={{ padding: '80px 0 60px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-label">Contact Us</div>
          <h1 style={{ fontSize: 'clamp(32px,5vw,56px)', marginBottom: 16 }}>Let's start a conversation.</h1>
          <p style={{ fontSize: 18, maxWidth: 580, color: 'var(--text2)' }}>Have a question, a project idea, or just want to say hi? We'd love to hear from you.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 60 }} className="contact-grid">
            {/* Left Info */}
            <div>
              <h2 style={{ fontSize: 24, marginBottom: 24 }}>Get In Touch</h2>
              <p style={{ color: 'var(--text2)', marginBottom: 32, lineHeight: 1.7 }}>
                Fill out the form and our team will get back to you within 24 hours. For project inquiries, please use our <a href="/start-project" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>project form</a> instead.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{ width: 48, height: 48, background: 'rgba(64,45,34,0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 4 }}>Email Us</div>
                    <a href="mailto:hello@webcraftstudio.com" style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', textDecoration: 'none' }}>hello@webcraftstudio.com</a>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{ width: 48, height: 48, background: 'rgba(16,185,129,0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 8 }}>WhatsApp / Call</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <a href="https://wa.me/919494973995" style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', textDecoration: 'none' }}>+91 94949 73995</a>
                      <a href="https://wa.me/919032913846" style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', textDecoration: 'none' }}>+91 90329 13846</a>
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{ width: 48, height: 48, background: 'rgba(245,158,11,0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B' }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 4 }}>Location</div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)' }}>Andhra Pradesh, India</div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{ width: 48, height: 48, background: 'rgba(59,130,246,0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 8 }}>Connect on LinkedIn</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <a href="https://www.linkedin.com/in/gowthami-varma-1b9ab6380/" target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ width: 'fit-content', fontSize: 13, padding: '6px 14px' }}>
                        Gowthami Varma <ArrowRight size={14} />
                      </a>
                      <a href="https://www.linkedin.com/in/harsha-pranay-tula/" target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ width: 'fit-content', fontSize: 13, padding: '6px 14px' }}>
                        Harsha Pranay <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 24, padding: '40px' }}>
              <h3 style={{ fontSize: 20, marginBottom: 24 }}>{status === 'success' ? 'Ready to Send!' : 'Send a Message'}</h3>
              
              {status === 'success' ? (
                <div style={{ textAlign: 'center' }}>
                  <div className="alert alert-success" style={{ marginBottom: 24, justifyContent: 'center' }}>
                    <CheckCircle size={18} /> Your message is ready! Choose a number to send via WhatsApp:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <button onClick={() => window.open(`https://wa.me/919494973995?text=${encodeURIComponent(waMsg)}`, '_blank')} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', background: '#25D366', color: '#fff', fontSize: 16 }}>
                      +91 94949 73995 <ArrowRight size={18} />
                    </button>
                    <button onClick={() => window.open(`https://wa.me/919032913846?text=${encodeURIComponent(waMsg)}`, '_blank')} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: 16 }}>
                      +91 90329 13846 <ArrowRight size={18} />
                    </button>
                  </div>
                  <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }); }} style={{ background: 'none', border: 'none', color: 'var(--text3)', marginTop: 24, cursor: 'pointer', fontSize: 14 }}>
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  {status === 'error' && (
                    <div className="alert alert-error" style={{ marginBottom: 24 }}>
                      <AlertCircle size={18} /> {errorMsg}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div className="form-group">
                        <label className="form-label">Your Name *</label>
                        <input className="form-input" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email Address *</label>
                        <input className="form-input" type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Subject *</label>
                      <input className="form-input" required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 24 }}>
                      <label className="form-label">Message *</label>
                      <textarea className="form-textarea" required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={status === 'loading'} style={{ width: '100%', justifyContent: 'center' }}>
                      {status === 'loading' ? 'Sending...' : <>Send Message <ArrowRight size={16} /></>}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <style>{`@media(max-width: 860px) { .contact-grid { grid-template-columns: 1fr!important; gap: 40px!important; } }`}</style>
    </div>
  );
}
