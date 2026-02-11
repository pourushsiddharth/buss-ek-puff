import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductSection from './components/ProductSection'
import MirrorCarousel from './components/MirrorCarousel'
import ProductSlider from './components/ProductSlider'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import ProductDetail from './components/ProductDetail'
import logoImg from './assets/logo.png'
import { allProducts } from './data/products'

function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductView = (productId) => {
        const product = allProducts.find(p => p.id === productId);
        setSelectedProduct(product);
        setCurrentPage('product-detail');
    };

    const handleBackToHome = () => {
        setSelectedProduct(null);
        setCurrentPage('home');
    };

    return (
        <main style={{ backgroundColor: 'var(--background)', minHeight: '100vh', width: '100%' }}>
            <Navbar onNavigate={setCurrentPage} onProductView={handleProductView} />

            {currentPage === 'home' ? (
                <>
                    <Hero />
                    <ProductSection onProductView={handleProductView} />
                    <MirrorCarousel onProductView={handleProductView} />
                    <ProductSlider onProductView={handleProductView} />
                    <FAQ />
                </>
            ) : currentPage === 'product-detail' ? (
                <ProductDetail product={selectedProduct} onBack={handleBackToHome} onProductView={handleProductView} />
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
