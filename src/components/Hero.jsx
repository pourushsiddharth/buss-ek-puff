import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import hero1Img from '../assets/hero1.png';
import hero2Img from '../assets/hero2.png';

const slides = [
    {
        id: 1,
        title: "PREMIUM VAPE",
        subtitle: "EXPERIENCE THE FUTURE",
        description: "Discover our exclusive collection of high-end vapes. Crafted for those who appreciate the finer things in life.",
        image: hero1Img,
        cta: "EXPLORE COLLECTION"
    },
    {
        id: 2,
        title: "HOOKAH BASES",
        subtitle: "EXQUISITE GLASSWARE",
        description: "Premium glass bases for your hookah collection. Artisan-crafted for clarity, durability, and a refined smoking experience.",
        image: hero2Img,
        cta: "SHOP BASES"
    }
];

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="hero-section" style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden' }}>
            <style>
                {`
                    @media (max-width: 768px) {
                        #hero-section { height: auto !important; min-height: 100vh !important; padding: 80px 0 40px !important; display: flex !important; flex-direction: column !important; justify-content: center !important; }
                        .hero-slide { position: relative !important; height: auto !important; min-height: 50vh !important; width: 100% !important; padding: 0 !important; display: flex !important; align-items: center !important; }
                        .hero-content { padding: 0 5% !important; text-align: center; width: 100% !important; }
                        .hero-btn { width: 100% !important; padding: 1rem !important; margin-top: 1rem !important; }
                        .hero-controls { position: relative !important; margin-top: 2rem !important; justify-content: center !important; width: 100% !important; right: auto !important; bottom: auto !important; gap: 1rem !important; }
                        .hero-controls button { width: 50px !important; height: 50px !important; border: 1px solid rgba(255,255,255,0.2) !important; }
                        .hero-progress { position: relative !important; margin-top: 1.5rem !important; transform: none !important; left: auto !important; bottom: auto !important; justify-content: center !important; width: 100% !important; }
                    }
                    @media (min-width: 769px) {
                        .hero-content { padding-bottom: 100px; }
                    }
                    @media (min-width: 1600px) {
                        .hero-content { max-width: 700px !important; }
                    }
                `}
            </style>
            <AnimatePresence mode="wait">
                <motion.div
                    className="hero-slide"
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%), url(${slides[currentSlide].image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 10%'
                    }}
                >
                    <div className="hero-content" style={{ maxWidth: '600px' }}>
                        <motion.span
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            style={{ color: '#8b5cf6', fontWeight: 600, letterSpacing: '4px', fontSize: '0.9rem', marginBottom: '1rem', display: 'block' }}
                        >
                            {slides[currentSlide].subtitle}
                        </motion.span>

                        <motion.h1
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: 800, lineHeight: 1, marginBottom: '1.5rem', letterSpacing: '-2px' }}
                        >
                            {slides[currentSlide].title}
                        </motion.h1>

                        <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            style={{ color: 'var(--secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2.5rem', maxWidth: '500px' }}
                        >
                            {slides[currentSlide].description}
                        </motion.p>

                        <motion.button
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                const targetId = currentSlide === 0 ? 'vape-carousel' : 'hookah-carousel';
                                const element = document.getElementById(targetId);
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                            }}
                            className="hero-btn"
                            style={{
                                backgroundColor: 'var(--primary)',
                                color: 'black',
                                padding: '1.2rem 3rem',
                                fontWeight: 700,
                                fontSize: '0.9rem',
                                letterSpacing: '2px',
                                borderRadius: '2px',
                                transition: 'var(--transition)',
                                cursor: 'pointer'
                            }}
                        >
                            {slides[currentSlide].cta}
                        </motion.button>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="hero-controls" style={{ position: 'absolute', bottom: '10%', right: '10%', display: 'flex', gap: '2rem' }}>
                <button onClick={prevSlide} className="glass" style={{ width: '60px', height: '60px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                    <ChevronLeft size={24} />
                </button>
                <button onClick={nextSlide} className="glass" style={{ width: '60px', height: '60px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Progress Indicator */}
            <div className="hero-progress" style={{ position: 'absolute', bottom: 50, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px' }}>
                {slides.map((_, index) => (
                    <div
                        key={index}
                        style={{
                            width: index === currentSlide ? '40px' : '10px',
                            height: '4px',
                            background: index === currentSlide ? 'var(--accent)' : 'rgba(255,255,255,0.2)',
                            transition: 'all 0.5s ease',
                            borderRadius: '2px'
                        }}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
