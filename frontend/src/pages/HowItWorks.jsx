import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, PenTool, Code, CheckCircle, Rocket } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function HowItWorks() {
  const ref1 = useScrollReveal();
  const ref2 = useScrollReveal();
  const ref3 = useScrollReveal();
  const ref4 = useScrollReveal();
  const ref5 = useScrollReveal();

  useEffect(() => {
    document.title = 'How It Works | WebCraft Studio';
  }, []);

  const steps = [
    {
      num: '01',
      title: 'Tell Us Your Idea',
      desc: 'Share your requirements, goals, and references through our quick project form. We review your request to understand the scope and technical needs.',
      icon: MessageSquare,
      ref: ref1
    },
    {
      num: '02',
      title: 'Plan & Design',
      desc: 'We map out the architecture and create the visual direction. You get to review the designs and provide feedback before we start writing any code.',
      icon: PenTool,
      ref: ref2
    },
    {
      num: '03',
      title: 'Build & Develop',
      desc: 'Our developers bring the designs to life using modern, scalable technologies. We keep you updated with regular progress reports.',
      icon: Code,
      ref: ref3
    },
    {
      num: '04',
      title: 'Test & Refine',
      desc: 'We rigorously test the website for responsiveness, performance, and cross-browser compatibility to ensure a flawless user experience.',
      icon: CheckCircle,
      ref: ref4
    },
    {
      num: '05',
      title: 'Launch',
      desc: 'Your final project is deployed and ready to use. We also provide handover documentation and post-launch support to help you get started.',
      icon: Rocket,
      ref: ref5
    }
  ];

  return (
    <div className="page-enter" style={{ paddingTop: 100 }}>
      {/* Hero Section */}
      <section style={{ padding: '80px 0 60px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Process</div>
          <h1 style={{ fontSize: 'clamp(36px,6vw,64px)', marginBottom: 20 }}>How It Works</h1>
          <p style={{ fontSize: 18, maxWidth: 700, color: 'var(--text2)', margin: '0 auto', lineHeight: 1.8 }}>
            Our streamlined 5-step process ensures your project is delivered on time, within budget, and exactly how you envisioned it.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 60 }}>
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} ref={step.ref} className="reveal" style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
                  <div style={{ width: 64, height: 64, flexShrink: 0, background: 'var(--card2)', border: '1px solid var(--border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                    <Icon size={28} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                      <span style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-heading)' }}>{step.num}</span>
                      <h2 style={{ fontSize: 28 }}>{step.title}</h2>
                    </div>
                    <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.8 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '100px 0', background: 'var(--accent)', color: '#fff' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(32px,5vw,56px)', marginBottom: 20, color: '#fff' }}>Ready to start step one?</h2>
          <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.8)', marginBottom: 40, maxWidth: 600, margin: '0 auto 40px' }}>
            Tell us about your project and we'll get back to you with a free quote.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/start-project" className="btn" style={{ background: '#fff', color: 'var(--accent)' }}>Get a Free Quote <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
      
      <style>{`
        @media(max-width: 640px) {
          .reveal { flex-direction: column; gap: 20px !important; }
        }
      `}</style>
    </div>
  );
}
