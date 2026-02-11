import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = ({ onCheckout }) => {
    const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount, isCartOpen, setIsCartOpen } = useCart();

    if (!isCartOpen) return null;

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.7)',
                            backdropFilter: 'blur(5px)',
                            zIndex: 9998
                        }}
                    />

                    {/* Cart Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            right: 0,
                            top: 0,
                            bottom: 0,
                            width: '100%',
                            maxWidth: '500px',
                            background: '#0a0a0a',
                            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                            zIndex: 9999,
                            display: 'flex',
                            flexDirection: 'column',
                            fontFamily: '"Outfit", sans-serif'
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '2rem',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <h2 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 700,
                                    color: 'white',
                                    marginBottom: '0.25rem'
                                }}>
                                    Shopping Cart
                                </h2>
                                <p style={{
                                    fontSize: '0.9rem',
                                    color: 'rgba(255, 255, 255, 0.5)'
                                }}>
                                    {getCartCount()} {getCartCount() === 1 ? 'item' : 'items'}
                                </p>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                                onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                            >
                                <X size={20} color="white" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '1.5rem'
                        }}>
                            {cart.length === 0 ? (
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%',
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    textAlign: 'center',
                                    padding: '2rem'
                                }}>
                                    <ShoppingBag size={64} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Your cart is empty</h3>
                                    <p style={{ fontSize: '0.9rem' }}>Add some products to get started!</p>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {cart.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: 100 }}
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.03)',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                borderRadius: '1rem',
                                                padding: '1rem',
                                                display: 'flex',
                                                gap: '1rem'
                                            }}
                                        >
                                            {/* Product Image */}
                                            <div style={{
                                                width: '80px',
                                                height: '80px',
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                borderRadius: '0.75rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0
                                            }}>
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    style={{
                                                        maxWidth: '100%',
                                                        maxHeight: '100%',
                                                        objectFit: 'contain'
                                                    }}
                                                />
                                            </div>

                                            {/* Product Info */}
                                            <div style={{ flex: 1 }}>
                                                <h4 style={{
                                                    fontSize: '0.95rem',
                                                    fontWeight: 600,
                                                    color: 'white',
                                                    marginBottom: '0.25rem'
                                                }}>
                                                    {item.title}
                                                </h4>
                                                <p style={{
                                                    fontSize: '0.8rem',
                                                    color: 'rgba(255, 255, 255, 0.5)',
                                                    marginBottom: '0.75rem'
                                                }}>
                                                    {item.category}
                                                </p>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center'
                                                }}>
                                                    {/* Quantity Controls */}
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem',
                                                        background: 'rgba(255, 255, 255, 0.05)',
                                                        borderRadius: '2rem',
                                                        padding: '0.25rem'
                                                    }}>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            style={{
                                                                background: 'rgba(255, 255, 255, 0.1)',
                                                                border: 'none',
                                                                borderRadius: '50%',
                                                                width: '28px',
                                                                height: '28px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                cursor: 'pointer',
                                                                transition: 'all 0.3s ease'
                                                            }}
                                                            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                                                            onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                                                        >
                                                            <Minus size={14} color="white" />
                                                        </button>
                                                        <span style={{
                                                            color: 'white',
                                                            fontSize: '0.9rem',
                                                            fontWeight: 600,
                                                            minWidth: '30px',
                                                            textAlign: 'center'
                                                        }}>
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            style={{
                                                                background: 'rgba(255, 255, 255, 0.1)',
                                                                border: 'none',
                                                                borderRadius: '50%',
                                                                width: '28px',
                                                                height: '28px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                cursor: 'pointer',
                                                                transition: 'all 0.3s ease'
                                                            }}
                                                            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                                                            onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                                                        >
                                                            <Plus size={14} color="white" />
                                                        </button>
                                                    </div>

                                                    {/* Price */}
                                                    <div style={{
                                                        fontSize: '1.1rem',
                                                        fontWeight: 700,
                                                        color: 'white'
                                                    }}>
                                                        {item.price}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                style={{
                                                    background: 'rgba(255, 0, 0, 0.1)',
                                                    border: 'none',
                                                    borderRadius: '0.5rem',
                                                    width: '36px',
                                                    height: '36px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    flexShrink: 0
                                                }}
                                                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 0, 0, 0.2)'}
                                                onMouseLeave={(e) => e.target.style.background = 'rgba(255, 0, 0, 0.1)'}
                                            >
                                                <Trash2 size={16} color="#ff4444" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div style={{
                                padding: '1.5rem 2rem',
                                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                                background: 'rgba(0, 0, 0, 0.5)'
                            }}>
                                {/* Total */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '1.5rem'
                                }}>
                                    <span style={{
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        color: 'rgba(255, 255, 255, 0.7)'
                                    }}>
                                        Total
                                    </span>
                                    <span style={{
                                        fontSize: '1.8rem',
                                        fontWeight: 800,
                                        color: 'white'
                                    }}>
                                        ₹{getCartTotal().toLocaleString()}
                                    </span>
                                </div>

                                {/* Checkout Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                        setIsCartOpen(false);
                                        onCheckout && onCheckout();
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: '1.2rem',
                                        background: 'linear-gradient(135deg, #8A2BE2 0%, #6A1BB2 100%)',
                                        border: 'none',
                                        borderRadius: '3rem',
                                        color: 'white',
                                        fontSize: '1rem',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        letterSpacing: '1px',
                                        textTransform: 'uppercase',
                                        boxShadow: '0 10px 30px rgba(138, 43, 226, 0.3)'
                                    }}
                                >
                                    Proceed to Checkout
                                </motion.button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Cart;
