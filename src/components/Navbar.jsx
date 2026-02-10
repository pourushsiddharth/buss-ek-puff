import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import logoImg from '../assets/logo.png';

const Navbar = ({ onNavigate }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 1000,
                padding: isScrolled ? '1rem 5%' : '2rem 5%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'var(--transition)',
                backgroundColor: isScrolled ? 'rgba(0,0,0,0.8)' : 'transparent',
                backdropFilter: isScrolled ? 'blur(10px)' : 'none',
                borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.05)' : 'none'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => onNavigate('home')}>
                <img src={logoImg} alt="Buss Ek Puff Logo" style={{ height: isScrolled ? '40px' : '50px', transition: 'var(--transition)' }} />
            </div>

            <div style={{ display: 'none', gap: '2rem', alignItems: 'center' }} className="desktop-menu">
                <a href="#vapes" style={{ fontWeight: 500, opacity: 0.8 }}>VAPES</a>
                <a href="#mirrors" style={{ fontWeight: 500, opacity: 0.8 }}>MIRRORS</a>
                <a href="#about" style={{ fontWeight: 500, opacity: 0.8 }}>OUR STORY</a>
                <Search size={20} style={{ opacity: 0.8, cursor: 'pointer' }} />
                <ShoppingCart size={20} style={{ opacity: 0.8, cursor: 'pointer' }} />
            </div>

            {/* Styled version to show it works even without Tailwind */}
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <style>
                    {`
            .nav-link { 
              font-size: 0.9rem;
              font-weight: 500;
              letter-spacing: 1px;
              opacity: 0.7;
              transition: var(--transition);
              cursor: pointer;
            }
            .nav-link:hover { opacity: 1; }
            @media (min-width: 768px) {
              .desktop-links { display: flex !important; }
              .mobile-toggle { display: none !important; }
            }
          `}
                </style>
                <div className="desktop-links" style={{ display: 'none', gap: '2.5rem', alignItems: 'center' }}>
                    <a onClick={() => onNavigate('home')} className="nav-link">PRODUCTS</a>
                    <a onClick={() => onNavigate('home')} className="nav-link">COLLECTIONS</a>
                    <a onClick={() => onNavigate('contact')} className="nav-link">CONTACT</a>
                    <div style={{ height: '20px', width: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }}></div>
                    <Search size={18} className="nav-link" />
                    <ShoppingCart size={18} className="nav-link" />
                </div>

                <div className="mobile-toggle" style={{ zIndex: 1101 }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100vh',
                            backgroundColor: 'rgba(0,0,0,0.95)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 1100,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '2rem'
                        }}
                    >
                        <a onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }} className="nav-link" style={{ fontSize: '1.5rem' }}>PRODUCTS</a>
                        <a onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }} className="nav-link" style={{ fontSize: '1.5rem' }}>COLLECTIONS</a>
                        <a onClick={() => { onNavigate('contact'); setIsMobileMenuOpen(false); }} className="nav-link" style={{ fontSize: '1.5rem' }}>CONTACT</a>
                        <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
                            <Search size={24} className="nav-link" />
                            <ShoppingCart size={24} className="nav-link" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
