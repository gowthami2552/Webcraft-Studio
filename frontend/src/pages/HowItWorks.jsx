import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, PenTool, Code, CheckCircle, Rocket } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import VectorBackground from '../components/vectors/VectorBackground';
import ProcessStepVector from '../components/vectors/ProcessStepVector';
import VectorWaveDivider from '../components/vectors/VectorWaveDivider';

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
      <section style={{ padding: '80px 0 60px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <VectorBackground style={{ opacity: 0.4 }} />
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Process</div>
          <h1 style={{ fontSize: 'clamp(36px,6vw,64px)', marginBottom: 20 }}>How It Works</h1>
          <p style={{ fontSize: 18, maxWidth: 700, color: 'var(--text2)', margin: '0 auto', lineHeight: 1.8 }}>
            Our streamlined 5-step process ensures your project is delivered on time, within budget, and exactly how you envisioned it.
          </p>
        </div>
      </section>

      <VectorWaveDivider color="var(--bg2)" flip />

      {/* Steps Section */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="container" style={{ maxWidth: 840, position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 50, position: 'relative' }}>
            {steps.map((step, i) => {
              return (
                <div key={i} ref={step.ref} className="reveal vector-card-interactive" style={{ display: 'flex', gap: 32, alignItems: 'flex-start', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 24, padding: 32, boxShadow: '0 4px 20px rgba(64,45,34,0.04)' }}>
                  <div style={{ width: 76, height: 76, flexShrink: 0, background: 'var(--bg)', border: '1.5px solid var(--border)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(64,45,34,0.06)' }}>
                    <ProcessStepVector stepNumber={i + 1} size={54} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 10 }}>
                      <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-heading)' }}>{step.num}</span>
                      <h2 style={{ fontSize: 24 }}>{step.title}</h2>
                    </div>
                    <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.8 }}>
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
      <section style={{ padding: '100px 0', background: 'var(--accent)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
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
