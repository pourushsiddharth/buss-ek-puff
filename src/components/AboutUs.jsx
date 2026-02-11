import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Award, Users, Heart, Zap, Shield } from 'lucide-react';
import contactusBg from '../assets/contactus_bg.png';

const AboutUs = ({ onNavigate }) => {
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
    };

    const fadeInLeft = {
        initial: { opacity: 0, x: -60 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
    };

    const fadeInRight = {
        initial: { opacity: 0, x: 60 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const values = [
        {
            icon: <Sparkles size={28} />,
            title: "Premium Quality",
            description: "Curated excellence in every product we offer"
        },
        {
            icon: <Award size={28} />,
            title: "Expert Craftsmanship",
            description: "Precision and artistry in every detail"
        },
        {
            icon: <Users size={28} />,
            title: "Vibrant Community",
            description: "Join thousands of satisfied connoisseurs"
        },
        {
            icon: <Heart size={28} />,
            title: "Customer First",
            description: "Your satisfaction is our top priority"
        },
        {
            icon: <Zap size={28} />,
            title: "Innovation",
            description: "Leading the industry with cutting-edge products"
        },
        {
            icon: <Shield size={28} />,
            title: "Trust & Safety",
            description: "Authentic products, guaranteed quality"
        }
    ];

    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            paddingTop: '80px',
            background: '#000000'
        }}>
            {/* Dynamic Background with Multiple Gradients */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                background: `
                    radial-gradient(circle at 10% 20%, rgba(138, 43, 226, 0.15) 0%, transparent 40%),
                    radial-gradient(circle at 90% 80%, rgba(75, 0, 130, 0.12) 0%, transparent 40%),
                    radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.05) 0%, transparent 60%),
                    linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)
                `
            }} />

            {/* Animated Smoke Orbs */}
            <motion.div
                animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.3, 1],
                    x: [0, 30, 0],
                    y: [0, -20, 0]
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    position: 'absolute',
                    top: '5%',
                    right: '5%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(138, 43, 226, 0.25) 0%, transparent 70%)',
                    filter: 'blur(100px)',
                    borderRadius: '50%',
                    zIndex: 1
                }}
            />

            <motion.div
                animate={{
                    opacity: [0.15, 0.35, 0.15],
                    scale: [1, 1.4, 1],
                    x: [0, -40, 0],
                    y: [0, 30, 0]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3
                }}
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '5%',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(75, 0, 130, 0.2) 0%, transparent 70%)',
                    filter: 'blur(90px)',
                    borderRadius: '50%',
                    zIndex: 1
                }}
            />

            {/* Background Image in Corner */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{
                    position: 'absolute',
                    bottom: '0',
                    right: '0',
                    width: '50%',
                    height: '70%',
                    backgroundImage: `url(${contactusBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center right',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.15,
                    mixBlendMode: 'lighten',
                    zIndex: 1,
                    pointerEvents: 'none',
                    maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)'
                }}
            />


            {/* Content Container */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '0 5%'
            }}>
                {/* Hero Section - Split Layout */}
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '4rem',
                        alignItems: 'center',
                        marginBottom: '120px',
                        paddingTop: '40px'
                    }}
                >
                    <motion.div variants={fadeInLeft}>
                        <div style={{
                            fontSize: '0.85rem',
                            letterSpacing: '4px',
                            color: 'var(--accent)',
                            marginBottom: '1.5rem',
                            fontWeight: 600,
                            textTransform: 'uppercase'
                        }}>
                            About Buss Ek Puff
                        </div>

                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                            fontWeight: 800,
                            marginBottom: '2rem',
                            lineHeight: 0.95,
                            letterSpacing: '-2px'
                        }}>
                            <span style={{
                                background: 'linear-gradient(135deg, #ffffff 0%, #8A2BE2 100%)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                display: 'block'
                            }}>
                                Elevate
                            </span>
                            <span style={{ color: '#ffffff', display: 'block' }}>
                                Your Lifestyle
                            </span>
                        </h1>

                        <p style={{
                            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                            color: 'var(--text-muted)',
                            lineHeight: 1.8,
                            marginBottom: '2.5rem'
                        }}>
                            We're not just selling products—we're crafting experiences.
                            At Buss Ek Puff, luxury meets innovation in every puff, every reflection.
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(138, 43, 226, 0.4)' }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onNavigate('home')}
                            style={{
                                padding: '1.2rem 3rem',
                                fontSize: '0.95rem',
                                fontWeight: 700,
                                letterSpacing: '1.5px',
                                background: 'linear-gradient(135deg, #8A2BE2 0%, #6A1BB2 100%)',
                                color: 'white',
                                borderRadius: '50px',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'var(--transition)',
                                boxShadow: '0 10px 30px rgba(138, 43, 226, 0.3)',
                                textTransform: 'uppercase'
                            }}
                        >
                            Explore Collection
                        </motion.button>
                    </motion.div>

                    <motion.div variants={fadeInRight}>
                        <div style={{
                            background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.1) 0%, rgba(75, 0, 130, 0.05) 100%)',
                            borderRadius: '30px',
                            padding: '3rem',
                            border: '1px solid rgba(138, 43, 226, 0.2)',
                            backdropFilter: 'blur(20px)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '-50%',
                                right: '-50%',
                                width: '200%',
                                height: '200%',
                                background: 'radial-gradient(circle, rgba(138, 43, 226, 0.1) 0%, transparent 50%)',
                                filter: 'blur(40px)'
                            }} />

                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <h3 style={{
                                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                                    marginBottom: '1.5rem',
                                    fontWeight: 700,
                                    color: '#ffffff'
                                }}>
                                    Our Mission
                                </h3>
                                <p style={{
                                    fontSize: '1.05rem',
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    lineHeight: 1.9,
                                    marginBottom: '1.5rem'
                                }}>
                                    To redefine what premium means in the vaping and lifestyle industry.
                                    We curate only the finest products that meet our exacting standards of quality,
                                    design, and performance.
                                </p>
                                <p style={{
                                    fontSize: '1.05rem',
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    lineHeight: 1.9
                                }}>
                                    Every product tells a story of craftsmanship, innovation, and the pursuit
                                    of excellence. Join us on this journey.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '2rem',
                        marginBottom: '120px',
                        padding: '3rem',
                        background: 'rgba(255, 255, 255, 0.02)',
                        borderRadius: '24px',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(20px)'
                    }}
                >
                    {[
                        { number: '10K+', label: 'Happy Customers' },
                        { number: '500+', label: 'Premium Products' },
                        { number: '50+', label: 'Brand Partners' },
                        { number: '99%', label: 'Satisfaction Rate' }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                            style={{ textAlign: 'center' }}
                        >
                            <div style={{
                                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                                fontWeight: 800,
                                background: 'linear-gradient(135deg, #ffffff 0%, #8A2BE2 100%)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                marginBottom: '0.5rem'
                            }}>
                                {stat.number}
                            </div>
                            <div style={{
                                fontSize: '0.95rem',
                                color: 'var(--text-muted)',
                                letterSpacing: '1px',
                                textTransform: 'uppercase'
                            }}>
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Values Section */}
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                    style={{ marginBottom: '120px' }}
                >
                    <motion.div
                        variants={fadeInUp}
                        style={{
                            textAlign: 'center',
                            marginBottom: '4rem'
                        }}
                    >
                        <h2 style={{
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            fontWeight: 800,
                            marginBottom: '1rem',
                            letterSpacing: '-1px'
                        }}>
                            Why Choose Us
                        </h2>
                        <p style={{
                            fontSize: '1.1rem',
                            color: 'var(--text-muted)',
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}>
                            Six pillars that define our commitment to excellence
                        </p>
                    </motion.div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                whileHover={{
                                    y: -15,
                                    boxShadow: '0 25px 50px rgba(138, 43, 226, 0.2)',
                                    borderColor: 'rgba(138, 43, 226, 0.4)'
                                }}
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    borderRadius: '24px',
                                    padding: '2.5rem',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '4px',
                                    background: 'linear-gradient(90deg, #8A2BE2 0%, #6A1BB2 100%)',
                                    opacity: 0.6
                                }} />

                                <div style={{
                                    color: 'var(--accent)',
                                    marginBottom: '1.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '70px',
                                    height: '70px',
                                    background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.15) 0%, rgba(138, 43, 226, 0.05) 100%)',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(138, 43, 226, 0.2)'
                                }}>
                                    {value.icon}
                                </div>
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    marginBottom: '1rem',
                                    fontWeight: 700,
                                    color: '#ffffff'
                                }}>
                                    {value.title}
                                </h3>
                                <p style={{
                                    color: 'var(--text-muted)',
                                    lineHeight: 1.7,
                                    fontSize: '1rem'
                                }}>
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Final CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{
                        textAlign: 'center',
                        padding: 'clamp(4rem, 8vw, 6rem) 3rem',
                        background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.15) 0%, rgba(75, 0, 130, 0.1) 100%)',
                        borderRadius: '30px',
                        border: '2px solid rgba(138, 43, 226, 0.3)',
                        position: 'relative',
                        overflow: 'hidden',
                        marginBottom: '80px'
                    }}
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '150%',
                            height: '150%',
                            background: 'radial-gradient(circle, rgba(138, 43, 226, 0.2) 0%, transparent 70%)',
                            filter: 'blur(60px)',
                            zIndex: 0
                        }}
                    />

                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h2 style={{
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            marginBottom: '1.5rem',
                            fontWeight: 800,
                            letterSpacing: '-1px'
                        }}>
                            Ready to Experience Premium?
                        </h2>
                        <p style={{
                            fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
                            color: 'rgba(255, 255, 255, 0.8)',
                            marginBottom: '3rem',
                            maxWidth: '700px',
                            margin: '0 auto 3rem',
                            lineHeight: 1.7
                        }}>
                            Join thousands of satisfied customers who've elevated their lifestyle
                            with our curated collection of premium products.
                        </p>
                        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onNavigate('home')}
                                style={{
                                    padding: '1.2rem 3.5rem',
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    letterSpacing: '1.5px',
                                    background: 'linear-gradient(135deg, #8A2BE2 0%, #6A1BB2 100%)',
                                    color: 'white',
                                    borderRadius: '50px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'var(--transition)',
                                    boxShadow: '0 15px 40px rgba(138, 43, 226, 0.4)',
                                    textTransform: 'uppercase'
                                }}
                            >
                                Shop Now
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05, background: 'rgba(255, 255, 255, 0.15)' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onNavigate('contact')}
                                style={{
                                    padding: '1.2rem 3.5rem',
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    letterSpacing: '1.5px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    color: 'white',
                                    borderRadius: '50px',
                                    border: '2px solid rgba(255, 255, 255, 0.2)',
                                    cursor: 'pointer',
                                    transition: 'var(--transition)',
                                    backdropFilter: 'blur(10px)',
                                    textTransform: 'uppercase'
                                }}
                            >
                                Contact Us
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutUs;
