import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import logoImg from '../assets/logo.png';

import API_URL from '../config';

const AdminLogin = ({ onLogin, onBack }) => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                onLogin(data.token);
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('Connection failed. Is the server running?');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#050505',
            padding: '2rem',
            fontFamily: '"Outfit", sans-serif',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Effects */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '20%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(138, 43, 226, 0.15) 0%, transparent 70%)',
                filter: 'blur(80px)',
                zIndex: 0
            }} />
            <div style={{
                position: 'absolute',
                bottom: '20%',
                right: '20%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(75, 0, 130, 0.1) 0%, transparent 70%)',
                filter: 'blur(80px)',
                zIndex: 0
            }} />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    width: '100%',
                    maxWidth: '450px',
                    position: 'relative',
                    zIndex: 10
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <img src={logoImg} alt="Logo" style={{ height: '60px', marginBottom: '2rem' }} />
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>Admin Access</h1>
                    <p style={{ color: 'rgba(255,255,255,0.5)' }}>Please enter your credentials to manage orders</p>
                </div>

                <div style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '2.5rem',
                    padding: '3rem'
                }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <LoginInput
                            label="Email Address"
                            icon={<Mail size={20} />}
                            type="email"
                            value={formData.username}
                            onChange={(val) => setFormData({ ...formData, username: val })}
                            placeholder="admin@puff.com"
                        />

                        <LoginInput
                            label="Password"
                            icon={<Lock size={20} />}
                            type="password"
                            value={formData.password}
                            onChange={(val) => setFormData({ ...formData, password: val })}
                            placeholder="••••••••••••"
                        />


                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{
                                    padding: '1rem',
                                    background: 'rgba(255, 68, 68, 0.1)',
                                    border: '1px solid #ff4444',
                                    borderRadius: '1rem',
                                    color: '#ff4444',
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <AlertCircle size={18} /> {error}
                            </motion.div>
                        )}

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            style={{
                                padding: '1.2rem',
                                background: 'linear-gradient(135deg, #8A2BE2 0%, #6A1BB2 100%)',
                                border: 'none',
                                borderRadius: '1rem',
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '1rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '1rem',
                                marginTop: '1rem',
                                transition: 'all 0.3s'
                            }}
                        >
                            {isLoading ? 'Verifying...' : (
                                <>
                                    <ShieldCheck size={20} /> Login to Dashboard
                                </>
                            )}
                        </motion.button>
                    </form>

                    <button
                        onClick={onBack}
                        style={{
                            width: '100%',
                            background: 'none',
                            border: 'none',
                            color: 'rgba(255,255,255,0.4)',
                            marginTop: '2rem',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        Return to Store
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

const LoginInput = ({ label, icon, value, onChange, placeholder, type = 'text' }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div style={{ position: 'relative' }}>
            <label style={{
                display: 'block',
                fontSize: '0.8rem',
                color: isFocused ? '#8A2BE2' : 'rgba(255,255,255,0.4)',
                marginBottom: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s'
            }}>
                {label}
            </label>
            <div style={{ position: 'relative' }}>
                <div style={{
                    position: 'absolute',
                    left: '1.2rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: isFocused ? '#8A2BE2' : 'rgba(255,255,255,0.3)',
                    transition: 'all 0.3s',
                    zIndex: 1
                }}>
                    {icon}
                </div>
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    style={{
                        width: '100%',
                        padding: '1.2rem 1.2rem 1.2rem 3.5rem',
                        background: 'rgba(255,255,255,0.03)',
                        border: `1px solid ${isFocused ? '#8A2BE2' : 'rgba(255,255,255,0.1)'}`,
                        borderRadius: '1.2rem',
                        color: 'white',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s',
                        fontFamily: '"Outfit", sans-serif'
                    }}
                />
            </div>
        </div>
    );
};

export default AdminLogin;
