import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, Zap } from 'lucide-react';

// Use existing product backgrounds for consistency
import bg1 from '../assets/product1_bg.png';
import bg2 from '../assets/product2_bg.png';
import bg3 from '../assets/product3_bg.png';
import bg4 from '../assets/product4_bg.png';
import bg5 from '../assets/product5_bg.png';

// New hookah images
import rubyImg from '../assets/hookah_ruby.png';
import glassImg from '../assets/hookah3_glass.png';
import silverImg from '../assets/hookah_silver.png';
import goldImg from '../assets/hookah_gold.png';
import silverGoldImg from '../assets/hookah_silver&gold.png';
import emeraldImg from '../assets/hookah_emerald.png';

// Product data for the carousel
const mirrorProducts = [
    {
        id: 1,
        name: "CRIMSON CONQUEST",
        subtitle: "RUBY REFLECTION",
        description: "A bold statement piece with a vibrant red finish that resonates with passion and power. The ultimate centerpiece for any luxury lounge.",
        price: "$249.99",
        image: rubyImg,
        bgImage: bg1
    },
    {
        id: 2,
        name: "CRYSTAL CLARITY",
        subtitle: "PURE PRISM BASE",
        description: "Experience absolute transparency with our master-crafted glass base. Minimalist design meets maximum elegance.",
        price: "$189.99",
        image: glassImg,
        bgImage: bg2
    },
    {
        id: 3,
        name: "STERLING SHIMMER",
        subtitle: "SILVER SOLACE",
        description: "Sleek, silver-polished mirror base that captures every highlight of your room. Modern sophistication at its finest.",
        price: "$219.99",
        image: silverImg,
        bgImage: bg3
    },
    {
        id: 4,
        name: "GILDED GLORY",
        subtitle: "AURUM AURA",
        description: "Indulge in the opulence of gold. This mirror base features a deep golden glow that adds a touch of royalty to your sessions.",
        price: "$299.99",
        image: goldImg,
        bgImage: bg4
    },
    {
        id: 5,
        name: "DUO DYNASTY",
        subtitle: "METALLIC MASTERY",
        description: "The best of both worlds. A harmonious blend of silver and gold accents on a mirror base, creating a dynamic visual experience.",
        price: "$329.99",
        image: silverGoldImg,
        bgImage: bg5
    },
    {
        id: 6,
        name: "JADE JOURNEY",
        subtitle: "EMERALD ENCHANTMENT",
        description: "A deep, mystical green mirror base that brings the essence of the forest to your home. Calm, cool, and collected.",
        price: "$239.99",
        image: emeraldImg,
        bgImage: bg1 // Reusing bg1
    }
];

