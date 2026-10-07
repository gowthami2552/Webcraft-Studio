import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { contentAPI } from '../api';
import { Search, X, Menu, ChevronDown, LayoutDashboard, LogOut, User, Bell, Briefcase } from 'lucide-react';
import './Navbar.css';

import VectorLogo from './vectors/VectorLogo';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Our Services', to: '/services' },
  { label: 'Our Work', to: '/work' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const { user, logout, isAdmin, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Fetch notification count
  useEffect(() => {
    if (!isLoggedIn) return;
    contentAPI.getNotifications()
      .then(res => setUnreadCount(res.data.unread_count || 0))
      .catch(() => {});
  }, [isLoggedIn]);

  // Search with debounce
  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults([]); return; }
    const timer = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const res = await contentAPI.search(searchQuery);
        setSearchResults(res.data.results || []);
      } catch { setSearchResults([]); }
      finally { setSearchLoading(false); }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    navigate('/');
  };

  const handleSearchResultClick = (url) => {
    setSearchOpen(false);
    setSearchQuery('');
    navigate(url);
  };

  const getResultIcon = (type) => {
    if (type === 'service') return <Briefcase size={16} />;
    if (type === 'project') return <LayoutDashboard size={16} />;
    return <Search size={16} />;
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="nav-inner">
            {/* Logo */}
            <Link to="/" className="nav-logo" onClick={(e) => {
              if (window.innerWidth <= 1024) {
                e.preventDefault();
                setMobileOpen(!mobileOpen);
              } else {
                setMobileOpen(false);
              }
            }}>
              <VectorLogo size={36} />
              <span className="nav-logo-text">WebCraft Studio</span>
            </Link>

            {/* Desktop links */}
            <ul className="nav-links">
              {NAV_LINKS.map(link => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) => isActive ? 'active' : ''}
                    end={link.to === '/'}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Right actions */}
            <div className="nav-actions">
              {/* Search button */}
              <button
                className="nav-search-btn"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
              >
                <Search size={16} />
              </button>

              {/* CTA button (desktop) */}
              <Link to="/start-project" className="btn btn-primary btn-sm nav-cta-btn">
                Start a Project
              </Link>

            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <ul className="mobile-menu-links">
          {NAV_LINKS.map(link => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) => isActive ? 'active' : ''}
                end={link.to === '/'}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="mobile-menu-footer">
          <Link
            to="/start-project"
            className="btn btn-primary"
            style={{ justifyContent: 'center' }}
            onClick={() => setMobileOpen(false)}
          >
            Start a Project
          </Link>
        </div>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="search-overlay" onClick={(e) => e.target === e.currentTarget && setSearchOpen(false)}>
          <div className="search-box">
            <div className="search-input-wrap">
              <Search size={20} color="var(--text3)" />
              <input
                ref={searchRef}
                autoFocus
                type="text"
                placeholder="Search services, projects, FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={() => setSearchOpen(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text2)' }}
              >
                <X size={18} />
              </button>
            </div>
            <div className="search-results">
              {searchLoading && (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text3)' }}>Searching...</div>
              )}
              {!searchLoading && searchQuery && searchResults.length === 0 && (
                <div className="search-no-results">
                  <Search size={32} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
                  <p>No results found for "{searchQuery}"</p>
                </div>
              )}
              {!searchLoading && searchResults.map((result, i) => (
                <div
                  key={i}
                  className="search-result-item"
                  onClick={() => handleSearchResultClick(result.url)}
                >
                  <div className="search-result-icon">{getResultIcon(result.type)}</div>
                  <div className="search-result-info">
                    <h4>{result.title}</h4>
                    <p>{result.description?.substring(0, 80)}...</p>
                  </div>
                  <span className="tag" style={{ marginLeft: 'auto', flexShrink: 0 }}>{result.type}</span>
                </div>
              ))}
              {!searchQuery && (
                <div style={{ padding: '24px 20px', color: 'var(--text3)', fontSize: 14, textAlign: 'center' }}>
                  Start typing to search services, projects and FAQs
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
