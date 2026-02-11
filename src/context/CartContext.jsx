import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('bussekpuff_cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (error) {
                console.error('Error loading cart from localStorage:', error);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('bussekpuff_cart', JSON.stringify(cart));
    }, [cart]);

    // Helper to resolve image path from database filenames
    const getImageUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http') || path.startsWith('/') || path.startsWith('data:')) return path;
        return `/assets/${path}`;
    };

    const addToCart = (product) => {
        // Normalize image path before adding to cart
        const normalizedProduct = {
            ...product,
            image: getImageUrl(product.image_path || product.image),
        };

        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === normalizedProduct.id);

            if (existingItem) {
                // Update quantity if item already exists
                return prevCart.map(item =>
                    item.id === normalizedProduct.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Add new item with quantity 1
                return [...prevCart, { ...normalizedProduct, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }

        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => {
            const price = parseInt(item.price.replace(/[^0-9]/g, ''));
            return total + (price * item.quantity);
        }, 0);
    };

    const getCartCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        isCartOpen,
        setIsCartOpen
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
