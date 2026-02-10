import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductSection from './components/ProductSection'
import Contact from './components/Contact'
import logoImg from './assets/logo.png'

function App() {
    const [currentPage, setCurrentPage] = useState('home');

    return (
        <main style={{ backgroundColor: 'var(--background)', minHeight: '100vh', width: '100%' }}>
            <Navbar onNavigate={setCurrentPage} />

            {currentPage === 'home' ? (
                <>
                    <Hero />
                    <ProductSection />
                </>
            ) : (
                <Contact />
            )}


            <footer style={{ padding: '4rem 10%', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                <div onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer' }}>
                    <img src={logoImg} alt="Buss Ek Puff Logo" style={{ height: '50px' }} />
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>© 2026 BUSS EK PUFF. ALL RIGHTS RESERVED.</div>
                <div style={{ display: 'flex', gap: '2rem' }}>
                    <a href="#" className="nav-link">INSTAGRAM</a>
                    <a href="#" className="nav-link">TWITTER</a>
                </div>
            </footer>
        </main>
    )
}

export default App
