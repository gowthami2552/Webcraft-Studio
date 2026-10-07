import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { projectsAPI } from '../api';
import { CheckCircle, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import VectorBackground from '../components/vectors/VectorBackground';
import ProcessStepVector from '../components/vectors/ProcessStepVector';

const SERVICES = ['Portfolio Website','Business Website','Landing Page','E-commerce Website','AI Website','Custom Web Application','UI/UX Design','Website Redesign','Other'];
const DESIGN_PREFS = ['Minimal','Modern','Premium','Creative','Corporate','Dark','Light'];
const BUDGETS = ['₹3,000 – ₹5,000','₹5,000 – ₹10,000','₹10,000 – ₹20,000','₹20,000+'];
const TIMELINES = ['ASAP','1 week','2 weeks','1 month','Flexible'];

const STEP_LABELS = [
  'Service Type','Project Details','Design Style','Budget','Timeline','Your Details'
];

export default function StartProject() {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  const [form, setForm] = useState({
    service: '',
    project_name: '',
    description: '',
    target_audience: '',
    required_pages: '',
    reference_websites: '',
    special_features: '',
    design_preference: '',
    budget: '',
    timeline: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  // Pre-fill name/email if logged in
  useEffect(() => {
    document.title = 'Start a Project | WebCraft Studio';
    if (user) setForm(f => ({ ...f, name: user.name || '', email: user.email || '' }));
  }, [user]);

  const update = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const validateStep = () => {
    if (step === 1 && !form.service) return 'Please select a service type';
    if (step === 2 && !form.project_name.trim()) return 'Project name is required';
    if (step === 4 && !form.budget) return 'Please select a budget range';
    if (step === 5 && !form.timeline) return 'Please select a timeline';
    if (step === 6) {
      if (!form.name.trim()) return 'Your name is required';
      if (!form.email.trim() || !form.email.includes('@')) return 'A valid email is required';
    }
    return '';
  };

  const next = () => {
    const err = validateStep();
    if (err) { setError(err); return; }
    setError('');
    setStep(s => s + 1);
  };

  const back = () => { setError(''); setStep(s => s - 1); };

  const submit = async () => {
    const err = validateStep();
    if (err) { setError(err); return; }

    const msg = `*New Project Request*\n\n*Client Details:*\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nCompany: ${form.company}\n\n*Project Details:*\nProject Name: ${form.project_name}\nService: ${form.service}\nPackage: ${form.package}\nDescription: ${form.description}\n\n*Preferences:*\nDesign Style: ${form.design_style}\nBudget: ${form.budget}\nTimeline: ${form.timeline}\nExisting URL: ${form.existing_url}`;
    
    setSuccess({ msg });
  };

  // ── Success screen
  if (success) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
        <VectorBackground style={{ opacity: 0.4 }} />
        <div style={{ textAlign: 'center', maxWidth: 480, position: 'relative', zIndex: 1 }}>
          <div style={{ width: 88, height: 88, background: 'rgba(37,211,102,.12)', border: '1px solid rgba(37,211,102,.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 8px 30px rgba(37,211,102,0.2)' }}>
            <ProcessStepVector stepNumber={5} size={64} />
          </div>
          <h1 style={{ fontSize: 32, marginBottom: 12 }}>Ready to Send! 🚀</h1>
          <p style={{ fontSize: 17, color: 'var(--text2)', marginBottom: 28 }}>Your project details are ready. Choose a number below to send your request via WhatsApp.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
            <button onClick={() => window.open(`https://wa.me/919494973995?text=${encodeURIComponent(success.msg)}`, '_blank')} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', background: '#25D366', color: '#fff', fontSize: 16, padding: '16px' }}>
              +91 94949 73995 <ArrowRight size={18} />
            </button>
            <button onClick={() => window.open(`https://wa.me/919032913846?text=${encodeURIComponent(success.msg)}`, '_blank')} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: 16, padding: '16px' }}>
              +91 90329 13846 <ArrowRight size={18} />
            </button>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn-ghost">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((step - 1) / 5) * 100;

  return (
    <div style={{ minHeight: '100vh', paddingTop: 100, background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <VectorBackground style={{ opacity: 0.35 }} />
      <div className="container" style={{ maxWidth: 700, padding: '60px 24px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: 12 }}>Start a Project</div>
          <h1 style={{ fontSize: 'clamp(26px,4vw,40px)', marginBottom: 10 }}>Tell Us About Your Project</h1>
          <p style={{ color: 'var(--text2)' }}>Fill in the details below and we'll get back to you with a custom quote.</p>
        </div>

        {/* Progress */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
            {STEP_LABELS.map((label, i) => (
              <div key={i} style={{ fontSize: 12, fontWeight: 600, color: i + 1 === step ? 'var(--accent)' : i + 1 < step ? 'var(--success)' : 'var(--text3)' }}>
                {i + 1 < step ? '✓ ' : `${i + 1}. `}{label}
              </div>
            ))}
          </div>
          <div style={{ height: 4, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg,var(--accent),var(--accent2))', borderRadius: 4, transition: 'width .4s ease' }} />
          </div>
        </div>

        {/* Card */}
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 24, padding: '36px' }}>
          {error && <div className="alert alert-error" style={{ marginBottom: 20 }}><AlertCircle size={16} />{error}</div>}

          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: 22, marginBottom: 8 }}>What do you want to build?</h2>
              <p style={{ color: 'var(--text2)', marginBottom: 28 }}>Select the type of project you need.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }} className="service-select-grid">
                {SERVICES.map(s => (
                  <button key={s} onClick={() => update('service', s)} style={{ padding: '16px 12px', borderRadius: 12, border: form.service === s ? '2px solid var(--accent)' : '1px solid var(--border)', background: form.service === s ? 'rgba(64,45,34,.1)' : 'var(--card2)', color: form.service === s ? 'var(--accent)' : 'var(--text2)', fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'all .2s ease', textAlign: 'center' }}>{s}</button>
                ))}
              </div>
              <style>{`@media(max-width:640px){.service-select-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <h2 style={{ fontSize: 22, marginBottom: 8 }}>Tell us about your project</h2>
              <p style={{ color: 'var(--text2)', marginBottom: 28 }}>The more details, the better we can help.</p>
              <div className="form-group">
                <label className="form-label">Project Name *</label>
                <input className="form-input" placeholder="e.g. My Portfolio Website" value={form.project_name} onChange={e => update('project_name', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Project Description</label>
                <textarea className="form-textarea" placeholder="Describe what you want to build, what it should do, and any specific requirements..." value={form.description} onChange={e => update('description', e.target.value)} rows={4} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">Target Audience</label>
                  <input className="form-input" placeholder="e.g. Developers, students" value={form.target_audience} onChange={e => update('target_audience', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Required Pages</label>
                  <input className="form-input" placeholder="e.g. Home, About, Contact" value={form.required_pages} onChange={e => update('required_pages', e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Reference Websites</label>
                <input className="form-input" placeholder="URLs of websites you like (optional)" value={form.reference_websites} onChange={e => update('reference_websites', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Special Features</label>
                <textarea className="form-textarea" placeholder="Any special features? e.g. blog, payment, booking, admin panel..." value={form.special_features} onChange={e => update('special_features', e.target.value)} rows={3} />
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              <h2 style={{ fontSize: 22, marginBottom: 8 }}>Design Preferences</h2>
              <p style={{ color: 'var(--text2)', marginBottom: 28 }}>What style are you going for? (Optional)</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {DESIGN_PREFS.map(d => (
                  <button key={d} onClick={() => update('design_preference', d)} style={{ padding: '12px 24px', borderRadius: 100, border: form.design_preference === d ? '2px solid var(--accent)' : '1px solid var(--border)', background: form.design_preference === d ? 'rgba(64,45,34,.1)' : 'transparent', color: form.design_preference === d ? 'var(--accent)' : 'var(--text2)', fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'all .2s ease' }}>{d}</button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div>
              <h2 style={{ fontSize: 22, marginBottom: 8 }}>What's your budget?</h2>
              <p style={{ color: 'var(--text2)', marginBottom: 28 }}>This helps us understand the scope of your project.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {BUDGETS.map(b => (
                  <button key={b} onClick={() => update('budget', b)} style={{ padding: '18px 20px', borderRadius: 12, border: form.budget === b ? '2px solid var(--accent)' : '1px solid var(--border)', background: form.budget === b ? 'rgba(64,45,34,.1)' : 'var(--card2)', color: form.budget === b ? 'var(--accent)' : 'var(--text)', fontWeight: 600, fontSize: 16, cursor: 'pointer', transition: 'all .2s ease', textAlign: 'left' }}>{b}</button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <div>
              <h2 style={{ fontSize: 22, marginBottom: 8 }}>What's your timeline?</h2>
              <p style={{ color: 'var(--text2)', marginBottom: 28 }}>When do you need this completed?</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {TIMELINES.map(t => (
                  <button key={t} onClick={() => update('timeline', t)} style={{ padding: '14px 28px', borderRadius: 100, border: form.timeline === t ? '2px solid var(--accent)' : '1px solid var(--border)', background: form.timeline === t ? 'rgba(64,45,34,.1)' : 'transparent', color: form.timeline === t ? 'var(--accent)' : 'var(--text2)', fontWeight: 600, fontSize: 15, cursor: 'pointer', transition: 'all .2s ease' }}>{t}</button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6 */}
          {step === 6 && (
            <div>
              <h2 style={{ fontSize: 22, marginBottom: 8 }}>Your Details</h2>
              <p style={{ color: 'var(--text2)', marginBottom: 28 }}>How can we reach you?</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input className="form-input" placeholder="Your name" value={form.name} onChange={e => update('name', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input className="form-input" type="email" placeholder="your@email.com" value={form.email} onChange={e => update('email', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone / WhatsApp</label>
                  <input className="form-input" placeholder="+91 00000 00000" value={form.phone} onChange={e => update('phone', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Company / Organization</label>
                  <input className="form-input" placeholder="Optional" value={form.company} onChange={e => update('company', e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Additional Message</label>
                <textarea className="form-textarea" placeholder="Anything else you'd like us to know..." value={form.message} onChange={e => update('message', e.target.value)} rows={3} />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
            <button onClick={back} disabled={step === 1} className="btn btn-secondary" style={{ opacity: step === 1 ? 0 : 1, pointerEvents: step === 1 ? 'none' : 'auto' }}>
              <ArrowLeft size={16} /> Back
            </button>
            {step < 6 ? (
              <button onClick={next} className="btn btn-primary">Continue <ArrowRight size={16} /></button>
            ) : (
              <button onClick={submit} disabled={loading} className="btn btn-primary" style={{ minWidth: 160, justifyContent: 'center' }}>
                {loading ? <><div className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> Submitting...</> : <>Submit Request <ArrowRight size={16} /></>}
              </button>
            )}
          </div>
        </div>

        {/* Summary sidebar hint */}
        {form.service && (
          <div style={{ marginTop: 20, padding: '14px 20px', background: 'rgba(64,45,34,.06)', border: '1px solid rgba(64,45,34,.2)', borderRadius: 12, fontSize: 13, color: 'var(--text2)' }}>
            <strong style={{ color: 'var(--accent)' }}>Service:</strong> {form.service}
            {form.budget && <> &nbsp;•&nbsp; <strong style={{ color: 'var(--accent)' }}>Budget:</strong> {form.budget}</>}
            {form.timeline && <> &nbsp;•&nbsp; <strong style={{ color: 'var(--accent)' }}>Timeline:</strong> {form.timeline}</>}
          </div>
        )}
      </div>
    </div>
  );
}
