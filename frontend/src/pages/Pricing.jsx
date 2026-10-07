import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

const PLANS = [
  {
    name: 'Portfolio Website',
    desc: 'Perfect for students, freelancers, and professionals to showcase their work.',
    price: '750',
    features: ['Responsive Design', 'Up to 3 Pages', 'Basic SEO Setup', 'Contact Form', 'Mobile Friendly', '1 Week Delivery'],
  },
  {
    name: 'Landing Page',
    desc: 'High-converting single page websites for products, events or campaigns.',
    price: '1,200',
    popular: true,
    features: ['Custom UI/UX Design', 'Single Page Layout', 'Lead Generation Form', 'Fast Loading', 'Custom Animations', 'Priority Support', '3-5 Days Delivery'],
  },
  {
    name: 'E-Commerce',
    desc: 'Full online store with product catalog, cart, and checkout system.',
    price: '2,000',
    features: ['Full E-Commerce Setup', 'Product Management', 'Admin Dashboard', 'Payment Gateway', 'Shopping Cart', 'Order Tracking', 'Ongoing Support'],
  }
];

export default function Pricing() {
  return (
    <div className="page-enter" style={{ paddingTop: 100 }}>
      <section style={{ padding: '80px 0 60px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Pricing</div>
          <h1 style={{ fontSize: 'clamp(32px,5vw,56px)', marginBottom: 16 }}>Simple, Transparent Pricing</h1>
          <p style={{ fontSize: 18, maxWidth: 580, color: 'var(--text2)', margin: '0 auto' }}>Choose the plan that best fits your needs. No hidden fees.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }} className="pricing-grid">
            {PLANS.map((plan, i) => (
              <div key={i} style={{
                background: 'var(--card)', border: `1px solid ${plan.popular ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: 24, padding: 40, position: 'relative',
                transform: plan.popular ? 'translateY(-16px)' : 'none',
                boxShadow: plan.popular ? '0 20px 40px rgba(64,45,34,0.1)' : 'none',
              }}>
                {plan.popular && (
                  <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: 'var(--accent)', color: '#fff', fontSize: 12, fontWeight: 700, padding: '6px 16px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Most Popular</div>
                )}
                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{plan.name}</h3>
                <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 24 }}>{plan.desc}</p>
                <div style={{ marginBottom: 32 }}>
                  <span style={{ fontSize: 14, color: 'var(--text3)' }}>Starting from</span><br/>
                  <span style={{ fontSize: 40, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-heading)' }}>₹{plan.price}</span>
                </div>
                <Link to="/start-project" className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`} style={{ width: '100%', justifyContent: 'center', marginBottom: 32 }}>
                  Get Started
                </Link>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--text2)' }}>
                      <Check size={18} color="var(--accent)" style={{ flexShrink: 0 }} /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(24px,4vw,36px)', marginBottom: 12 }}>Need a custom quote?</h2>
          <p style={{ fontSize: 17, marginBottom: 32, color: 'var(--text2)' }}>Tell us exactly what you need and we'll prepare a tailored proposal.</p>
          <Link to="/start-project" className="btn btn-primary btn-lg">Request Custom Quote <ArrowRight size={18} /></Link>
        </div>
      </section>
      <style>{`@media(max-width: 1024px) { .pricing-grid { grid-template-columns: 1fr!important; gap: 40px!important; max-width: 500px; margin: 0 auto; } .pricing-grid > div { transform: none!important; } }`}</style>
    </div>
  );
}
