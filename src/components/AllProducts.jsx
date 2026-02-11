import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Filter, X, Search, ShoppingCart, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';

const AllProducts = ({ onProductView }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState('all');
    const [sortBy, setSortBy] = useState('default');
    const [searchQuery, setSearchQuery] = useState('');
    const { addToCart, setIsCartOpen } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/products');
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data.products);
                }
            } catch (err) {
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Filter products by search query
    const searchedProducts = products.filter(product => {
        const matchesSearch = searchQuery === '' ||

            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    // Filter products by type
    const filteredProducts = searchedProducts.filter(product => {
        if (filterType === 'all') return true;
        return product.type === filterType;
    });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''));
            case 'price-high':
                return parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, ''));
            case 'rating':
                return b.rating - a.rating;
            case 'name':
                return a.title.localeCompare(b.title);
            default:
                return 0;
        }
    });

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', color: 'white' }}>
                <RefreshCw className="animate-spin" size={48} />
            </div>
        );
    }

    return (
        <section style={{
            minHeight: '100vh',
            width: '100%',
            backgroundColor: '#000',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: '"Outfit", sans-serif',
            padding: '120px 0 80px'
        }}>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
                    
                    .product-card {
                        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                        cursor: pointer;
                    }

                    .product-card:hover {
                        transform: translateY(-15px);
                    }

                    .product-card:hover .product-image {
                        transform: scale(1.1);
                    }

                    .product-image {
                        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                    }

                    .filter-btn {
                        transition: all 0.3s ease;
                    }

                    .filter-btn:hover {
                        transform: translateY(-2px);
                    }

                    .filter-btn.active {
                        background: linear-gradient(135deg, #8A2BE2 0%, #6A1BB2 100%);
                        border-color: #8A2BE2;
                    }

                    @media (max-width: 768px) {
                        .products-grid {
                            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)) !important;
                        }
                    }
                `}
            </style>

            {/* Animated Background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: `
                    radial-gradient(circle at 20% 30%, rgba(138, 43, 226, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 80% 70%, rgba(75, 0, 130, 0.12) 0%, transparent 50%),
                    linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)
                `,
                zIndex: 0
            }} />

            {/* Animated Orbs */}
            <motion.div
                animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.2, 1],
                    x: [0, 30, 0],
                    y: [0, -20, 0]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    position: 'absolute',
                    top: '10%',
                    right: '10%',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(138, 43, 226, 0.2) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    borderRadius: '50%',
                    zIndex: 1
                }}
            />

            <motion.div
                animate={{
                    opacity: [0.15, 0.3, 0.15],
                    scale: [1, 1.3, 1],
                    x: [0, -40, 0],
                    y: [0, 30, 0]
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                style={{
                    position: 'absolute',
                    bottom: '15%',
                    left: '10%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(75, 0, 130, 0.18) 0%, transparent 70%)',
                    filter: 'blur(70px)',
                    borderRadius: '50%',
                    zIndex: 1
                }}
            />

            {/* Content */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '0 5%'
            }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        textAlign: 'center',
                        marginBottom: '4rem'
                    }}
                >
                    <h1 style={{
                        fontSize: 'clamp(3rem, 8vw, 5rem)',
                        fontWeight: 900,
                        marginBottom: '1rem',
                        background: 'linear-gradient(135deg, #ffffff 0%, #8A2BE2 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-2px',
                        textTransform: 'uppercase'
                    }}>
                        Our Collection
                    </h1>
                    <p style={{
                        fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                        color: 'rgba(255, 255, 255, 0.6)',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        Explore our premium selection of vapes and hookahs
                    </p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    style={{
                        maxWidth: '600px',
                        margin: '0 auto 3rem',
                        position: 'relative'
                    }}
                >
                    <div style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Search
                            size={20}
                            style={{
                                position: 'absolute',
                                left: '1.5rem',
                                color: 'rgba(255, 255, 255, 0.5)',
                                pointerEvents: 'none'
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '1rem 3.5rem 1rem 3.5rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '3rem',
                                color: 'white',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'all 0.3s ease'
                            }}
                            onFocus={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                                e.target.style.borderColor = 'rgba(138, 43, 226, 0.5)';
                            }}
                            onBlur={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                            }}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                style={{
                                    position: 'absolute',
                                    right: '1.5rem',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '24px',
                                    height: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                                onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                            >
                                <X size={14} color="white" />
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* Filters and Sort */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1.5rem',
                        marginBottom: '3rem',
                        padding: '2rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '1.5rem'
                    }}
                >
                    {/* Filter Buttons */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <span style={{
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <Filter size={18} />
                            Filter:
                        </span>
                        {['all', 'Vape', 'Hookah'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`filter-btn ${filterType === type ? 'active' : ''}`}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: filterType === type
                                        ? 'linear-gradient(135deg, #8A2BE2 0%, #6A1BB2 100%)'
                                        : 'rgba(255, 255, 255, 0.05)',
                                    border: `1px solid ${filterType === type ? '#8A2BE2' : 'rgba(255, 255, 255, 0.1)'}`,
                                    borderRadius: '2rem',
                                    color: 'white',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    textTransform: 'capitalize'
                                }}
                            >
                                {type === 'all' ? 'All Products' : `${type}s`}
                            </button>
                        ))}
                    </div>

                    {/* Sort Dropdown */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <label style={{
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: '0.9rem',
                            fontWeight: 600
                        }}>
                            Sort by:
                        </label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '2rem',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                outline: 'none'
                            }}
                        >
                            <option value="default" style={{ background: '#1a1a1a' }}>Default</option>
                            <option value="name" style={{ background: '#1a1a1a' }}>Name (A-Z)</option>
                            <option value="price-low" style={{ background: '#1a1a1a' }}>Price: Low to High</option>
                            <option value="price-high" style={{ background: '#1a1a1a' }}>Price: High to Low</option>
                            <option value="rating" style={{ background: '#1a1a1a' }}>Highest Rated</option>
                        </select>
                    </div>
                </motion.div>

                {/* Products Count */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: '0.95rem',
                        marginBottom: '2rem',
                        fontWeight: 500
                    }}
                >
                    Showing {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''}
                </motion.div>

                {/* Products Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={filterType + sortBy}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="products-grid"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '2rem',
                            marginBottom: '4rem'
                        }}
                    >
                        {sortedProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="product-card"
                                onClick={() => onProductView && onProductView(product.id)}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '1.5rem',
                                    padding: '1.5rem',
                                    overflow: 'hidden',
                                    position: 'relative'
                                }}
                            >
                                {/* Product Image */}
                                <div style={{
                                    width: '100%',
                                    height: '280px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '1.5rem',
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    borderRadius: '1rem',
                                    padding: '1.5rem',
                                    overflow: 'hidden'
                                }}>
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="product-image"
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                            objectFit: 'contain',
                                            filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.4))'
                                        }}
                                    />
                                </div>

                                {/* Category Badge */}
                                <div style={{
                                    position: 'absolute',
                                    top: '1.5rem',
                                    right: '1.5rem',
                                    padding: '0.5rem 1rem',
                                    background: product.type === 'Vape'
                                        ? 'rgba(138, 43, 226, 0.2)'
                                        : 'rgba(255, 215, 0, 0.2)',
                                    border: `1px solid ${product.type === 'Vape' ? 'rgba(138, 43, 226, 0.4)' : 'rgba(255, 215, 0, 0.4)'}`,
                                    borderRadius: '2rem',
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                    letterSpacing: '1px',
                                    color: product.type === 'Vape' ? '#8A2BE2' : '#FFD700',
                                    textTransform: 'uppercase'
                                }}>
                                    {product.category}
                                </div>

                                {/* Product Info */}
                                <div>
                                    <h3 style={{
                                        fontSize: '1.3rem',
                                        fontWeight: 700,
                                        color: 'white',
                                        marginBottom: '0.75rem',
                                        lineHeight: 1.2
                                    }}>
                                        {product.title}
                                    </h3>

                                    {/* Rating */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        marginBottom: '1rem'
                                    }}>
                                        <div style={{ display: 'flex', gap: '0.2rem' }}>
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    fill={i < Math.floor(product.rating) ? '#FFD700' : 'none'}
                                                    color="#FFD700"
                                                />
                                            ))}
                                        </div>
                                        <span style={{
                                            color: 'rgba(255, 255, 255, 0.5)',
                                            fontSize: '0.85rem'
                                        }}>
                                            {product.rating} ({product.reviews})
                                        </span>
                                    </div>

                                    {/* Price */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'baseline',
                                        gap: '0.75rem',
                                        marginBottom: '1.5rem'
                                    }}>
                                        <span style={{
                                            fontSize: '2rem',
                                            fontWeight: 800,
                                            color: 'white'
                                        }}>
                                            {product.price}
                                        </span>
                                        {product.originalPrice && (
                                            <span style={{
                                                fontSize: '1rem',
                                                color: 'rgba(255, 255, 255, 0.4)',
                                                textDecoration: 'line-through'
                                            }}>
                                                {product.originalPrice}
                                            </span>
                                        )}
                                    </div>

                                    {/* Buttons */}
                                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addToCart(product);
                                                setIsCartOpen(true);
                                            }}
                                            style={{
                                                flex: 1,
                                                padding: '1rem',
                                                background: 'linear-gradient(135deg, #8A2BE2 0%, #6A1BB2 100%)',
                                                border: 'none',
                                                borderRadius: '1rem',
                                                color: 'white',
                                                fontWeight: 600,
                                                fontSize: '0.95rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.5rem'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.transform = 'translateY(-2px)';
                                                e.target.style.boxShadow = '0 10px 25px rgba(138, 43, 226, 0.4)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.transform = 'translateY(0)';
                                                e.target.style.boxShadow = 'none';
                                            }}
                                        >
                                            <ShoppingCart size={18} />
                                            Add to Cart
                                        </button>
                                        <button
                                            style={{
                                                flex: 1,
                                                padding: '1rem',
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                                borderRadius: '1rem',
                                                color: 'white',
                                                fontWeight: 600,
                                                fontSize: '0.95rem',
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
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default AllProducts;