const MirrorCarousel = ({ onProductView }) => {
    const [activeIdx, setActiveIdx] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const next = () => setActiveIdx((prev) => (prev + 1) % mirrorProducts.length);
    const prev = () => setActiveIdx((prev) => (prev - 1 + mirrorProducts.length) % mirrorProducts.length);

    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(next, 5000);
            return () => clearInterval(interval);
        }
    }, [isPaused]);

    const activeMirror = mirrorProducts[activeIdx];

    return (
        <section
            id="hookah-carousel"
            style={{
                minHeight: '100vh',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#000',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '100px 0'
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <style>
                {`
                    #mirrors .glass-card {
                        background: rgba(255, 255, 255, 0.03);
                        backdrop-filter: blur(20px);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 2rem;
                        padding: 3rem;
                        position: relative;
                        z-index: 10;
                    }
                    #mirrors .mirror-heading {
                        font-size: clamp(3rem, 8vw, 5rem);
                        font-weight: 900;
                        line-height: 1;
                        background: linear-gradient(to bottom, #fff 0%, #a0a0a0 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        margin-bottom: 2rem;
                        text-transform: uppercase;
                    }
                    #mirrors .accent-bg {
                        position: absolute;
                        width: 40%;
                        height: 60%;
                        background: radial-gradient(circle, rgba(138, 43, 226, 0.2) 0%, transparent 70%);
                        filter: blur(60px);
                        z-index: 1;
                        pointer-events: none;
                    }
                    @media (max-width: 1024px) {
                        #mirrors .content-grid {
                            grid-template-columns: 1fr !important;
                            gap: 3rem !important;
                        }
                    }
                `}
            </style>

            <div className="accent-bg" style={{ top: '10%', right: '10%' }} />
            <div className="accent-bg" style={{ bottom: '10%', left: '10%', background: 'radial-gradient(circle, rgba(0, 200, 255, 0.1) 0%, transparent 70%)' }} />

            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '90%', position: 'relative', zIndex: 10 }}>
                <div style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            style={{ color: 'var(--accent)', fontWeight: 800, letterSpacing: '4px', fontSize: '0.8rem', display: 'block', marginBottom: '1rem' }}
                        >
                            EXCLUSIVE COLLECTION
                        </motion.span>
                        <h2 style={{ fontSize: '3rem', fontWeight: 800, color: 'white' }}>ELITE MIRROR SERIES</h2>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={prev} className="glass" style={{ width: '60px', height: '60px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                            <ChevronLeft size={24} />
                        </button>
                        <button onClick={next} className="glass" style={{ width: '60px', height: '60px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '5rem', alignItems: 'center' }}>
                    <div className="glass-card">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIdx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                    <div style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem', fontWeight: 600 }}>EDITION {activeMirror.id.toString().padStart(2, '0')}</span>
                                    </div>
                                    <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to right, rgba(255,255,255,0.1), transparent)' }} />
                                </div>
                                <h3 className="mirror-heading">{activeMirror.name}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                    <Zap size={18} color="var(--accent)" />
                                    <span style={{ color: 'white', fontWeight: 700, letterSpacing: '2px', fontSize: '1rem' }}>{activeMirror.subtitle}</span>
                                </div>
                                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '3rem', maxWidth: '500px' }}>
                                    {activeMirror.description}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                                    <div>
                                        <span style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginBottom: '0.5rem', fontWeight: 600 }}>INVESTMENT</span>
                                        <span style={{ color: 'white', fontSize: '2rem', fontWeight: 800 }}>{activeMirror.price}</span>
                                    </div>
                                    <button
                                        onClick={() => onProductView && onProductView(`h${activeMirror.id}`)}
                                        className="glass"
                                        style={{
                                            padding: '1.2rem 3rem',
                                            borderRadius: '3rem',
                                            color: 'white',
                                            fontWeight: 800,
                                            fontSize: '0.9rem',
                                            letterSpacing: '1px',
                                            backgroundColor: 'var(--accent)',
                                            borderColor: 'transparent',
                                            boxShadow: '0 10px 30px rgba(138, 43, 226, 0.3)',
                                            cursor: 'pointer'
                                        }}>
                                        VIEW DETAILS
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div style={{ position: 'relative', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIdx}
                                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                style={{ width: '100%', height: '100%', position: 'relative' }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '120%',
                                    height: '120%',
                                    backgroundImage: `url(${activeMirror.bgImage})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    opacity: 0.3,
                                    filter: 'blur(40px)',
                                    borderRadius: '50%'
                                }} />
                                <img
                                    src={activeMirror.image}
                                    alt={activeMirror.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        position: 'relative',
                                        zIndex: 2,
                                        filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.8))'
                                    }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    bottom: '10%',
                                    right: '-5%',
                                    zIndex: 3
                                }}>
                                    <button className="glass" style={{ width: '80px', height: '80px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                                        <Maximize2 size={24} />
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Progress Indicators */}
                <div style={{ display: 'flex', gap: '1rem', marginTop: '4rem', justifyContent: 'center' }}>
                    {mirrorProducts.map((_, idx) => (
                        <div
                            key={idx}
                            onClick={() => setActiveIdx(idx)}
                            style={{
                                width: activeIdx === idx ? '60px' : '30px',
                                height: '4px',
                                background: activeIdx === idx ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
                                cursor: 'pointer',
                                transition: 'var(--transition)',
                                borderRadius: '2px'
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MirrorCarousel;
