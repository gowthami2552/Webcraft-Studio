import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Briefcase, Globe, Monitor, ShoppingBag, Palette, Brain, RefreshCw, Leaf } from 'lucide-react';
import { contentAPI } from '../api';
import { useScrollReveal } from '../hooks/useScrollReveal';
import VectorBackground from '../components/vectors/VectorBackground';
import HeroVectorWorkspace from '../components/vectors/HeroVectorWorkspace';
import ServiceVectorIcon from '../components/vectors/ServiceVectorIcon';
import ProcessStepVector from '../components/vectors/ProcessStepVector';
import VectorWaveDivider from '../components/vectors/VectorWaveDivider';
import VectorProjectCardPreview from '../components/vectors/VectorProjectCardPreview';

const ICON_MAP = { briefcase: Briefcase, building: Globe, layout: Monitor, 'shopping-cart': ShoppingBag, 'pen-tool': Palette, cpu: Brain, code: Code, 'refresh-cw': RefreshCw };

const PREVIEW_CARDS = [
  { title: 'Developer Portfolio', type: 'Portfolio', color: '#8A7361' },
  { title: 'E-commerce Store', type: 'E-commerce', color: '#402D22' },
  { title: 'Business Website', type: 'Business', color: '#5C483A' },
  { title: 'AI Dashboard', type: 'AI App', color: '#876246' },
];

const STEPS = [
  { num: '01', title: 'Tell Us Your Idea', desc: 'Share your requirements through our project form. Tell us what you need and your budget.' },
  { num: '02', title: 'Choose Your Service', desc: 'Select the type of website you need. We confirm the scope and timeline with you.' },
  { num: '03', title: 'We Design & Build', desc: 'Our team creates and develops your website with regular updates throughout.' },
  { num: '04', title: 'Launch Your Website', desc: 'Get your website, test it, and go live. We handle deployment and provide support.' },
];

const TRUST = ['Web Design', 'Development', 'UI/UX', 'AI Solutions'];

function SvcCard({ s }) {
  return (
    <Link to={`/services/${s.slug}`} style={{ textDecoration: 'none' }}>
      <div
        className="vector-card-interactive"
        style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, transition: 'all .25s ease', cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(64,45,34,.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(64,45,34,.15)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
      >
        <div style={{ width: 48, height: 48, background: 'rgba(64,45,34,.08)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ServiceVectorIcon type={s.icon || s.slug || 'code'} size={36} />
        </div>
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, color: 'var(--text)' }}>{s.name}</h3>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 12 }}>{s.description}</p>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Starting from</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--accent)' }}>₹{s.starting_price?.toLocaleString('en-IN')}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Delivery</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)' }}>{s.delivery}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--accent)', fontSize: 13, fontWeight: 600 }}>View Service <ArrowRight size={13} /></div>
      </div>
    </Link>
  );
}

