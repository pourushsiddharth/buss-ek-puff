import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Play } from 'lucide-react';
import featureBg from '../assets/puff_feature.png';
import product1 from '../assets/product1.png';
import product2 from '../assets/product2.png';
import product3 from '../assets/product3.png';
import product4 from '../assets/product4.png';
import product5 from '../assets/product5.png';
import product1_bg from '../assets/product1_bg.png';
import product2_bg from '../assets/product2_bg.png';
import product3_bg from '../assets/product3_bg.png';
import product4_bg from '../assets/product4_bg.png';
import product5_bg from '../assets/product5_bg.png';
import elfbarLogo from '../assets/elfbar_logo.svg';

const products = [
    {
        id: 1,
        name: "MIDNIGHT MIST",
        subtitle: "SWISS MOUNTAINS",
        description: "Experience the cool, refreshing blend of dark berries inspired by the fresh mountain air.",
        location: "Swiss Mountains",
        image: product1,
        bgImage: product1_bg
    },
    {
        id: 2,
        name: "ARCTIC FREEZE",
        subtitle: "NORTHERN GLACIERS",
        description: "A crisp and refreshing menthol chill that captures the essence of the frozen north.",
        location: "Northern Glaciers",
        image: product2,
        bgImage: product2_bg
    },
    {
        id: 3,
        name: "CRIMSON BERRY",
        subtitle: "VALLEY VINES",
        description: "A vibrant explosion of sun-ripened berries picked fresh from the valley.",
        location: "Valley Vines",
        image: product3,
        bgImage: product3_bg
    },
    {
        id: 4,
        name: "GOLDEN TOBACCO",
        subtitle: "HIGHLAND FARMS",
        description: "A smooth and traditional golden tobacco flavor with a rich, earthy profile.",
        location: "Highland Farms",
        image: product4,
        bgImage: product4_bg
    },
    {
        id: 5,
        name: "EMERALD MINT",
        subtitle: "COASTAL BREEZE",
        description: "Cool and invigorating garden mint with a subtle touch of ocean freshness.",
        location: "Coastal Breeze",
        image: product5,
        bgImage: product5_bg
    }
];

