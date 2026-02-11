import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Star, Check, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import API_URL from '../config';

const ProductDetail = ({ productId, onBack, onProductView }) => {
    const { addToCart, setIsCartOpen } = useCart();
    const [displayProduct, setDisplayProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [recommendedProducts, setRecommendedProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/api/products`);
                if (response.ok) {
                    const data = await response.json();
                    const product = data.products.find(p => String(p.id) === String(productId));

                    // Create a helper to resolve image path
                    if (product) {
                        const getImageUrl = (path) => {
                            if (!path) return '';
                            if (path.startsWith('http') || path.startsWith('/')) return path;
                            return `/assets/${path}`;
                        };

                        // Normalize product data from DB
                        product.image = getImageUrl(product.image_path || product.image);
                        product.bg = getImageUrl(product.bg_path || product.bg);

                        // Fix recommended products too if they lack image handling
                        data.products.forEach(p => {
                            p.image = getImageUrl(p.image_path || p.image);
                        });
                    }

                    setDisplayProduct(product);

                    if (product) {
                        setRecommendedProducts(data.products
                            .filter(p => p.id !== product.id && p.type === product.type)
                            .slice(0, 4));
                    }
                }
            } catch (err) {
                console.error('Error fetching product details:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [productId]);

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', color: 'white' }}>
                <RefreshCw className="animate-spin" size={48} />
            </div>
        );
    }

    if (!displayProduct) return <div style={{ color: 'white', textAlign: 'center', padding: '100px' }}>Product not found.</div>;

    const whatsappNumber = '919334807758';
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

                            {/* Action Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                                style={{
                                    display: 'flex',
                                    gap: '1.5rem',
                                    flexWrap: 'wrap'
                                }}
                            >
                                {/* Add to Cart Button */}
                                <button
                                    onClick={() => {
                                        addToCart(displayProduct);
                                        setIsCartOpen(true);
                                    }}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '1.2rem 3rem',
                                        borderRadius: '3rem',
                                        background: 'linear-gradient(135deg, #8A2BE2 0%, #6A1BB2 100%)',
                                        color: 'white',
                                        fontWeight: 700,
                                        fontSize: '1.1rem',
                                        border: 'none',
                                        cursor: 'pointer',
                                        letterSpacing: '1px',
                                        boxShadow: '0 10px 30px rgba(138, 43, 226, 0.4)',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.boxShadow = '0 15px 40px rgba(138, 43, 226, 0.6)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = '0 10px 30px rgba(138, 43, 226, 0.4)';
                                    }}
                                >
                                    <ShoppingCart size={22} />
                                    Add to Cart
                                </button>

                                {/* WhatsApp Order Button */}
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '1.2rem 3rem',
                                        borderRadius: '3rem',
                                        background: 'rgba(37, 211, 102, 0.1)',
                                        border: '2px solid #25D366',
                                        color: '#25D366',
                                        fontWeight: 700,
                                        fontSize: '1.1rem',
                                        textDecoration: 'none',
                                        cursor: 'pointer',
                                        letterSpacing: '1px',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = '#25D366';
                                        e.target.style.color = 'white';
                                        e.target.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = 'rgba(37, 211, 102, 0.1)';
                                        e.target.style.color = '#25D366';
                                        e.target.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                    WhatsApp
                                </a>
                            </motion.div>
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
                        Other {displayProduct.type === 'Hookah' ? 'Hookahs' : 'Vapes'} You May Like
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
