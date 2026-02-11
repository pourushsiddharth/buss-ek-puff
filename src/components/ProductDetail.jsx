import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Star, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { allProducts } from '../data/products';
import contactusBg from '../assets/contactus_bg.png';

const ProductDetail = ({ product, onBack, onProductView }) => {
    // Use provided product or default to first product
    const displayProduct = product || allProducts[0];

    // Generate recommendations (exclude current product)
    const recommendedProducts = allProducts
        .filter(p => p.id !== displayProduct.id)
        .slice(0, 4);
    const whatsappNumber = '1234567890'; // Replace with actual WhatsApp number
    const whatsappMessage = `Hi! I'm interested in ordering ${displayProduct.title}`;
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <section style={{
            minHeight: '100vh',
            width: '100%',
            backgroundColor: '#000',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: '"Inter", sans-serif',
            padding: '100px 0'
        }}>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
                    
                    .product-detail-container {
                        font-family: 'Outfit', sans-serif;
                    }

                    .glass-card {
                        background: rgba(255, 255, 255, 0.03);
                        backdrop-filter: blur(20px);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 2rem;
                    }

                    .whatsapp-btn {
                        background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
                        transition: all 0.3s ease;
                    }

                    .whatsapp-btn:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 10px 30px rgba(37, 211, 102, 0.4);
                    }

                    .feature-item {
                        transition: all 0.3s ease;
                    }

                    .feature-item:hover {
                        transform: translateX(5px);
                    }

                    .recommendations-scroll {
                        scrollbar-width: none;
                        -ms-overflow-style: none;
                    }

                    .recommendations-scroll::-webkit-scrollbar {
                        display: none;
                    }

                    .recommendation-card {
                        transition: all 0.3s ease;
                    }

                    .recommendation-card:hover {
                        transform: translateY(-10px);
                        border-color: rgba(255, 255, 255, 0.3);
                    }

                    @media (max-width: 1024px) {
                        .product-grid {
                            grid-template-columns: 1fr !important;
                            gap: 3rem !important;
                        }
                        .product-image-section {
                            max-width: 500px !important;
                            margin: 0 auto !important;
                        }
                    }

                    @media (max-width: 768px) {
                        .glass-card {
                            padding: 2rem !important;
                        }
                        .product-title {
                            font-size: 2.5rem !important;
                        }
                    }
                `}
            </style>

            {/* Background with contactus_bg image */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${contactusBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                zIndex: 0
            }} />

            {/* Smoky overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.85) 100%)',
                zIndex: 1
            }} />

            {/* Content */}
            <div className="product-detail-container" style={{
                position: 'relative',
                zIndex: 10,
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '0 5%'
            }}>
                {/* Back Button */}
                {onBack && (
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={onBack}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: 'white',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '2rem',
                            cursor: 'pointer',
                            marginBottom: '2rem',
                            fontSize: '0.9rem',
                            fontWeight: 600
                        }}
                    >
                        <ArrowLeft size={18} />
                        Back to Collection
                    </motion.button>
                )}

                {/* Main Glass Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="glass-card"
                    style={{ padding: '3rem' }}
                >
                    <div className="product-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1.2fr',
                        gap: '5rem',
                        alignItems: 'center'
                    }}>
                        {/* Product Image Section */}
                        <div className="product-image-section">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    borderRadius: '2rem',
                                    padding: '3rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <img
                                    src={displayProduct.image}
                                    alt={displayProduct.title}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        maxHeight: '500px',
                                        objectFit: 'contain',
                                        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
                                        borderRadius: '1.5rem'
                                    }}
                                />
                            </motion.div>
                        </div>

                        {/* Product Info Section */}
                        <div style={{ color: 'white' }}>
                            {/* Category */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    letterSpacing: '3px',
                                    color: 'rgba(255,255,255,0.5)',
                                    marginBottom: '1rem',
                                    textTransform: 'uppercase'
                                }}
                            >
                                {displayProduct.category}
                            </motion.div>

                            {/* Title */}
                            <motion.h1
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="product-title"
                                style={{
                                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                                    fontWeight: 900,
                                    lineHeight: 1,
                                    marginBottom: '1.5rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '-1px'
                                }}
                            >
                                {displayProduct.title}
                            </motion.h1>

                            {/* Rating */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    marginBottom: '2rem'
                                }}
                            >
                                <div style={{ display: 'flex', gap: '0.25rem' }}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={18}
                                            fill={i < Math.floor(displayProduct.rating) ? '#FFD700' : 'none'}
                                            color="#FFD700"
                                        />
                                    ))}
                                </div>
                                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                                    {displayProduct.rating} ({displayProduct.reviews} reviews)
                                </span>
                            </motion.div>

                            {/* Price */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                style={{ marginBottom: '2rem' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '0.5rem' }}>
                                    <span style={{ fontSize: '3rem', fontWeight: 800, color: 'white' }}>
                                        {displayProduct.price}
                                    </span>
                                    {displayProduct.originalPrice && (
                                        <span style={{
                                            fontSize: '1.5rem',
                                            color: 'rgba(255,255,255,0.4)',
                                            textDecoration: 'line-through'
                                        }}>
                                            {displayProduct.originalPrice}
                                        </span>
                                    )}
                                </div>
                                {displayProduct.originalPrice && (
                                    <span style={{
                                        display: 'inline-block',
                                        background: 'rgba(0, 255, 0, 0.1)',
                                        color: '#00ff00',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.85rem',
                                        fontWeight: 700
                                    }}>
                                        Save {Math.round((1 - parseInt(displayProduct.price.replace(/[^0-9]/g, '')) / parseInt(displayProduct.originalPrice.replace(/[^0-9]/g, ''))) * 100)}%
                                    </span>
                                )}
                            </motion.div>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                style={{
                                    fontSize: '1.05rem',
                                    lineHeight: 1.7,
                                    color: 'rgba(255,255,255,0.7)',
                                    marginBottom: '2.5rem'
                                }}
                            >
                                {displayProduct.description}
                            </motion.p>

                            {/* Features */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                style={{ marginBottom: '3rem' }}
                            >
                                <h3 style={{
                                    fontSize: '1.2rem',
                                    fontWeight: 700,
                                    marginBottom: '1.5rem',
                                    color: 'white'
                                }}>
                                    Key Features
                                </h3>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                    gap: '1rem'
                                }}>
                                    {displayProduct.features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="feature-item"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.75rem',
                                                color: 'rgba(255,255,255,0.8)',
                                                fontSize: '0.95rem'
                                            }}
                                        >
                                            <div style={{
                                                background: 'rgba(139, 92, 246, 0.2)',
                                                borderRadius: '50%',
                                                padding: '0.3rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <Check size={14} color="#8b5cf6" />
                                            </div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* WhatsApp Order Button */}
                            <motion.a
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="whatsapp-btn"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1.2rem 3rem',
                                    borderRadius: '3rem',
                                    color: 'white',
                                    fontWeight: 700,
                                    fontSize: '1.1rem',
                                    textDecoration: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    letterSpacing: '0.5px'
                                }}
                            >
                                <ShoppingCart size={22} />
                                Order on WhatsApp
                            </motion.a>
                        </div>
                    </div>

                    {/* Specifications */}
                    {displayProduct.specifications && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            style={{
                                marginTop: '4rem',
                                paddingTop: '3rem',
                                borderTop: '1px solid rgba(255,255,255,0.1)'
                            }}
                        >
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: 700,
                                marginBottom: '2rem',
                                color: 'white'
                            }}>
                                Specifications
                            </h3>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                gap: '1.5rem'
                            }}>
                                {Object.entries(displayProduct.specifications).map(([key, value]) => (
                                    <div key={key} style={{
                                        background: 'rgba(255, 255, 255, 0.02)',
                                        padding: '1.5rem',
                                        borderRadius: '1rem',
                                        border: '1px solid rgba(255,255,255,0.05)'
                                    }}>
                                        <div style={{
                                            fontSize: '0.8rem',
                                            color: 'rgba(255,255,255,0.5)',
                                            marginBottom: '0.5rem',
                                            fontWeight: 600,
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px'
                                        }}>
                                            {key}
                                        </div>
                                        <div style={{
                                            fontSize: '1.1rem',
                                            color: 'white',
                                            fontWeight: 600
                                        }}>
                                            {value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </motion.div>

                {/* Recommendations Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                    style={{
                        marginTop: '4rem',
                        padding: '3rem',
                        background: 'rgba(255, 255, 255, 0.02)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '2rem'
                    }}
                >
                    <h3 style={{
                        fontSize: '1.8rem',
                        fontWeight: 800,
                        marginBottom: '2rem',
                        color: 'white',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        You May Also Like
                    </h3>

                    <div className="recommendations-scroll" style={{
                        display: 'flex',
                        gap: '1.5rem',
                        overflowX: 'auto',
                        paddingBottom: '1rem'
                    }}>
                        {recommendedProducts.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.2 + index * 0.1 }}
                                className="recommendation-card"
                                style={{
                                    flex: '0 0 280px',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '1.5rem',
                                    padding: '1.5rem',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                {/* Product Image */}
                                <div style={{
                                    width: '100%',
                                    height: '200px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '1rem',
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    borderRadius: '1rem',
                                    padding: '1rem'
                                }}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                            objectFit: 'contain',
                                            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
                                        }}
                                    />
                                </div>

                                {/* Category */}
                                <div style={{
                                    fontSize: '0.65rem',
                                    fontWeight: 700,
                                    letterSpacing: '2px',
                                    color: 'rgba(255,255,255,0.5)',
                                    marginBottom: '0.5rem',
                                    textTransform: 'uppercase'
                                }}>
                                    {item.category}
                                </div>

                                {/* Title */}
                                <h4 style={{
                                    fontSize: '1.2rem',
                                    fontWeight: 700,
                                    color: 'white',
                                    marginBottom: '0.75rem',
                                    lineHeight: 1.2
                                }}>
                                    {item.title}
                                </h4>

                                {/* Price */}
                                <div style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 800,
                                    color: 'white',
                                    marginBottom: '1rem'
                                }}>
                                    {item.price}
                                </div>

                                {/* View Button */}
                                <button
                                    onClick={() => onProductView && onProductView(item.id)}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        borderRadius: '0.75rem',
                                        color: 'white',
                                        fontWeight: 600,
                                        fontSize: '0.9rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                                    }}
                                >
                                    View Details
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ProductDetail;