const ProductSection = () => {
    const [activeIdx, setActiveIdx] = useState(0);

    const next = () => setActiveIdx((prev) => (prev + 1) % products.length);
    const prev = () => setActiveIdx((prev) => (prev - 1 + products.length) % products.length);

    const activeProduct = products[activeIdx];

    return (
        <section
            id="product-section"
            style={{
                minHeight: '100vh',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#000',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <style>
                {`
                    @media (max-width: 768px) {
                        #product-section { height: auto !important; padding: 80px 0 !important; }
                        .product-info { padding: 0 5% !important; margin-bottom: 3rem !important; }
                        .product-name { font-size: 3rem !important; }
                        .cards-container { 
                            position: relative !important; 
                            width: 100% !important; 
                            right: auto !important; 
                            bottom: auto !important; 
                            padding: 0 5% !important;
                            margin-top: 2rem !important;
                            display: flex !important;
                            overflow-x: auto !important;
                            gap: 1.5rem !important;
                            scroll-snap-type: x mandatory;
                            -webkit-overflow-scrolling: touch;
                        }
                        .cards-container::-webkit-scrollbar { display: none; }
                        .cards-container > div { scroll-snap-align: start; flex: 0 0 250px !important; }
                        .product-actions { 
                            flex-wrap: wrap !important;
                            gap: 1rem !important;
                        }
                        .nav-controls {
                            gap: 1.5rem !important;
                        }
                        .controls-container {
                            position: relative !important;
                            bottom: auto !important;
                            left: auto !important;
                            width: 100% !important;
                            padding: 0 5% !important;
                            margin-top: 4rem !important;
                            flex-direction: row !important;
                            justify-content: space-between !important;
                            align-items: center !important;
                        }
                    }
                    @media (min-width: 769px) {
                        .controls-container {
                            flex-direction: row-reverse !important;
                            justify-content: flex-start !important;
                            gap: 4rem !important;
                        }
                    }
                    @media (min-width: 1400px) {
                        .product-info { max-width: 700px !important; }
                        .cards-container { width: 50% !important; }
                    }
                `}
            </style>
            {/* Background Image with Overlay */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%), url(${activeProduct.bgImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </AnimatePresence>

            <div style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>

                {/* Featured Product Info */}
                <div className="product-info" style={{ maxWidth: '600px', marginBottom: '4rem', padding: '0 8%' }}>
                    {/* Partnership Badge */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            marginBottom: '1.5rem',
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            width: 'fit-content',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '1px' }}>OFFICIAL PARTNER</span>
                        <img src={elfbarLogo} alt="Elf Bar" style={{ height: '14px', filter: 'brightness(0) invert(1)' }} />
                    </motion.div>
                    <motion.div
                        key={`loc-${activeIdx}`}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', marginBottom: '1rem' }}
                    >
                        <MapPin size={16} color="#8b5cf6" />
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, letterSpacing: '2px' }}>{activeProduct.subtitle}</span>
                    </motion.div>

                    <motion.h2
                        key={`name-${activeIdx}`}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="product-name"
                        style={{
                            fontSize: 'clamp(4rem, 10vw, 7rem)',
                            fontWeight: 900,
                            lineHeight: 0.9,
                            marginBottom: '2rem',
                            color: 'white',
                            textTransform: 'uppercase'
                        }}
                    >
                        {activeProduct.name.split(' ').map((word, i) => (
                            <React.Fragment key={i}>
                                {word}<br />
                            </React.Fragment>
                        ))}
                    </motion.h2>

                    <motion.p
                        key={`desc-${activeIdx}`}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '3rem', maxWidth: '450px' }}
                    >
                        {activeProduct.description}
                    </motion.p>

                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="product-actions"
                        style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
                    >
                        <button style={{
                            flexShrink: 0,
                            backgroundColor: '#ff00ea',
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0 0 20px rgba(255, 0, 234, 0.4)'
                        }}>
                            <Play fill="white" size={18} color="white" />
                        </button>
                        <button className="glass" style={{
                            padding: '1rem 2rem',
                            borderRadius: '2rem',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.8rem',
                            letterSpacing: '1px'
                        }}>
                            DISCOVER PRODUCT
                        </button>
                    </motion.div>
                </div>

                {/* Cards Carousel Container */}
                <div className="cards-container" style={{
                    position: 'absolute',
                    right: 0,
                    bottom: '15%',
                    width: '60%',
                    display: 'flex',
                    gap: '1.5rem',
                    overflowX: 'visible',
                    paddingRight: '5%'
                }}>
                    {products.slice(activeIdx + 1, activeIdx + 4).concat(products.slice(0, Math.max(0, (activeIdx + 4) - products.length))).map((product, i) => (
                        <motion.div
                            key={product.id}
                            layoutId={`card-${product.id}`}
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => setActiveIdx(products.findIndex(p => p.id === product.id))}
                            style={{
                                flex: '0 0 220px',
                                height: '300px',
                                borderRadius: '1.5rem',
                                overflow: 'hidden',
                                position: 'relative',
                                cursor: 'pointer',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}
                        >
                            <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                padding: '1.5rem',
                                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)'
                            }}>
                                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '1px' }}>{product.location}</p>
                                <h4 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 800 }}>{product.name}</h4>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Controls */}
                <div className="controls-container" style={{
                    position: 'absolute',
                    bottom: '5%',
                    left: '8%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3rem',
                    width: '84%',
                    justifyContent: 'space-between'
                }}>
                    <div className="nav-controls" style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={prev} className="glass" style={{ width: '50px', height: '50px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                            <ChevronLeft size={20} />
                        </button>
                        <button onClick={next} className="glass" style={{ width: '50px', height: '50px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    <div style={{ color: 'white', fontSize: '2rem', fontWeight: 800, opacity: 0.6 }}>
                        {(activeIdx + 1).toString().padStart(2, '0')}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductSection;
