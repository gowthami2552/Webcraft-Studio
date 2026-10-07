import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { authAPI } from '../api';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoggedIn, loading: authLoading } = useAuth();
  
  const [mode, setMode] = useState('login'); // 'login', 'register', 'forgot_password'
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (!authLoading && isLoggedIn) {
      navigate(from, { replace: true });
    }
  }, [isLoggedIn, authLoading, navigate, from]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
        // AuthContext will trigger redirect via useEffect
      } else if (mode === 'register') {
        if (!form.name.trim()) {
          setError('Please enter your name');
          setLoading(false);
          return;
        }
        await authAPI.register({ name: form.name, email: form.email, password: form.password });
        setSuccess('Account created! Redirecting to your dashboard...');
        setTimeout(() => navigate(from, { replace: true }), 1500);
      } else if (mode === 'forgot_password') {
        await authAPI.requestSetup({ email: form.email });
        setSuccess('If that email is registered, a password setup link has been sent. Check the backend terminal console for the simulated email link!');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 24px 60px',
      background: 'var(--bg)',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(124,92,255,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%',
        maxWidth: 440,
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 24,
        padding: '40px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 24 }}>
            <div style={{
              width: 40, height: 40,
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              borderRadius: 10, display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 16,
            }}>W</div>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 18, color: 'var(--text)' }}>WebCraft Studio</span>
          </Link>

          {/* Mode toggle */}
          {mode !== 'forgot_password' && (
            <div style={{
              display: 'flex',
              background: 'var(--card2)',
              borderRadius: 12,
              padding: 4,
              marginTop: 8,
            }}>
              {['login', 'register'].map(m => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setError(''); setSuccess(''); }}
                  style={{
                    flex: 1, padding: '10px', borderRadius: 9,
                    border: 'none', cursor: 'pointer',
                    background: mode === m ? 'var(--card)' : 'transparent',
                    color: mode === m ? 'var(--text)' : 'var(--text2)',
                    fontWeight: 600, fontSize: 14,
                    transition: 'all 0.2s ease',
                    boxShadow: mode === m ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
                  }}
                >
                  {m === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              ))}
            </div>
          )}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6, textAlign: 'center' }}>
          {mode === 'login' ? 'Welcome back' : mode === 'register' ? 'Create your account' : 'Setup Password'}
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text2)', textAlign: 'center', marginBottom: 28 }}>
          {mode === 'login'
            ? 'Sign in to manage your projects and updates'
            : mode === 'register'
            ? 'Start your web journey with WebCraft Studio'
            : 'Enter your email to receive a password setup link'
          }
        </p>

        {/* Alerts */}
        {error && (
          <div className="alert alert-error">
            <AlertCircle size={16} /> {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success">
            <CheckCircle size={16} /> {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)' }} />
                <input
                  name="name"
                  type="text"
                  className="form-input"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  style={{ paddingLeft: 40 }}
                  required={mode === 'register'}
                  autoComplete="name"
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)' }} />
              <input
                name="email"
                type="email"
                className="form-input"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                style={{ paddingLeft: 40 }}
                required
                autoComplete="email"
              />
            </div>
          </div>

          {mode !== 'forgot_password' && (
            <div className="form-group" style={{ marginBottom: 28 }}>
              <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                Password
                {mode === 'login' && (
                  <button type="button" onClick={() => { setMode('forgot_password'); setError(''); setSuccess(''); }} style={{ background: 'none', border: 'none', color: 'var(--accent)', fontSize: 12, cursor: 'pointer' }}>
                    Forgot? / Email Login
                  </button>
                )}
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)' }} />
                <input
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  className="form-input"
                  placeholder={mode === 'register' ? 'Min 8 chars, 1 uppercase, 1 number' : 'Your password'}
                  value={form.password}
                  onChange={handleChange}
                  style={{ paddingLeft: 40, paddingRight: 44 }}
                  required
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                    background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text3)',
                    padding: 0,
                  }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          )}
          
          {mode === 'forgot_password' && <div style={{ marginBottom: 28 }} />}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: '14px' }}
          >
            {loading ? (
              <>
                <div className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                {mode === 'login' ? 'Signing in...' : mode === 'register' ? 'Creating account...' : 'Sending link...'}
              </>
            ) : (
              <>
                {mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Send Setup Link'}
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {mode === 'login' && (
          <div style={{
            marginTop: 20, padding: '12px 16px',
            background: 'rgba(124,92,255,0.08)',
            border: '1px solid rgba(124,92,255,0.2)',
            borderRadius: 10,
            fontSize: 12, color: 'var(--text2)',
            textAlign: 'center',
          }}>
            <strong style={{ color: 'var(--accent)' }}>Demo Client:</strong> demo@webcraftstudio.com / Demo@2026
          </div>
        )}

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text3)', marginTop: 20 }}>
          {mode === 'login' ? (
            <>Don't have an account? <button onClick={() => setMode('register')} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>Create one</button></>
          ) : mode === 'register' ? (
            <>Already have an account? <button onClick={() => setMode('login')} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>Sign in</button></>
          ) : (
            <><button onClick={() => setMode('login')} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}><ArrowLeft size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }}/>Back to Sign In</button></>
          )}
        </p>
      </div>
    </div>
  );
}
