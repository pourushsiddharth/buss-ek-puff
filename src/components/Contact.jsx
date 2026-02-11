import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import contactBg from '../assets/contactus_bg.png';
import './Contact.css';

const Contact = () => {
    const whatsappNumber = '919334807758';
    const whatsappMessage = 'Hi! I would like to know more about your products.';
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <section className="contact-section" style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%), url(${contactBg})`,
        }}>

            <div className="contact-container">
                {/* Contact Info */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="contact-label">
                        GET IN TOUCH
                    </span>
                    <h1 className="contact-heading">
                        LET'S START A <br />
                        <span className="text-gradient">CONVERSATION</span>
                    </h1>
                    <p className="contact-description">
                        Have questions about our premium collection? Our experts are here to help you find the perfect experience.
                    </p>

                    <div className="contact-details">
                        <div className="contact-item">
                            <div className="glass contact-icon-wrapper">
                                <Mail size={20} color="var(--accent)" />
                            </div>
                            <div>
                                <div className="contact-item-label">EMAIL US</div>
                                <div className="contact-item-value">hello@bussekpuff.com</div>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="glass contact-icon-wrapper">
                                <Phone size={20} color="var(--accent)" />
                            </div>
                            <div>
                                <div className="contact-item-label">CALL US</div>
                                <div className="contact-item-value">+91 93348 07758</div>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="glass contact-icon-wrapper">
                                <MapPin size={20} color="var(--accent)" />
                            </div>
                            <div>
                                <div className="contact-item-label">VISIT US</div>
                                <div className="contact-item-value">Downtown Luxury St, NY 10001</div>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="glass contact-icon-wrapper" style={{ background: 'rgba(37, 211, 102, 0.1)' }}>
                                <MessageCircle size={20} color="#25D366" />
                            </div>
                            <div>
                                <div className="contact-item-label">WHATSAPP</div>
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-item-value"
                                    style={{
                                        color: '#25D366',
                                        textDecoration: 'none',
                                        transition: 'opacity 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                                    onMouseLeave={(e) => e.target.style.opacity = '1'}
                                >
                                    Chat with us
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="glass contact-form-container"
                >
                    <form className="contact-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">FIRST NAME</label>
                                <input type="text" placeholder="John" className="form-input" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">LAST NAME</label>
                                <input type="text" placeholder="Doe" className="form-input" />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">EMAIL ADDRESS</label>
                                <input type="email" placeholder="john@example.com" className="form-input" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">PHONE NUMBER</label>
                                <input type="tel" placeholder="+1 (555) 000-0000" className="form-input" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">MESSAGE</label>
                            <textarea rows="4" placeholder="How can we help you?" className="form-textarea"></textarea>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="submit-button"
                        >
                            SEND MESSAGE <Send size={18} />
                        </motion.button>
                    </form>
                </motion.div>
            </div>

            {/* Floating WhatsApp Button */}
            <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5, type: "spring" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(37, 211, 102, 0.4)',
                    cursor: 'pointer',
                    zIndex: 1000,
                    border: 'none',
                    textDecoration: 'none'
                }}
            >
                <MessageCircle size={28} color="white" />
            </motion.a>
        </section>
    );
};

export default Contact;
