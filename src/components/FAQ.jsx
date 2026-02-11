import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQ_DATA = [
    {
        question: "What makes Buss Ek Puff vapes different?",
        answer: "Buss Ek Puff combines cutting-edge technology with premium craftsmanship. Our vapes offer superior flavor profiles, longer battery life, and a sleek, modern aesthetic that stands out from the rest."
    },
    {
        question: "Are your products authentic?",
        answer: "Yes, 100%. We source all our materials and products directly from authorized manufacturers. Every product comes with a unique verification code to ensure authenticity."
    },
    {
        question: "Do you offer international shipping?",
        answer: "Absolutely! We ship our premium vapes and accessories worldwide. Shipping times and costs vary depending on your location, which you can see at checkout."
    },
    {
        question: "How long does a single puff bar last?",
        answer: "Our standard disposables provide between 600 to 5000 puffs depending on the model. Heavy users might get 3-5 days, while casual users can enjoy them for up to 2 weeks."
    },
    {
        question: "What is the nicotine content in your vapes?",
        answer: "We offer a range of nicotine strengths from 0% (nicotine-free) up to 5% (50mg). Please check the product specifications for exact details on each model."
    },
    {
        question: "Can I return a product if I'm not satisfied?",
        answer: "For hygiene and safety reasons, we can only accept returns on unopened and unused products within 14 days of delivery. If a product is defective, we will provide a full replacement."
    },
    {
        question: "Do you have a physical store?",
        answer: "Currently, we operate exclusively online to provide the best prices and widest selection. However, we have partner retailers in select cities—check our 'Store Locator' for more info."
    },
    {
        question: "Are your products safe to use?",
        answer: "Safety is our top priority. All our products undergo rigorous testing and meet international safety standards. We advise using them responsibly and keeping them out of reach of children."
    },
    {
        question: "How can I track my order?",
        answer: "Once your order ships, you'll receive a confirmation email with a tracking number and a link to monitor your package's journey in real-time."
    },
    {
        question: "Do you offer wholesale opportunities?",
        answer: "Yes, we do! If you're interested in carrying Buss Ek Puff products in your shop, please reach out to our team via the contact form for wholesale pricing and terms."
    }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div
            style={{
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                padding: '1.5rem 0'
            }}
        >
            <button
                onClick={onClick}
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    fontSize: '1.2rem',
                    fontWeight: '500',
                    textAlign: 'left',
                    cursor: 'pointer',
                    gap: '1rem'
                }}
            >
                <span>{question}</span>
                {isOpen ? <Minus size={20} /> : <Plus size={20} />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                    >
                        <p style={{
                            color: 'rgba(255,255,255,0.6)',
                            marginTop: '1rem',
                            lineHeight: '1.6',
                            fontSize: '1rem'
                        }}>
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section style={{
            padding: '8rem 10%',
            backgroundColor: 'var(--background)',
            color: 'white'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 style={{
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: '800',
                    marginBottom: '3rem',
                    textAlign: 'center',
                    background: 'linear-gradient(to right, #fff, #666)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    FREQUENTLY ASKED QUESTIONS
                </h2>

                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    {FAQ_DATA.map((item, index) => (
                        <FAQItem
                            key={index}
                            question={item.question}
                            answer={item.answer}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default FAQ;
