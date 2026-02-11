import React, { useState, useEffect } from 'react'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductSection from './components/ProductSection'
import MirrorCarousel from './components/MirrorCarousel'
import ProductSlider from './components/ProductSlider'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import ProductDetail from './components/ProductDetail'
import AboutUs from './components/AboutUs'
import AllProducts from './components/AllProducts'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import AdminDashboard from './components/AdminDashboard'
import AdminLogin from './components/AdminLogin'
import logoImg from './assets/logo.png'
import { allProducts } from './data/products'

function App() {
    const [currentPage, setCurrentPage] = useState('home');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('admin') === 'true') {
            setCurrentPage('admin');
        }
    }, []);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(
        sessionStorage.getItem('isAdminAuthenticated') === 'true'
    );

    const handleAdminLogin = (token) => {
        setIsAdminAuthenticated(true);
        sessionStorage.setItem('isAdminAuthenticated', 'true');
    };

    const handleAdminLogout = () => {
        setIsAdminAuthenticated(false);
        sessionStorage.removeItem('isAdminAuthenticated');
        setCurrentPage('home');
    };

    const handleProductView = (productId) => {
        setSelectedProduct(productId);
        setCurrentPage('product-detail');
    };


    const handleNavigate = (page, sectionId = null) => {
        if (page === 'home' && currentPage === 'home' && sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
            return;
        }

        setCurrentPage(page);

        if (sectionId) {
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleBackToHome = () => {
        setSelectedProduct(null);
        handleNavigate('home');
    };

    return (
        <CartProvider>
            <main style={{ backgroundColor: 'var(--background)', minHeight: '100vh', width: '100%' }}>
                <Navbar onNavigate={handleNavigate} onProductView={handleProductView} />
                <Cart onCheckout={() => handleNavigate('checkout')} />

                {currentPage === 'home' ? (
                    <>
                        <Hero />
                        <ProductSection onProductView={handleProductView} />
                        <MirrorCarousel onProductView={handleProductView} />
                        <ProductSlider onProductView={handleProductView} />
                        <FAQ />
                    </>
                ) : currentPage === 'product-detail' ? (
                    <ProductDetail productId={selectedProduct} onBack={handleBackToHome} onProductView={handleProductView} />
                ) : currentPage === 'about' ? (
                    <AboutUs onNavigate={handleNavigate} />
                ) : currentPage === 'products' ? (
                    <AllProducts onProductView={handleProductView} />
                ) : currentPage === 'checkout' ? (
                    <Checkout onBack={() => handleNavigate('home')} />
                ) : currentPage === 'admin' ? (
                    isAdminAuthenticated ? (
                        <AdminDashboard onBack={handleAdminLogout} />
                    ) : (
                        <AdminLogin onLogin={handleAdminLogin} onBack={() => handleNavigate('home')} />
                    )
                ) : (
                    <Contact />
                )}


                <footer style={{ padding: '4rem 10%', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                    <div onClick={() => handleNavigate('home')} style={{ cursor: 'pointer' }}>
                        <img src={logoImg} alt="Buss Ek Puff Logo" style={{ height: '50px' }} />
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>© 2026 BUSS EK PUFF. ALL RIGHTS RESERVED.</div>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <a onClick={() => handleNavigate('admin')} className="nav-link" style={{ fontSize: '0.7rem', opacity: 0.3 }}>ADMIN</a>
                        <a href="https://wa.me/919334807758" target="_blank" rel="noopener noreferrer" className="nav-link">WHATSAPP</a>
                        <a href="#" className="nav-link">INSTAGRAM</a>
                    </div>
                </footer>
            </main>
        </CartProvider>
    )
}

export default App
