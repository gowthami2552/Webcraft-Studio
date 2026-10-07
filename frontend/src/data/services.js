export const servicesData = [
  {
    id: 'business',
    name: 'Business Website',
    category: 'Websites',
    icon: 'Briefcase',
    shortDesc: 'Build a professional online presence that helps your business attract customers, build trust and showcase your services.',
    startingPrice: '2,999',
    features: ['Up to 8 Pages', 'Contact Forms', 'SEO Optimized'],
    bestFor: 'Small businesses, startups, restaurants, local services and professionals.',
    pricing: [
      { name: 'Basic', price: '2,999', features: ['Up to 3 pages', 'Responsive design', 'Contact form', 'Basic deployment'] },
      { name: 'Standard', price: '4,999', popular: true, features: ['Up to 5 pages', 'Custom responsive design', 'Contact form', 'Google Maps', 'Social media integration'] },
      { name: 'Premium', price: '7,999', features: ['Up to 8 pages', 'Custom UI', 'Advanced animations', 'Basic SEO', 'Forms & integrations', 'Deployment support'] }
    ]
  },
  {
    id: 'portfolio',
    name: 'Portfolio Website',
    category: 'Websites',
    icon: 'User',
    shortDesc: 'Showcase your skills, projects, experience and achievements through a modern personal portfolio.',
    startingPrice: '750',
    features: ['Project Showcase', 'Resume Section', 'Custom Design'],
    bestFor: 'Students, developers, designers, freelancers, creators and professionals.',
    pricing: [
      { name: 'Basic', price: '750', features: ['Simple 1-page portfolio', 'About section', 'Skills section', 'Projects section', 'Responsive design'] },
      { name: 'Standard', price: '1,000', popular: true, features: ['Custom portfolio design', 'Projects showcase', 'Resume section', 'Contact section', 'Responsive design', 'Smooth animations'] },
      { name: 'Premium', price: '1,500', features: ['Advanced portfolio design', 'Project case studies', 'Resume/CV section', 'Advanced animations', 'Social links', 'Basic SEO', 'Deployment'] }
    ]
  },
  {
    id: 'landing',
    name: 'Landing Page',
    category: 'Websites',
    icon: 'Monitor',
    shortDesc: 'Create a focused and attractive landing page designed to promote a product, service, campaign or business.',
    startingPrice: '1,200',
    features: ['High Conversion', 'Mobile Optimized', 'Lead Generation'],
    bestFor: 'Startups, products, campaigns, events, SaaS products and services.',
    pricing: [
      { name: 'Basic', price: '1,200', features: ['Single-page website', 'Hero section', 'Features section', 'CTA', 'Responsive design'] },
      { name: 'Standard', price: '2,000', popular: true, features: ['Custom design', 'Multiple sections', 'Contact/lead form', 'Animations', 'Mobile optimization'] },
      { name: 'Premium', price: '3,500', features: ['Conversion-focused design', 'Advanced animations', 'Testimonials', 'Pricing section', 'Lead/contact form', 'Basic SEO'] }
    ]
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Website',
    category: 'Websites',
    icon: 'ShoppingBag',
    shortDesc: 'Build a professional online store where customers can browse products, add items to their cart and place orders.',
    startingPrice: '2,000',
    features: ['Product Catalog', 'Shopping Cart', 'Payment Gateway'],
    bestFor: 'Clothing brands, retailers, restaurants, handmade products and online sellers.',
    pricing: [
      { name: 'Basic', price: '2,000', features: ['Up to 10 products', 'Product listing', 'Shopping cart', 'Basic checkout', 'Responsive design'] },
      { name: 'Standard', price: '3,500', popular: true, features: ['Up to 25 products', 'Product categories', 'Shopping cart', 'Checkout', 'Payment integration', 'Order management'] },
      { name: 'Premium', price: '7,500', features: ['50+ products', 'Advanced product filtering', 'Payment gateway', 'Customer accounts', 'Admin features', 'Order management', 'Deployment'] }
    ]
  },
  {
    id: 'uiux',
    name: 'UI/UX Design',
    category: 'Design',
    icon: 'Palette',
    shortDesc: 'Create clean, modern and user-friendly interfaces that make websites and applications easier and more enjoyable to use.',
    startingPrice: '1,999',
    features: ['Figma Prototypes', 'User Research', 'Design Systems'],
    bestFor: 'Websites, mobile apps, SaaS products, dashboards and startups.',
    pricing: [
      { name: 'Basic', price: '1,999', features: ['Up to 3 screens', 'Basic wireframes', 'Modern UI', 'Figma design'] },
      { name: 'Standard', price: '3,000', popular: true, features: ['Up to 6 screens', 'Wireframes', 'Responsive layouts', 'Interactive prototype', 'Basic design system'] },
      { name: 'Premium', price: '5,000', features: ['12+ screens', 'Complete UI/UX system', 'Interactive prototype', 'Components', 'Design system', 'Developer-ready Figma file'] }
    ]
  },
  {
    id: 'ai',
    name: 'AI Website',
    category: 'AI & Development',
    icon: 'Brain',
    shortDesc: 'Bring AI into your website to automate tasks, improve customer experiences and create smarter digital products.',
    startingPrice: '5,999',
    features: ['AI Chatbots', 'OpenAI Integration', 'Smart Automations'],
    bestFor: 'AI startups, SaaS products, educational platforms and businesses.',
    pricing: [
      { name: 'Basic', price: '5,999', features: ['Responsive website', 'Basic AI feature', 'AI API integration', 'Up to 5 pages'] },
      { name: 'Standard', price: '9,999', popular: true, features: ['Custom UI', 'AI chatbot', 'AI-powered feature', 'API integration', 'Database integration', 'Up to 8 pages'] },
      { name: 'Premium', price: '14,999', features: ['Custom AI website/application', 'Multiple AI features', 'AI chatbot', 'Advanced API integrations', 'Database', 'Admin dashboard', 'Deployment'] }
    ]
  },
  {
    id: 'webapp',
    name: 'Custom Web Application',
    category: 'AI & Development',
    icon: 'Code',
    shortDesc: 'Turn your idea into a complete web application built around your specific business requirements.',
    startingPrice: '9,999',
    features: ['Custom Features', 'Databases', 'Authentication'],
    bestFor: 'Startups, businesses, colleges, organizations and custom software projects.',
    pricing: [
      { name: 'Basic', price: '9,999', features: ['Custom frontend', 'Basic backend', 'Database', 'Login/signup', 'Up to 3 main features'] },
      { name: 'Standard', price: '17,999', popular: true, features: ['Custom frontend + backend', 'Database', 'Authentication', 'Admin dashboard', 'API integration', 'Up to 6 features'] },
      { name: 'Premium', price: '29,999', features: ['Complete custom application', 'Advanced dashboard', 'Database', 'Authentication', 'Multiple APIs', 'Payment integration', 'Advanced features', 'Deployment'] }
    ]
  },
  {
    id: 'redesign',
    name: 'Website Redesign',
    category: 'Websites',
    icon: 'RefreshCw',
    shortDesc: 'Give your existing website a fresh, modern look while improving usability, responsiveness and overall user experience.',
    startingPrice: '2,499',
    features: ['Modern UI', 'Improved UX', 'Mobile Optimization'],
    bestFor: 'Businesses with outdated websites, poor mobile experiences or confusing interfaces.',
    pricing: [
      { name: 'Basic', price: '2,499', features: ['Redesign up to 3 pages', 'Modern UI', 'Responsive layout', 'Typography improvements'] },
      { name: 'Standard', price: '4,499', popular: true, features: ['Redesign up to 5 pages', 'Custom UI', 'Better navigation', 'Responsive design', 'UX improvements', 'Basic SEO'] },
      { name: 'Premium', price: '6,999', features: ['Complete website redesign', 'Custom UI/UX', 'Advanced animations', 'Performance improvements', 'SEO improvements', 'Mobile optimization', 'Deployment support'] }
    ]
  }
];
