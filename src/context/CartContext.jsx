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
        // Create unique ID based on product ID + variation flavor if it exists
        const cartItemId = product.selectedVariation
            ? `${product.id}-${product.selectedVariation.flavor}`
            : product.id;

        // Use variation image if it exists, otherwise fallback to normalized product image
        const itemImage = product.selectedVariation && product.selectedVariation.image
            ? getImageUrl(product.selectedVariation.image)
            : getImageUrl(product.image_path || product.image);

        const normalizedProduct = {
            ...product,
            cartItemId,
            image: itemImage,
        };

        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.cartItemId === normalizedProduct.cartItemId);

            if (existingItem) {
                // Update quantity if item already exists
                return prevCart.map(item =>
                    item.cartItemId === normalizedProduct.cartItemId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Add new item with quantity 1
                return [...prevCart, { ...normalizedProduct, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (cartItemId) => {
        setCart(prevCart => prevCart.filter(item => item.cartItemId !== cartItemId && item.id !== cartItemId));
    };

    const updateQuantity = (cartItemId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(cartItemId);
            return;
        }

        setCart(prevCart =>
            prevCart.map(item =>
                (item.cartItemId === cartItemId || item.id === cartItemId)
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
