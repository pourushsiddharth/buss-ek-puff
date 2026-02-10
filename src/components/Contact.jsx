import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import contactBg from '../assets/contactus_bg.png';
import './Contact.css';

const Contact = () => {
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
                                <div className="contact-item-value">+1 (555) 123-4567</div>
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
        </section>
    );
};

export default Contact;
