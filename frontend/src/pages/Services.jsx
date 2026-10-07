import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Briefcase, Globe, Monitor, ShoppingBag, Palette, Brain, RefreshCw, X, CheckCircle, User } from 'lucide-react';
import { servicesData } from '../data/services';
import { contentAPI } from '../api';
import { useScrollReveal } from '../hooks/useScrollReveal';
import VectorBackground from '../components/vectors/VectorBackground';
import ServiceVectorIcon from '../components/vectors/ServiceVectorIcon';
import ProcessStepVector from '../components/vectors/ProcessStepVector';
import VectorWaveDivider from '../components/vectors/VectorWaveDivider';

const ICON_MAP = {
  Briefcase: Briefcase,
  User: User,
  Globe: Globe,
  Monitor: Monitor,
  ShoppingBag: ShoppingBag,
  Palette: Palette,
  Brain: Brain,
  Code: Code,
  RefreshCw: RefreshCw
};

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedService, setSelectedService] = useState(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteService, setQuoteService] = useState('');
  const [quotePackage, setQuotePackage] = useState('Not Sure');
  const [quoteBudget, setQuoteBudget] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [waMsg, setWaMsg] = useState(null);
  
  const ref = useScrollReveal();
  const workRef = useScrollReveal();
  const chooseRef = useScrollReveal();

  useEffect(() => {
    document.title = 'Services | Digital Solutions Built Around Your Ideas';
  }, []);

  useEffect(() => {
    if (quoteService && quotePackage && quotePackage !== 'Not Sure') {
      const service = servicesData.find(s => s.name === quoteService);
      if (service) {
        const pkg = service.pricing.find(p => p.name === quotePackage);
        if (pkg && pkg.price) {
          const price = parseInt(pkg.price.replace(/,/g, ''), 10);
          if (price < 5000) setQuoteBudget("Under ₹5,000");
          else if (price <= 10000) setQuoteBudget("₹5,000 - ₹10,000");
          else if (price <= 20000) setQuoteBudget("₹10,000 - ₹20,000");
          else if (price <= 30000) setQuoteBudget("₹20,000 - ₹30,000");
          else setQuoteBudget("₹30,000+");
        }
      }
    }
  }, [quoteService, quotePackage]);

  const categories = ['All', 'Websites', 'Design', 'AI & Development'];
  
  const filteredServices = activeCategory === 'All' 
    ? servicesData 
    : servicesData.filter(s => s.category === activeCategory);

  const openQuoteModal = (serviceName = '', pkgName = 'Not Sure') => {
    setQuoteService(serviceName);
    setQuotePackage(pkgName);
    if (!serviceName || pkgName === 'Not Sure') setQuoteBudget('');
    setSelectedService(null); // close details modal if open
    setQuoteModalOpen(true);
    setFormSuccess(false);
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    setFormSuccess(true);
  };

  return (
    <div className="page-enter" style={{ paddingTop: 100 }}>
      <style>{`
        .service-modal-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(8px); z-index: 9999; display: flex; align-items: flex-start; justify-content: center; padding: 40px 20px; }
        .service-modal { background: var(--bg); width: 100%; max-width: 900px; border-radius: var(--radius-xl); box-shadow: var(--shadow-lg); position: relative; max-height: calc(100vh - 80px); overflow-y: auto; margin: 0; }
        .quote-modal { max-width: 600px; padding: 40px; }
        .modal-close { position: absolute; top: 20px; right: 20px; background: var(--card2); border: none; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--text); transition: var(--transition); z-index: 10; }
        .modal-close:hover { background: var(--border); }
        .filter-btn { padding: 10px 24px; border-radius: 100px; font-size: 15px; font-weight: 600; cursor: pointer; border: 1px solid var(--border); background: transparent; color: var(--text2); transition: var(--transition); }
        .filter-btn.active { background: var(--accent); color: #fff; border-color: var(--accent); }
        .timeline { display: flex; gap: 24px; justify-content: space-between; position: relative; }
        .timeline::before { content: ''; position: absolute; top: 24px; left: 0; right: 0; height: 2px; background: var(--border); z-index: 0; }
        .timeline-item { flex: 1; position: relative; z-index: 1; }
        .timeline-num { width: 50px; height: 50px; background: var(--bg); border: 2px solid var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; color: var(--accent); margin-bottom: 16px; }
        .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }
        .pricing-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px 20px; display: flex; flex-direction: column; position: relative; }
        .pricing-card.popular { border-color: var(--accent); box-shadow: var(--shadow-accent); transform: translateY(-8px); }
        .popular-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--accent); color: #fff; padding: 4px 12px; border-radius: 100px; font-size: 11px; font-weight: 700; white-space: nowrap; }
        
        @media(max-width: 1024px) {
          .svc-pg { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media(max-width: 768px) {
          .pricing-grid { grid-template-columns: 1fr; }
          .timeline { flex-direction: column; gap: 40px; }
          .timeline::before { top: 0; bottom: 0; left: 24px; width: 2px; height: auto; }
        }
        @media(max-width: 640px) {
          .svc-pg { grid-template-columns: 1fr !important; }
          .filters-scroll { display: flex; overflow-x: auto; padding-bottom: 10px; }
          .filter-btn { white-space: nowrap; }
          .quote-modal { padding: 24px; }
        }
      `}</style>

      {/* HERO SECTION */}
      <section style={{ padding: '80px 0 60px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <VectorBackground style={{ opacity: 0.4 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-label">Services & Pricing</div>
          <h1 style={{ fontSize: 'clamp(36px,6vw,64px)', marginBottom: 20, maxWidth: 800 }}>Digital Solutions Built Around Your Ideas</h1>
          <p style={{ fontSize: 18, maxWidth: 700, color: 'var(--text2)', marginBottom: 40, lineHeight: 1.8 }}>
            From simple landing pages and portfolios to AI-powered websites and custom web applications, we create affordable digital experiences for individuals, startups and businesses.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <button onClick={() => openQuoteModal()} className="btn btn-primary btn-lg">Get a Free Quote</button>
            <a href="#pricing" className="btn btn-secondary btn-lg">View Pricing</a>
          </div>
        </div>
      </section>

      <VectorWaveDivider color="var(--bg2)" flip />

      {/* SERVICES LISTING */}
      <section id="pricing" className="section" style={{ position: 'relative' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="filters-scroll" style={{ display: 'flex', gap: 12, marginBottom: 48 }}>
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)} 
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="svc-pg reveal">
            {filteredServices.map(service => {
              return (
                <div key={service.id} className="card vector-card-interactive" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ width: 56, height: 56, background: 'rgba(64,45,34,0.06)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ServiceVectorIcon type={service.icon || service.id} size={42} />
                    </div>
                  </div>
                  <div>
                    <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>{service.name}</h2>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text2)', marginBottom: 16 }}>{service.shortDesc}</p>
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                    {service.features.map(f => (
                      <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text2)' }}>
                        <CheckCircle size={14} color="var(--success)" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: 20 }}>
                    <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 4 }}>Starting from</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)', marginBottom: 20 }}>₹{service.startingPrice}</div>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <button onClick={() => setSelectedService(service)} className="btn btn-secondary" style={{ flex: 1, padding: '10px 0' }}>View Details</button>
                      <button onClick={() => openQuoteModal(service.name)} className="btn btn-primary" style={{ flex: 1, padding: '10px 0' }}>Get a Quote</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div style={{ marginTop: 60, padding: 24, background: 'rgba(111,78,55,0.05)', borderRadius: 12, border: '1px solid rgba(111,78,55,0.1)' }}>
            <h4 style={{ fontSize: 16, marginBottom: 8 }}>Affordable pricing. Custom solutions.</h4>
            <p style={{ fontSize: 14, color: 'var(--text2)' }}>
              All prices are starting prices. Final pricing depends on project requirements, number of pages, features, integrations and overall complexity. Domain, hosting, payment gateway fees, premium plugins and third-party API usage charges are not included unless specifically mentioned.
            </p>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="section" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', position: 'relative' }}>
        <VectorBackground style={{ opacity: 0.3 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div ref={workRef} className="reveal">
            <div className="section-header">
              <h2>How We Work</h2>
              <p>Our streamlined process ensures your project is delivered on time, within budget and exactly how you envisioned it.</p>
            </div>
            
            <div className="timeline">
              {[
                { n: '01', title: 'Tell Us Your Idea', desc: 'Share your requirements, goals and references.' },
                { n: '02', title: 'Plan & Design', desc: 'We understand your needs and create the visual direction.' },
                { n: '03', title: 'Build', desc: 'We develop your website or application using modern technologies.' },
                { n: '04', title: 'Test & Refine', desc: 'We test responsiveness, functionality and user experience.' },
                { n: '05', title: 'Launch', desc: 'Your final project is deployed and ready to use.' }
              ].map((step, i) => (
                <div key={i} className="timeline-item">
                  <div style={{ width: 64, height: 64, background: 'var(--bg)', border: '1.5px solid var(--border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, boxShadow: '0 4px 16px rgba(64,45,34,0.08)' }}>
                    <ProcessStepVector stepNumber={i + 1} size={46} />
                  </div>
                  <h3 style={{ fontSize: 17, marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ fontSize: 14 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section">
        <div className="container">
          <div ref={chooseRef} className="reveal">
            <div className="section-header center">
              <h2>Why Choose Us</h2>
              <p>We combine professional quality with affordable pricing to deliver the best value for your business.</p>
            </div>
            <div className="grid-4" style={{ '@media(max-width:640px)': { gridTemplateColumns: '1fr' } }}>
              {[
                { title: 'Affordable Pricing', desc: 'Professional digital solutions without unnecessary costs.' },
                { title: 'Modern Design', desc: 'Clean and contemporary designs built around your brand.' },
                { title: 'Responsive', desc: 'Websites that work smoothly across mobile, tablet and desktop.' },
                { title: 'Custom Solutions', desc: 'We build according to your requirements instead of forcing you into a template.' },
                { title: 'Clear Communication', desc: 'Keep clients informed throughout the project.' },
                { title: 'Quality Development', desc: 'Clean, functional and maintainable implementation.' },
                { title: 'Fast Delivery', desc: 'Efficient development with realistic timelines.' },
                { title: 'Post-Launch Support', desc: 'Help with basic fixes and improvements after launch.' }
              ].map((item, i) => (
                <div key={i} className="card" style={{ padding: 24 }}>
                  <h3 style={{ fontSize: 16, marginBottom: 8, color: 'var(--accent)' }}>{item.title}</h3>
                  <p style={{ fontSize: 14 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '100px 0', background: 'var(--accent)', color: '#fff' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(32px,5vw,56px)', marginBottom: 20, color: '#fff' }}>Have an Idea? Let's Build It.</h2>
          <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.8)', marginBottom: 40, maxWidth: 600, margin: '0 auto 40px' }}>
            Tell us what you need and we'll help turn your idea into a professional digital product.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => openQuoteModal()} className="btn" style={{ background: '#fff', color: 'var(--accent)' }}>Get a Free Quote</button>
            <Link to="/contact" className="btn" style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#fff', background: 'transparent' }}>Talk to Us</Link>
          </div>
        </div>
      </section>

      {/* SERVICE DETAILS MODAL */}
      {selectedService && createPortal(
        <div className="service-modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="service-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedService(null)}><X size={20} /></button>
            
            <div style={{ padding: '32px 32px 0' }}>
              <div className="section-label">{selectedService.category}</div>
              <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', marginBottom: 12 }}>{selectedService.name}</h2>
              
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 18, marginBottom: 8 }}>About This Service</h3>
                <p style={{ fontSize: 15, color: 'var(--text2)', maxWidth: 800, lineHeight: 1.6 }}>{selectedService.shortDesc}</p>
              </div>

              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 18, marginBottom: 12 }}>What We Offer</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                  {selectedService.features.map((f, i) => (
                    <div key={i} style={{ background: 'var(--card2)', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
                      <CheckCircle size={18} color="var(--success)" />
                      <span style={{ fontSize: 14, fontWeight: 600 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div style={{ background: 'var(--bg2)', padding: '16px 20px', borderRadius: 12, border: '1px solid var(--border)', marginBottom: 24 }}>
                <h4 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4, color: 'var(--text3)' }}>Best For</h4>
                <p style={{ fontSize: 14, fontWeight: 500 }}>{selectedService.bestFor}</p>
              </div>
            </div>

            <div style={{ padding: '0 32px 32px', background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: 22, marginTop: 32, marginBottom: 20, textAlign: 'center' }}>Pricing Packages</h3>
              <div className="pricing-grid">
                {selectedService.pricing.map((pkg, i) => (
                  <div key={i} className={`pricing-card ${pkg.popular ? 'popular' : ''}`}>
                    {pkg.popular && <div className="popular-badge">⭐ MOST POPULAR</div>}
                    <h4 style={{ fontSize: 18, marginBottom: 8 }}>{pkg.name}</h4>
                    <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)', marginBottom: 16 }}>₹{pkg.price}</div>
                    
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24, flex: 1 }}>
                      {pkg.features.map((f, j) => (
                        <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--text2)' }}>
                          <CheckCircle size={16} color="var(--success)" style={{ flexShrink: 0, marginTop: 3 }} /> {f}
                        </li>
                      ))}
                    </ul>
                    
                    <button 
                      onClick={() => openQuoteModal(selectedService.name, pkg.name)} 
                      className={`btn ${pkg.popular ? 'btn-primary' : 'btn-ghost'}`} 
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      Get Started
                    </button>
                  </div>
                ))}
              </div>
              
              {selectedService.id === 'ecommerce' && (
                <p style={{ fontSize: 13, color: 'var(--text3)', textAlign: 'center', marginTop: 24 }}>*Payment gateway charges, domain, hosting, premium plugins and third-party services are not included unless mentioned.</p>
              )}
              {selectedService.id === 'ai' && (
                <p style={{ fontSize: 13, color: 'var(--text3)', textAlign: 'center', marginTop: 24 }}>*AI API usage charges may be billed separately depending on the provider and usage.</p>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* QUOTE FORM MODAL */}
      {quoteModalOpen && createPortal(
        <div className="service-modal-overlay" onClick={() => setQuoteModalOpen(false)}>
          <div className="service-modal quote-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setQuoteModalOpen(false)}><X size={20} /></button>
            
            {formSuccess ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ width: 64, height: 64, background: 'rgba(16,185,129,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--success)' }}>
                  <CheckCircle size={32} />
                </div>
                <h2 style={{ fontSize: 28, marginBottom: 16 }}>Request Prepared!</h2>
                <p style={{ fontSize: 16, color: 'var(--text2)', marginBottom: 32 }}>Your default email client has been opened to send us your request. We'll get back to you soon.</p>
                <button onClick={() => setQuoteModalOpen(false)} className="btn btn-primary">Close</button>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: 28, marginBottom: 8 }}>Get a Free Quote</h2>
                <p style={{ fontSize: 15, color: 'var(--text2)', marginBottom: 32 }}>Fill out the form below and we'll get back to you with a custom proposal.</p>
                
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.target);
                  const msg = `Name: ${fd.get('name')}\nEmail: ${fd.get('email')}\nPhone: ${fd.get('phone')}\nService: ${quoteService}\nPackage: ${quotePackage}\nBudget: ${quoteBudget}\n\nDetails:\n${fd.get('details')}`;
                  window.location.href = `mailto:gowthamivarma25@gmail.com?subject=Quote Request: ${quoteService}&body=${encodeURIComponent(msg)}`;
                  setFormSuccess(true);
                }}>
                  <div className="grid-2" style={{ gap: '0 20px', marginBottom: 0 }}>
                    <div className="form-group">
                      <label className="form-label">Name</label>
                      <input type="text" name="name" className="form-input" required placeholder="John Doe" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input type="email" name="email" className="form-input" required placeholder="john@example.com" />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input type="tel" name="phone" className="form-input" placeholder="+91 9876543210" />
                  </div>
                  
                  <div className="grid-2" style={{ gap: '0 20px', marginBottom: 0 }}>
                    <div className="form-group">
                      <label className="form-label">Select Service</label>
                      <select className="form-select" value={quoteService} onChange={e => setQuoteService(e.target.value)} required>
                        <option value="">Select a service...</option>
                        {servicesData.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Select Package</label>
                      <select className="form-select" value={quotePackage} onChange={e => setQuotePackage(e.target.value)}>
                        <option value="Not Sure">Not Sure</option>
                        <option value="Basic">Basic</option>
                        <option value="Standard">Standard</option>
                        <option value="Premium">Premium</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Budget</label>
                    <select className="form-select" value={quoteBudget} onChange={e => setQuoteBudget(e.target.value)} required>
                      <option value="">Select budget range...</option>
                      <option value="Under ₹5,000">Under ₹5,000</option>
                      <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
                      <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000</option>
                      <option value="₹20,000 - ₹30,000">₹20,000 - ₹30,000</option>
                      <option value="₹30,000+">₹30,000+</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Project Details</label>
                    <textarea name="details" className="form-textarea" required placeholder="Tell us about your project..."></textarea>
                  </div>
                  
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}>Request a Quote</button>
                </form>
              </>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
