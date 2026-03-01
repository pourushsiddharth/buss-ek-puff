import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Wrench } from 'lucide-react';
import { useCart } from '../context/CartContext';
import logoImg from '../assets/logo.png';
import API_URL from '../config';

const Navbar = ({ onNavigate }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hasAccessories, setHasAccessories] = useState(false);
    const { getCartCount, setIsCartOpen } = useCart();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Auto-show Accessories nav link as soon as the first accessory is added in admin
    useEffect(() => {
        const checkAccessories = async () => {
            try {
                const res = await fetch(`${API_URL}/api/accessories`);
                if (res.ok) {
                    const data = await res.json();
                    setHasAccessories(data.accessories && data.accessories.length > 0);
                }
            } catch {
                // silently fail — don't block navbar rendering
            }
        };
        checkAccessories();
        // Re-check every 60s in case admin adds one while user is browsing
        const interval = setInterval(checkAccessories, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleAccessoriesClick = () => {
        onNavigate('home', 'accessories');
        setIsMobileMenuOpen(false);
    };

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

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <style>{`
                    .nav-link {
                        font-size: 0.9rem;
                        font-weight: 500;
                        letter-spacing: 1px;
                        opacity: 0.7;
                        transition: var(--transition);
                        cursor: pointer;
                    }
                    .nav-link:hover { opacity: 1; }
                    .nav-acc-link {
                        font-size: 0.9rem;
                        font-weight: 700;
                        letter-spacing: 1px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 0.4rem;
                        color: #4ADE80;
                        opacity: 0.85;
                        transition: opacity 0.2s;
                    }
                    .nav-acc-link:hover { opacity: 1; }
                    @media (min-width: 768px) {
                        .desktop-links { display: flex !important; }
                        .mobile-toggle { display: none !important; }
                    }
                `}</style>

                {/* Desktop Navigation */}
                <div className="desktop-links" style={{ display: 'none', gap: '2.5rem', alignItems: 'center' }}>
                    <a onClick={() => onNavigate('products')} className="nav-link">PRODUCTS</a>
                    <a onClick={() => onNavigate('home', 'mirrors')} className="nav-link">SHEESHA</a>

                    {/* Accessories link — auto-appears when first accessory is added in admin */}
                    <AnimatePresence>
                        {hasAccessories && (
                            <motion.a
                                key="acc-link"
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.35 }}
                                onClick={handleAccessoriesClick}
                                className="nav-acc-link"
                            >
                                <Wrench size={14} />
                                ACCESSORIES
                            </motion.a>
                        )}
                    </AnimatePresence>

                    <a onClick={() => onNavigate('about')} className="nav-link">ABOUT US</a>
                    <a onClick={() => onNavigate('contact')} className="nav-link">CONTACT</a>

                    <div style={{ height: '20px', width: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />

                    <div onClick={() => setIsCartOpen(true)} style={{ position: 'relative', cursor: 'pointer' }} className="nav-link">
                        <ShoppingCart size={18} />
                        {getCartCount() > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                background: 'linear-gradient(135deg, #8A2BE2 0%, #6A1BB2 100%)',
                                color: 'white',
                                borderRadius: '50%',
                                width: '18px',
                                height: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.7rem',
                                fontWeight: 700
                            }}>
                                {getCartCount()}
                            </span>
                        )}
                    </div>
                </div>

                {/* Mobile Hamburger */}
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
                        <a onClick={() => { onNavigate('products'); setIsMobileMenuOpen(false); }} className="nav-link" style={{ fontSize: '1.5rem' }}>PRODUCTS</a>
                        <a onClick={() => { onNavigate('home', 'mirrors'); setIsMobileMenuOpen(false); }} className="nav-link" style={{ fontSize: '1.5rem' }}>SHEESHA</a>

                        {/* Mobile: Accessories link auto-appears */}
                        <AnimatePresence>
                            {hasAccessories && (
                                <motion.a
                                    key="acc-mobile"
                                    initial={{ opacity: 0, scale: 0.85 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.85 }}
                                    onClick={handleAccessoriesClick}
                                    style={{ fontSize: '1.5rem', color: '#4ADE80', fontWeight: 700, letterSpacing: '1px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                >
                                    <Wrench size={20} /> ACCESSORIES
                                </motion.a>
                            )}
                        </AnimatePresence>

                        <a onClick={() => { onNavigate('about'); setIsMobileMenuOpen(false); }} className="nav-link" style={{ fontSize: '1.5rem' }}>ABOUT US</a>
                        <a onClick={() => { onNavigate('contact'); setIsMobileMenuOpen(false); }} className="nav-link" style={{ fontSize: '1.5rem' }}>CONTACT</a>
                        <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
                            <ShoppingCart size={24} className="nav-link" onClick={() => { setIsCartOpen(true); setIsMobileMenuOpen(false); }} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