export default function Home() {
  const [services, setServices] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const heroRef = useScrollReveal();
  const svcRef = useScrollReveal();
  const workRef = useScrollReveal();
  const stepsRef = useScrollReveal();

  useEffect(() => {
    document.title = 'WebCraft Studio — Websites Built Around Your Ideas';
    contentAPI.getServices().then(r => setServices(r.data.services || [])).catch(() => {});
    contentAPI.getFeaturedPortfolio().then(r => setPortfolio(r.data.projects?.slice(0, 4) || [])).catch(() => {});
  }, []);

  return (
    <div className="page-enter">
      <style>{`
        @keyframes float0 { 0%{transform:translateY(0) rotate(-1deg)} 100%{transform:translateY(-14px) rotate(1deg)} }
        @keyframes float1 { 0%{transform:translateY(-8px) rotate(1deg)} 100%{transform:translateY(8px) rotate(-1deg)} }
        @keyframes float2 { 0%{transform:translateY(4px)} 100%{transform:translateY(-10px)} }
        @keyframes float3 { 0%{transform:translateY(-4px) rotate(-.5deg)} 100%{transform:translateY(10px) rotate(.5deg)} }
        .f0{animation:float0 3.5s ease-in-out infinite alternate}
        .f1{animation:float1 4s ease-in-out infinite alternate}
        .f2{animation:float2 3.8s ease-in-out infinite alternate}
        .f3{animation:float3 4.2s ease-in-out infinite alternate}
        @media(max-width:1024px){.svc-layout{grid-template-columns:1fr!important}.svc-cards{grid-template-columns:repeat(2,1fr)!important}.work-home-grid{grid-template-columns:repeat(2,1fr)!important}.steps-home{grid-template-columns:repeat(2,1fr)!important}.t-grid{grid-template-columns:repeat(2,1fr)!important}}
        @media(max-width:768px){.hero-grid{grid-template-columns:1fr!important}.hero-preview{display:none!important}}
        @media(max-width:640px){.svc-cards{grid-template-columns:1fr!important}.work-home-grid{grid-template-columns:1fr!important}.steps-home{grid-template-columns:1fr!important}.t-grid{grid-template-columns:1fr!important}}
      `}</style>

      {/* HERO */}
      <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', position:'relative', overflow:'hidden', paddingTop:100, paddingBottom:80 }}>
        <VectorBackground />
        <div style={{ position:'absolute', top:'20%', left:'50%', transform:'translateX(-50%)', width:800, height:800, background:'radial-gradient(circle,rgba(69,48,32,.06) 0%,transparent 70%)', pointerEvents:'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, alignItems:'center' }} className="hero-grid">
            <div className="page-enter">
              <div style={{ display:'flex', gap:16, marginBottom:24, flexWrap:'wrap' }}>
                {TRUST.map((item,i) => <span key={i} style={{ fontSize:12, color:'var(--text3)', fontWeight:500, display:'flex', alignItems:'center', gap:6 }}>{i>0&&<span style={{ color:'var(--border)' }}>•</span>}<span style={{ color:'var(--accent)' }}>✦</span> {item}</span>)}
              </div>
              <h1 style={{ fontSize:'clamp(42px,6vw,72px)', lineHeight:1.05, marginBottom:24, fontFamily:'var(--font-heading)' }}>
                Your Idea.<br/>Our Code.<br/><span className="gradient-text">One Powerful Website.</span>
              </h1>
              <p style={{ fontSize:18, color:'var(--text2)', lineHeight:1.7, marginBottom:36, maxWidth:480 }}>From personal portfolios to business platforms, we design and develop modern websites that help you stand out online.</p>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <Link to="/start-project" className="btn btn-primary btn-lg">Start Your Project <ArrowRight size={18} /></Link>
                <Link to="/work" className="btn btn-secondary btn-lg">View Our Work</Link>
              </div>
            </div>
            <div className="hero-preview" style={{ display: 'flex', justifyContent: 'center' }}>
              <HeroVectorWorkspace />
            </div>
          </div>
        </div>
      </section>

      <VectorWaveDivider color="var(--bg2)" />

      {/* SERVICES */}
      <section className="section" style={{ background:'var(--bg2)', position: 'relative', overflow: 'hidden' }}>
        <VectorBackground style={{ opacity: 0.35 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="page-enter">
            <div style={{ display:'grid', gridTemplateColumns:'280px 1fr', gap:48, alignItems:'start' }} className="svc-layout">
              <div>
                <div className="section-label">Our Services</div>
                <h2 style={{ fontSize:'clamp(26px,3.5vw,36px)', marginBottom:14 }}>Everything You Need, Under One Roof</h2>
                <p style={{ fontSize:15, lineHeight:1.7, marginBottom:24 }}>A wide range of web development and design services to bring your ideas to life.</p>
                <Link to="/services" className="btn btn-ghost">View All Services <ArrowRight size={15} /></Link>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }} className="svc-cards">
                {services.map(s => <SvcCard key={s.id} s={s} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <VectorWaveDivider flip color="var(--bg2)" />

      {/* RECENT WORK */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="page-enter">
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:40, flexWrap:'wrap', gap:16 }}>
              <div><div className="section-label">Our Work</div><h2 style={{ fontSize:'clamp(26px,3.5vw,40px)', marginBottom:10 }}>Recent Projects</h2><p>Explore some of our latest web development and design projects.</p></div>
              <Link to="/work" className="btn btn-secondary btn-sm">View All</Link>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }} className="work-home-grid">
              {portfolio.map(p => (
                <Link key={p.id} to={`/work/${p.slug}`} style={{ textDecoration:'none' }}>
                  <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:16, overflow:'hidden', transition:'all .25s ease' }}
                    onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-6px)';e.currentTarget.style.boxShadow='0 20px 60px rgba(0,0,0,.15)'}}
                    onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow=''}}>
                    <div style={{ height:140, background:`linear-gradient(135deg,${p.image_color}22,${p.image_color}08)`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <VectorProjectCardPreview category={p.category} color={p.image_color || '#8A7361'} />
                    </div>
                    <div style={{ padding:16 }}>
                      <span className="tag" style={{ marginBottom:8,display:'inline-flex',fontSize:10 }}>{p.category}</span>
                      <h3 style={{ fontSize:13,fontWeight:700,marginBottom:6,color:'var(--text)' }}>{p.title}</h3>
                      <p style={{ fontSize:11,color:'var(--text2)',lineHeight:1.6,marginBottom:10 }}>{p.description?.substring(0,80)}...</p>
                      <div style={{ display:'flex',flexWrap:'wrap',gap:4 }}>
                        {(p.technologies||[]).slice(0,3).map(t=><span key={t} style={{ fontSize:9,color:'var(--text3)',background:'var(--card2)',padding:'2px 6px',borderRadius:4,fontWeight:600 }}>{t.trim()}</span>)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" style={{ background:'var(--bg2)', position: 'relative' }}>
        <VectorBackground style={{ opacity: 0.35 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="page-enter">
            <div className="section-header center">
              <div className="section-label">How It Works</div>
              <h2>Your Project in 4 Simple Steps</h2>
              <p>Getting your dream website is easy. Just follow these steps.</p>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:24 }} className="steps-home">
              {STEPS.map((step,i) => (
                <div key={i} className="card vector-card-interactive" style={{ textAlign:'center', padding:'32px 24px' }}>
                  <div style={{ margin: '0 auto 16px', display: 'flex', justifyContent: 'center' }}>
                    <ProcessStepVector stepNumber={i + 1} size={64} />
                  </div>
                  <h3 style={{ fontSize:16,fontWeight:700,marginBottom:10 }}>{step.title}</h3>
                  <p style={{ fontSize:13,lineHeight:1.65 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* FINAL CTA */}
      <section style={{ padding: '0 24px 80px' }}>
        <div className="container" style={{
          background: '#2F1F16',
          borderRadius: 24,
          padding: '60px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 32,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative shapes */}
          <div style={{ position: 'absolute', right: '-10%', top: '-50%', width: 400, height: 400, background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', right: '10%', bottom: '-40%', width: 250, height: 250, background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }} />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, zIndex: 1 }}>
            <div style={{ color: '#E4D5C5' }}><Leaf size={40} /></div>
            <div>
              <h2 style={{ fontSize: 'clamp(28px,4vw,36px)', color: '#fff', marginBottom: 8 }}>Have an idea in mind?</h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', margin: 0 }}>Let's turn it into a website.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, zIndex: 1 }}>
            <Link to="/start-project" className="btn" style={{ background: '#fff', color: '#2F1F16' }}>Start Your Project <ArrowRight size={18} /></Link>
            <Link to="/work" className="btn" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}>View Our Work</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
