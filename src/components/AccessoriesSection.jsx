import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Cpu, BatteryCharging, Wind, Lock, Bell, ChevronRight, Sparkles } from 'lucide-react';

const accessoryItems = [
    { icon: Zap, label: 'Replacement Coils', tag: 'COILS', color: '#F59E0B' },
    { icon: Wind, label: 'Vape Tanks & Glass', tag: 'GLASS', color: '#38BDF8' },
    { icon: BatteryCharging, label: 'High-Power Batteries', tag: 'BATTERY', color: '#4ADE80' },
    { icon: Cpu, label: 'DIY Atomizers', tag: 'ATOMIZER', color: '#E879F9' },
];

const AnimatedGridBg = () => (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
        {/* Dot-grid */}
        <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(rgba(138,43,226,0.18) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
        }} />
        {/* Glow blobs */}
        <div style={{
            position: 'absolute', top: '-15%', left: '-10%',
            width: '500px', height: '500px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(138,43,226,0.14) 0%, transparent 65%)',
            filter: 'blur(40px)',
        }} />
        <div style={{
            position: 'absolute', bottom: '-20%', right: '5%',
            width: '450px', height: '450px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(56,189,248,0.10) 0%, transparent 65%)',
            filter: 'blur(50px)',
        }} />
        {/* Diagonal lines */}
        <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(138,43,226,0.03) 40px, rgba(138,43,226,0.03) 80px)',
        }} />
    </div>
);

const FloatingChip = ({ icon: Icon, label, tag, color, delay, x, y }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay, type: 'spring', stiffness: 120, damping: 14 }}
            style={{
                position: 'absolute', left: x, top: y,
                display: 'flex', alignItems: 'center', gap: '0.7rem',
                padding: '0.75rem 1.2rem',
                background: 'rgba(15,15,20,0.85)',
                border: `1px solid ${color}30`,
                borderRadius: '3rem',
                backdropFilter: 'blur(16px)',
                boxShadow: `0 4px 24px ${color}18, 0 0 0 1px ${color}15`,
                whiteSpace: 'nowrap',
                userSelect: 'none',
            }}
        >
            <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: `${color}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
            }}>
                <Icon size={15} color={color} />
            </div>
            <div>
                <div style={{ fontSize: '0.62rem', letterSpacing: '2px', color: color, fontWeight: 700, marginBottom: '1px' }}>{tag}</div>
                <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{label}</div>
            </div>
        </motion.div>
    );
};

const AccessoriesSection = () => {
    const [hoveredWhatsApp, setHoveredWhatsApp] = useState(false);

    const chipPositions = [
        { x: '4%', y: '18%' },
        { x: '3%', y: '58%' },
        { x: '68%', y: '15%' },
        { x: '66%', y: '60%' },
    ];

    return (
        <section
            id="accessories"
            style={{
                position: 'relative',
                minHeight: '100vh',
                backgroundColor: '#070709',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                padding: '6rem 5%',
            }}
        >
            <AnimatedGridBg />

            {/* Floating chips — desktop only */}
            <div style={{ display: 'contents' }}>
                {accessoryItems.map((item, i) => (
                    <FloatingChip
                        key={item.tag}
                        {...item}
                        delay={0.3 + i * 0.12}
                        x={chipPositions[i].x}
                        y={chipPositions[i].y}
                    />
                ))}
            </div>

            {/* Centre content */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                style={{
                    position: 'relative', zIndex: 10,
                    maxWidth: '680px', width: '100%',
                    textAlign: 'center',
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    gap: '2rem',
                }}
            >
                {/* Top badge */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '0.6rem',
                        padding: '0.4rem 1.2rem 0.4rem 0.8rem',
                        borderRadius: '3rem',
                        background: 'rgba(138,43,226,0.12)',
                        border: '1px solid rgba(138,43,226,0.35)',
                    }}
                >
                    <Sparkles size={14} color="#8A2BE2" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '2px', color: '#8A2BE2' }}>
                        COMING SOON
                    </span>
                </motion.div>

                {/* Lock icon */}
                <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        width: 88, height: 88, borderRadius: '2rem',
                        background: 'linear-gradient(135deg, rgba(138,43,226,0.25) 0%, rgba(56,189,248,0.10) 100%)',
                        border: '1px solid rgba(138,43,226,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 40px rgba(138,43,226,0.2)',
                    }}
                >
                    <Lock size={36} color="#8A2BE2" strokeWidth={1.5} />
                </motion.div>

                {/* Headline */}
                <div>
                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
                        fontWeight: 900,
                        lineHeight: 1,
                        color: 'white',
                        marginBottom: '0.5rem',
                        fontFamily: '"Outfit", sans-serif',
                    }}>
                        ACCESSORIES
                    </h2>
                    <h3 style={{
                        fontSize: 'clamp(1rem, 3vw, 1.6rem)',
                        fontWeight: 300,
                        color: 'rgba(255,255,255,0.4)',
                        letterSpacing: '4px',
                        textTransform: 'uppercase',
                        fontFamily: '"Outfit", sans-serif',
                    }}>
                        DROPPING SOON
                    </h3>
                </div>

                {/* Description */}
                <p style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.8,
                    color: 'rgba(255,255,255,0.5)',
                    maxWidth: '520px',
                    fontFamily: '"Outfit", sans-serif',
                }}>
                    Level up your setup. We're curating a premium collection of coils, tanks, batteries, and atomizers — everything your device needs to perform at its peak.
                </p>

                {/* Accessory tags row */}
                <div style={{
                    display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center',
                }}>
                    {accessoryItems.map(({ tag, color }, i) => (
                        <motion.div
                            key={tag}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + i * 0.08 }}
                            style={{
                                padding: '0.4rem 1rem',
                                borderRadius: '2rem',
                                background: `${color}12`,
                                border: `1px solid ${color}30`,
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                letterSpacing: '2px',
                                color: color,
                                fontFamily: '"Outfit", sans-serif',
                            }}
                        >
                            {tag}
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.a
                    href="https://wa.me/919334807758?text=Hey! I'd love to know when accessories are available on Buss Ek Puff 🔥"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onMouseEnter={() => setHoveredWhatsApp(true)}
                    onMouseLeave={() => setHoveredWhatsApp(false)}
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                        padding: '1rem 2.2rem',
                        borderRadius: '3rem',
                        background: hoveredWhatsApp
                            ? 'linear-gradient(135deg, #8A2BE2 0%, #6A1BB2 100%)'
                            : 'rgba(138,43,226,0.12)',
                        border: '1px solid rgba(138,43,226,0.5)',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        letterSpacing: '1.5px',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        fontFamily: '"Outfit", sans-serif',
                        transition: 'background 0.3s ease',
                        boxShadow: hoveredWhatsApp ? '0 8px 32px rgba(138,43,226,0.4)' : 'none',
                    }}
                >
                    <Bell size={18} />
                    NOTIFY ME WHEN LIVE
                    <ChevronRight size={18} />
                </motion.a>

                {/* Fine print */}
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)', fontFamily: '"Outfit", sans-serif' }}>
                    You'll be notified via WhatsApp the moment they drop.
                </p>
            </motion.div>
        </section>
    );
};

export default AccessoriesSection;
