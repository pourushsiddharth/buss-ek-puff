import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, ShoppingCart, Search, Menu } from 'lucide-react';
import { allProducts } from '../data/products';

const ProductSlider = ({ onProductView }) => {
    const [activeIdx, setActiveIdx] = useState(0);
    const active = allProducts[activeIdx];

    const next = () => setActiveIdx((prev) => (prev + 1) % allProducts.length);
    const prev = () => setActiveIdx((prev) => (prev - 1 + allProducts.length) % allProducts.length);

    return (
        <section style={{
            minHeight: '100vh',
            width: '100%',
            backgroundColor: '#000',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: '"Inter", sans-serif',
            padding: '80px 0 0 0',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
                    
                    .product-slider-container {
                        font-family: 'Outfit', sans-serif;
                    }

                    .glass-nav {
                        background: rgba(255, 255, 255, 0.05);
                        backdrop-filter: blur(10px);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                    }

                    .card-glow {
                        transition: all 0.3s ease;
                    }

                    .card-glow:hover {
                        border-color: rgba(255, 255, 255, 0.4);
                        transform: translateY(-5px);
                        box-shadow: 0 10px 30px rgba(0,0,0,0.8);
                    }

                    .slider-cards-container {
                        scrollbar-width: none;
                        -ms-overflow-style: none;
                    }

                    .slider-cards-container::-webkit-scrollbar {
                        display: none;
                    }

                    /* Tablet */
                    @media (max-width: 1024px) {
                        .product-image-container {
                            width: 50% !important;
                            height: 75% !important;
                            right: 5% !important;
                        }
                        .side-info {
                            width: 55% !important;
                        }
                    }

                    /* Mobile */
                    @media (max-width: 768px) {
                        .main-content-area {
                            flex-direction: column !important;
                            padding: 2rem 5% !important;
                        }
                        .side-info { 
                            width: 100% !important; 
                            padding-right: 0 !important;
                            margin-bottom: 2rem !important;
                        }
                        .main-title { 
                            font-size: 2.5rem !important; 
                            margin-bottom: 1rem !important;
                        }
                        .product-image-container { 
                            position: relative !important;
                            top: auto !important;
                            right: auto !important;
                            transform: none !important;
                            width: 100% !important;
                            height: 350px !important;
                            margin-bottom: 2rem !important;
                        }
                        .controls-row {
                            flex-direction: column !important;
                            align-items: flex-start !important;
                            gap: 1rem !important;
                        }
                        .bottom-slider-section {
                            padding: 0 5% 20px 5% !important;
                        }
                        .slider-cards-container {
                            gap: 0.7rem !important;
                        }
                        .slider-card {
                            flex: 0 0 110px !important;
                            height: 145px !important;
                        }
                    }
                `}
            </style>

            {/* Smoky Background - No product images */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at top, rgba(30, 30, 50, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 100%)',
                zIndex: 0
            }} />

            {/* Smoke effect layers */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 30% 40%, rgba(100, 60, 200, 0.15) 0%, transparent 50%)',
                filter: 'blur(60px)',
                zIndex: 1
            }} />
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 70% 60%, rgba(60, 100, 200, 0.1) 0%, transparent 50%)',
                filter: 'blur(80px)',
                zIndex: 1
            }} />

            {/* Main Content Area - Flex grow to push slider to bottom */}
            <div className="main-content-area" style={{
                flex: 1,
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                padding: '0 8%'
            }}>
                {/* Product Image - Centered Right */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`img-${activeIdx}`}
                        initial={{ opacity: 0, x: 100, rotate: 5 }}
                        animate={{ opacity: 1, x: 0, rotate: 0 }}
                        exit={{ opacity: 0, x: -100, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 60, damping: 20 }}
                        className="product-image-container"
                        style={{
                            position: 'absolute',
                            top: '10%',
                            right: '5%',
                            width: '70%',
                            height: '90%',
                            transform: 'translateY(0)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <img
                            src={active.image}
                            alt={active.title}
                            style={{
                                maxHeight: '100%',
                                maxWidth: '100%',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.9))',
                                borderRadius: '2rem'
                            }}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Text Content - Left Side */}
                <div className="side-info product-slider-container" style={{
                    width: '50%',
                    color: 'white',
                    paddingRight: '2rem'
                }}>
                    <motion.div
                        key={`cat-${activeIdx}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            letterSpacing: '4px',
                            marginBottom: '1.5rem',
                            color: 'rgba(255,255,255,0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}
                    >
                        {active.category}
                        <div style={{ width: '50px', height: '1px', backgroundColor: 'rgba(255,255,255,0.3)' }} />
                    </motion.div>

                    <motion.h1
                        key={`title-${activeIdx}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="main-title"
                        style={{
                            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                            fontWeight: 900,
                            lineHeight: 0.95,
                            marginBottom: '2rem',
                            textTransform: 'uppercase',
                            letterSpacing: '-2px'
                        }}
                    >
                        {active.title}
                    </motion.h1>

                    <motion.p
                        key={`desc-${activeIdx}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{
                            fontSize: '1rem',
                            lineHeight: 1.7,
                            color: 'rgba(255,255,255,0.65)',
                            maxWidth: '420px',
                            marginBottom: '3rem'
                        }}
                    >
                        {active.description}
                    </motion.p>

                    {/* Controls Row */}
                    <div className="controls-row" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button
                                onClick={prev}
                                className="glass-nav"
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    color: 'white',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={next}
                                className="glass-nav"
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    color: 'white',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                        <button
                            onClick={() => onProductView && onProductView(active.id)}
                            style={{
                                padding: '0.9rem 2.2rem',
                                borderRadius: '3rem',
                                background: 'white',
                                color: 'black',
                                fontWeight: 700,
                                fontSize: '0.85rem',
                                border: 'none',
                                cursor: 'pointer',
                                letterSpacing: '1px',
                                transition: 'transform 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            VIEW DETAILS
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Slider - Fixed at bottom */}
            <div className="bottom-slider-section" style={{
                position: 'relative',
                zIndex: 20,
                padding: '3rem 8% 30px 8%',
                background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.2rem'
                }}>
                    <h3 style={{
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '3px',
                        margin: 0,
                        textTransform: 'uppercase'
                    }}>
                        Complete Collection
                    </h3>
                    <span style={{
                        fontSize: '0.7rem',
                        opacity: 0.5,
                        color: 'white',
                        fontWeight: 600
                    }}>
                        {(activeIdx + 1).toString().padStart(2, '0')} / {allProducts.length.toString().padStart(2, '0')}
                    </span>
                </div>

                <div className="slider-cards-container" style={{
                    display: 'flex',
                    gap: '0.9rem',
                    overflowX: 'auto',
                    paddingBottom: '0.5rem'
                }}>
                    {allProducts.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            onClick={() => setActiveIdx(idx)}
                            className="card-glow slider-card"
                            whileHover={{ scale: 1.05 }}
                            style={{
                                flex: '0 0 140px',
                                height: '185px',
                                borderRadius: '1rem',
                                overflow: 'hidden',
                                position: 'relative',
                                cursor: 'pointer',
                                border: activeIdx === idx ? '2.5px solid white' : '1px solid rgba(255,255,255,0.15)',
                            }}
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    opacity: activeIdx === idx ? 1 : 0.5,
                                    transition: 'opacity 0.3s ease'
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                padding: '0.9rem'
                            }}>
                                <p style={{
                                    color: 'white',
                                    fontSize: '0.68rem',
                                    fontWeight: 700,
                                    margin: 0,
                                    lineHeight: 1.2
                                }}>
                                    {item.title}
                                </p>
                                <p style={{
                                    color: 'rgba(255,255,255,0.5)',
                                    fontSize: '0.6rem',
                                    margin: '0.2rem 0 0 0',
                                    fontWeight: 500
                                }}>
                                    {item.type}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Ambient Background Glows */}
            <div style={{
                position: 'absolute',
                top: '10%',
                right: '-5%',
                width: '40%',
                height: '40%',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                filter: 'blur(100px)',
                pointerEvents: 'none',
                zIndex: 1
            }} />
        </section>
    );
};

export default ProductSlider;
