import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Wind, BatteryCharging, Cpu } from 'lucide-react';

const categories = [
    { icon: Zap, label: 'Coils', color: '#F59E0B' },
    { icon: Wind, label: 'Tanks', color: '#38BDF8' },
    { icon: BatteryCharging, label: 'Batteries', color: '#4ADE80' },
    { icon: Cpu, label: 'Atomizers', color: '#E879F9' },
];

const AccessoriesSection = () => {

    return (
        <section
            id="accessories"
            style={{
                position: 'relative',
                backgroundColor: '#070709',
                overflow: 'hidden',
                padding: '8rem 5%',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            {/* Subtle radial glow */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(138,43,226,0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            {/* Dot grid */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(rgba(138,43,226,0.12) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                pointerEvents: 'none',
            }} />

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                style={{
                    position: 'relative',
                    zIndex: 5,
                    maxWidth: '620px',
                    width: '100%',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.75rem',
                }}
            >
                {/* Badge */}
                <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.4rem 1.1rem',
                        borderRadius: '3rem',
                        background: 'rgba(138,43,226,0.1)',
                        border: '1px solid rgba(138,43,226,0.3)',
                    }}
                >
                    <Sparkles size={13} color="#8A2BE2" />
                    <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '2.5px',
                        color: '#8A2BE2',
                        fontFamily: '"Outfit", sans-serif',
                    }}>
                        COMING SOON
                    </span>
                </motion.div>

                {/* Headline */}
                <div>
                    <h2 style={{
                        fontSize: 'clamp(2.6rem, 7vw, 4.5rem)',
                        fontWeight: 900,
                        lineHeight: 1,
                        color: 'white',
                        fontFamily: '"Outfit", sans-serif',
                        margin: 0,
                    }}>
                        ACCESSORIES
                    </h2>
                    <p style={{
                        marginTop: '0.6rem',
                        fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                        fontWeight: 400,
                        color: 'rgba(255,255,255,0.35)',
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                        fontFamily: '"Outfit", sans-serif',
                    }}>
                        Dropping Soon
                    </p>
                </div>

                {/* Divider */}
                <div style={{
                    width: 48,
                    height: 2,
                    borderRadius: 2,
                    background: 'linear-gradient(90deg, transparent, rgba(138,43,226,0.6), transparent)',
                }} />

                {/* Sub-copy */}
                <p style={{
                    fontSize: '1rem',
                    lineHeight: 1.8,
                    color: 'rgba(255,255,255,0.45)',
                    maxWidth: '480px',
                    fontFamily: '"Outfit", sans-serif',
                    margin: 0,
                }}>
                    We're curating a premium line of coils, tanks, batteries, and atomizers — everything your device needs to perform at its peak.
                </p>

                {/* Category pills */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.65rem',
                    justifyContent: 'center',
                }}>
                    {categories.map(({ icon: Icon, label, color }, i) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + i * 0.07 }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.45rem 1rem',
                                borderRadius: '2rem',
                                background: `${color}10`,
                                border: `1px solid ${color}28`,
                                fontFamily: '"Outfit", sans-serif',
                            }}
                        >
                            <Icon size={13} color={color} />
                            <span style={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                letterSpacing: '1px',
                                color: `${color}CC`,
                            }}>
                                {label}
                            </span>
                        </motion.div>
                    ))}
                </div>


            </motion.div>
        </section>
    );
};

export default AccessoriesSection;
