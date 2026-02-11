import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, User, Mail, Phone, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Checkout = ({ onBack }) => {
    const { cart, getCartTotal, clearCart } = useCart();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');
    const [checkoutStep, setCheckoutStep] = useState('form'); // 'form' or 'options'

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setCheckoutStep('options');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const processOrder = async () => {
        setIsSubmitting(true);
        try {
            // Generate order number
            const orderNum = 'BEP' + Date.now().toString().slice(-8);

            // Prepare order data
            const orderData = {
                orderNumber: orderNum,
                customerName: formData.name,
                customerEmail: formData.email,
                customerPhone: formData.phone,
                items: cart.map(item => ({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity,
                    category: item.category
                })),
                totalAmount: getCartTotal(),
                status: 'pending',
                createdAt: new Date().toISOString()
            };

            // Submit order to API
            const response = await fetch('http://localhost:3001/api/submitOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit order');
            }

            // Success!
            setOrderNumber(orderNum);
            setOrderSuccess(true);
            clearCart();

        } catch (error) {
            console.error('Error submitting order:', error);
            setErrors({ submit: 'Failed to submit order. Please try again.' });
            setCheckoutStep('form');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleWhatsAppOrder = async () => {
        // We still want to record the order in our DB for tracking
        setIsSubmitting(true);
        try {
            const orderNum = 'BEP' + Date.now().toString().slice(-8);
            const orderData = {
                orderNumber: orderNum,
                customerName: formData.name,
                customerEmail: formData.email,
                customerPhone: formData.phone,
                items: cart.map(item => ({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity,
                    category: item.category
                })),
                totalAmount: getCartTotal(),
                status: 'whatsapp_pending',
                createdAt: new Date().toISOString()
            };

            // Submit to DB first
            await fetch('http://localhost:3001/api/submitOrder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            // Format WhatsApp Message
            const whatsappNumber = '911234567890'; // Replace with actual number if needed
            const itemsList = cart.map(item => `- ${item.title} (Qty: ${item.quantity})`).join('\n');
            const message = `*NEW ORDER - #${orderNum}*\n\n` +
                `*Customer Details:*\n` +
                `Name: ${formData.name}\n` +
                `Phone: ${formData.phone}\n\n` +
                `*Order Items:*\n${itemsList}\n\n` +
                `*Total Amount:* ₹${getCartTotal().toLocaleString()}\n\n` +
                `Please confirm my order.`;

            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');

            // Show success screen
            setOrderNumber(orderNum);
            setOrderSuccess(true);
            clearCart();
        } catch (error) {
            console.error('WhatsApp order error:', error);
            alert('Something went wrong. Please try normal checkout.');
            setCheckoutStep('form');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    if (orderSuccess) {
        return (
            <section style={{
                minHeight: '100vh',
                width: '100%',
                backgroundColor: '#000',
                padding: '120px 5% 80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: '"Outfit", sans-serif'
            }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                        maxWidth: '600px',
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '2rem',
                        padding: '3rem',
                        textAlign: 'center'
                    }}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                    >
                        <CheckCircle size={80} color="#4CAF50" style={{ marginBottom: '2rem' }} />
                    </motion.div>

                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        color: 'white',
                        marginBottom: '1rem'
                    }}>
                        Order Placed Successfully!
                    </h1>

                    <p style={{
                        fontSize: '1.1rem',
                        color: 'rgba(255, 255, 255, 0.6)',
                        marginBottom: '2rem'
                    }}>
                        Thank you for your order, {formData.name}!
                    </p>

                    <div style={{
                        background: 'rgba(138, 43, 226, 0.1)',
                        border: '1px solid rgba(138, 43, 226, 0.3)',
                        borderRadius: '1rem',
                        padding: '1.5rem',
                        marginBottom: '2rem'
                    }}>
                        <p style={{
                            fontSize: '0.9rem',
                            color: 'rgba(255, 255, 255, 0.5)',
                            marginBottom: '0.5rem'
                        }}>
                            Order Number
                        </p>
                        <p style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: '#8A2BE2'
                        }}>
                            {orderNumber}
                        </p>
                    </div>

                    <p style={{
                        fontSize: '0.95rem',
                        color: 'rgba(255, 255, 255, 0.6)',
                        marginBottom: '2rem',
                        lineHeight: 1.6
                    }}>
                        We've received your order and will contact you shortly at <strong style={{ color: 'white' }}>{formData.phone}</strong> to confirm the details.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onBack}
                        style={{
                            padding: '1.2rem 3rem',
                            background: 'linear-gradient(135deg, #8A2BE2 0%, #6A1BB2 100%)',
                            border: 'none',
                            borderRadius: '3rem',
                            color: 'white',
                            fontSize: '1rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            letterSpacing: '1px',
                            textTransform: 'uppercase'
                        }}
                    >
                        Continue Shopping
                    </motion.button>
                </motion.div>
            </section>
        );
    }

    return (
        <section style={{
            minHeight: '100vh',
            width: '100%',
            backgroundColor: '#000',
            padding: '120px 5% 80px',
            fontFamily: '"Outfit", sans-serif',
            position: 'relative'
        }}>
            {/* Background */}
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

            <div style={{
                position: 'relative',
                zIndex: 10,
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {/* Back Button */}
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
                        borderRadius: '2rem',
                        padding: '0.75rem 1.5rem',
                        color: 'white',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        marginBottom: '2rem',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                    onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
                >
                    <ArrowLeft size={18} />
                    Back
                </motion.button>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        textAlign: 'center',
                        marginBottom: '3rem'
                    }}
                >
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                        fontWeight: 900,
                        marginBottom: '1rem',
                        background: 'linear-gradient(135deg, #ffffff 0%, #8A2BE2 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-2px'
                    }}>
                        CHECKOUT
                    </h1>
                    <p style={{
                        fontSize: '1.1rem',
                        color: 'rgba(255, 255, 255, 0.6)'
                    }}>
                        Complete your order
                    </p>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: checkoutStep === 'options' ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    maxWidth: checkoutStep === 'options' ? '600px' : '1200px',
                    margin: '0 auto'
                }}>
                    {checkoutStep === 'options' ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '2rem',
                                padding: '3rem',
                                textAlign: 'center'
                            }}
                        >
                            <h2 style={{ color: 'white', fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Choose Ordering Option</h2>
                            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '3rem' }}>How would you like to place your order?</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {/* Normal Checkout */}
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={processOrder}
                                    disabled={isSubmitting}
                                    style={{
                                        padding: '1.5rem',
                                        background: 'linear-gradient(135deg, #8A2BE2 0%, #6A1BB2 100%)',
                                        border: 'none',
                                        borderRadius: '1.5rem',
                                        color: 'white',
                                        fontSize: '1.1rem',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '1rem',
                                        boxShadow: '0 10px 30px rgba(138, 43, 226, 0.3)'
                                    }}
                                >
                                    <Mail size={24} />
                                    Order via Website
                                </motion.button>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '0.5rem 0' }}>
                                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', fontWeight: 600 }}>OR</span>
                                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                                </div>

                                {/* WhatsApp Checkout */}
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleWhatsAppOrder}
                                    disabled={isSubmitting}
                                    style={{
                                        padding: '1.5rem',
                                        background: 'rgba(37, 211, 102, 0.1)',
                                        border: '2px solid #25D366',
                                        borderRadius: '1.5rem',
                                        color: '#25D366',
                                        fontSize: '1.1rem',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '1rem',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#25D366';
                                        e.currentTarget.style.color = 'white';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(37, 211, 102, 0.1)';
                                        e.currentTarget.style.color = '#25D366';
                                    }}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                    Order via WhatsApp
                                </motion.button>

                                <button
                                    onClick={() => setCheckoutStep('form')}
                                    style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '0.9rem', marginTop: '1rem' }}
                                >
                                    Go back to form
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <>
                            {/* Checkout Form */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '1.5rem',
                                    padding: '2rem'
                                }}
                            >
                                <h2 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 700,
                                    color: 'white',
                                    marginBottom: '1.5rem'
                                }}>
                                    Customer Details
                                </h2>

                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {/* Name Field */}
                                    <div>
                                        <label style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontSize: '0.9rem',
                                            fontWeight: 600,
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            marginBottom: '0.5rem'
                                        }}>
                                            <User size={16} />
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            style={{
                                                width: '100%',
                                                padding: '1rem',
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                border: `1px solid ${errors.name ? '#ff4444' : 'rgba(255, 255, 255, 0.1)'}`,
                                                borderRadius: '0.75rem',
                                                color: 'white',
                                                fontSize: '1rem',
                                                outline: 'none',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onFocus={(e) => {
                                                if (!errors.name) e.target.style.borderColor = 'rgba(138, 43, 226, 0.5)';
                                            }}
                                            onBlur={(e) => {
                                                if (!errors.name) e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                            }}
                                        />
                                        {errors.name && (
                                            <p style={{ color: '#ff4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email Field */}
                                    <div>
                                        <label style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontSize: '0.9rem',
                                            fontWeight: 600,
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            marginBottom: '0.5rem'
                                        }}>
                                            <Mail size={16} />
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            style={{
                                                width: '100%',
                                                padding: '1rem',
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                border: `1px solid ${errors.email ? '#ff4444' : 'rgba(255, 255, 255, 0.1)'}`,
                                                borderRadius: '0.75rem',
                                                color: 'white',
                                                fontSize: '1rem',
                                                outline: 'none',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onFocus={(e) => {
                                                if (!errors.email) e.target.style.borderColor = 'rgba(138, 43, 226, 0.5)';
                                            }}
                                            onBlur={(e) => {
                                                if (!errors.email) e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                            }}
                                        />
                                        {errors.email && (
                                            <p style={{ color: '#ff4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Phone Field */}
                                    <div>
                                        <label style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontSize: '0.9rem',
                                            fontWeight: 600,
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            marginBottom: '0.5rem'
                                        }}>
                                            <Phone size={16} />
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="9876543210"
                                            style={{
                                                width: '100%',
                                                padding: '1rem',
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                border: `1px solid ${errors.phone ? '#ff4444' : 'rgba(255, 255, 255, 0.1)'}`,
                                                borderRadius: '0.75rem',
                                                color: 'white',
                                                fontSize: '1rem',
                                                outline: 'none',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onFocus={(e) => {
                                                if (!errors.phone) e.target.style.borderColor = 'rgba(138, 43, 226, 0.5)';
                                            }}
                                            onBlur={(e) => {
                                                if (!errors.phone) e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                            }}
                                        />
                                        {errors.phone && (
                                            <p style={{ color: '#ff4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                                                {errors.phone}
                                            </p>
                                        )}
                                    </div>

                                    {errors.submit && (
                                        <div style={{
                                            padding: '1rem',
                                            background: 'rgba(255, 68, 68, 0.1)',
                                            border: '1px solid rgba(255, 68, 68, 0.3)',
                                            borderRadius: '0.75rem',
                                            color: '#ff4444',
                                            fontSize: '0.9rem'
                                        }}>
                                            {errors.submit}
                                        </div>
                                    )}

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={isSubmitting}
                                        style={{
                                            width: '100%',
                                            padding: '1.2rem',
                                            background: isSubmitting
                                                ? 'rgba(138, 43, 226, 0.5)'
                                                : 'linear-gradient(135deg, #8A2BE2 0%, #6A1BB2 100%)',
                                            border: 'none',
                                            borderRadius: '3rem',
                                            color: 'white',
                                            fontSize: '1rem',
                                            fontWeight: 700,
                                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                            letterSpacing: '1px',
                                            textTransform: 'uppercase',
                                            boxShadow: '0 10px 30px rgba(138, 43, 226, 0.3)'
                                        }}
                                    >
                                        {isSubmitting ? 'Placing Order...' : 'Place Order'}
                                    </motion.button>
                                </form>
                            </motion.div>

                            {/* Order Summary */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '1.5rem',
                                    padding: '2rem',
                                    height: 'fit-content'
                                }}
                            >
                                <h2 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 700,
                                    color: 'white',
                                    marginBottom: '1.5rem'
                                }}>
                                    Order Summary
                                </h2>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                                    {cart.map((item) => (
                                        <div key={item.id} style={{
                                            display: 'flex',
                                            gap: '1rem',
                                            padding: '1rem',
                                            background: 'rgba(255, 255, 255, 0.03)',
                                            borderRadius: '0.75rem'
                                        }}>
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                style={{
                                                    width: '60px',
                                                    height: '60px',
                                                    objectFit: 'contain',
                                                    borderRadius: '0.5rem',
                                                    background: 'rgba(255, 255, 255, 0.05)'
                                                }}
                                            />
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
                                                    fontSize: '0.85rem',
                                                    color: 'rgba(255, 255, 255, 0.5)'
                                                }}>
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>
                                            <div style={{
                                                fontSize: '1rem',
                                                fontWeight: 700,
                                                color: 'white'
                                            }}>
                                                {item.price}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div style={{
                                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                                    paddingTop: '1.5rem'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <span style={{
                                            fontSize: '1.3rem',
                                            fontWeight: 700,
                                            color: 'white'
                                        }}>
                                            Total
                                        </span>
                                        <span style={{
                                            fontSize: '2rem',
                                            fontWeight: 800,
                                            color: '#8A2BE2'
                                        }}>
                                            ₹{getCartTotal().toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Checkout;
