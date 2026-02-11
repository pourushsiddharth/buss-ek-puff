import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    ShoppingBag,
    Clock,
    CheckCircle,
    Search,
    Filter,
    ChevronDown,
    Eye,
    RefreshCw,
    User,
    Mail,
    Phone,
    Calendar,
    ArrowLeft,
    Check,
    Plus,
    Edit2,
    Trash2,
    Package,
    Image,
    Save,
    X,
    XCircle,
    Star
} from 'lucide-react';
import API_URL from '../config';

const AdminDashboard = ({ onBack }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    // Product Management State
    const [view, setView] = useState('orders'); // 'orders' or 'products'
    const [products, setProducts] = useState([]);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productFormData, setProductFormData] = useState({
        product_id: '',
        title: '',
        category: '',
        price: '',
        original_price: '',
        rating: 4.5,
        reviews: 0,
        description: '',
        type: 'Vape',
        image_path: 'product1.png',
        bg_path: 'product1_bg.png',
        is_featured: false,
        cover_image_path: '',
        features: [],
        specifications: {}
    });

    useEffect(() => {
        if (view === 'orders') {
            fetchOrders();
        } else if (view === 'products') {
            fetchProducts();
        }
    }, [view]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/products`);
            if (response.ok) {
                const data = await response.json();
                setProducts(data.products);
                setError(null);
            }
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Failed to fetch products. Is the server running?');
        } finally {
            setLoading(false);
        }
    };


    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/orders`);
            if (!response.ok) throw new Error('Failed to fetch orders');
            const data = await response.json();
            setOrders(data.orders);
            setError(null);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Could not connect to the API. Make sure the server is running.');
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderNumber, newStatus) => {
        setIsUpdating(true);
        try {
            const response = await fetch(`${API_URL}/api/orders/${orderNumber}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) throw new Error('Failed to update status');

            // Update local state
            setOrders(orders.map(order =>
                order.order_number === orderNumber
                    ? { ...order, status: newStatus }
                    : order
            ));

            if (selectedOrder && selectedOrder.order_number === orderNumber) {
                setSelectedOrder({ ...selectedOrder, status: newStatus });
            }
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Failed to update order status');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleAddProduct = () => {
        setEditingProduct(null);
        setProductFormData({
            product_id: 'v' + Date.now(),
            title: '',
            category: 'PREMIUM VAPE',
            price: '₹2,499',
            original_price: '₹3,499',
            rating: 4.5,
            reviews: 0,
            description: '',
            type: 'Vape',
            image_path: 'product1.png',
            bg_path: 'product1_bg.png',
            is_featured: false,
            cover_image_path: '',
            features: [],
            specifications: {}
        });
        setIsProductModalOpen(true);
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setProductFormData({
            ...product,
            image_path: product.image_path || '',
            bg_path: product.bg_path || '',
            is_featured: product.is_featured || false,
            cover_image_path: product.cover_image_path || '',
            specifications: typeof product.specifications === 'string' ? JSON.parse(product.specifications) : (product.specifications || {}),
            features: typeof product.features === 'string' ? JSON.parse(product.features) : (product.features || [])
        });
        setIsProductModalOpen(true);
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            const response = await fetch(`${API_URL}/api/products/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setProducts(products.filter(p => p.id !== id));
            }
        } catch (err) {
            console.error('Error deleting product:', err);
        }
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        const url = editingProduct
            ? `${API_URL}/api/products/${editingProduct.id}`
            : `${API_URL}/api/products`;
        const method = editingProduct ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...productFormData,
                    id: editingProduct ? editingProduct.id : productFormData.product_id
                })
            });

            if (response.ok) {
                const data = await response.json();
                if (editingProduct) {
                    setProducts(products.map(p => p.id === editingProduct.id ? data.product : p));
                } else {
                    setProducts([data.product, ...products]);
                }
                setIsProductModalOpen(false);
            }
        } catch (err) {
            console.error('Error saving product:', err);
        }
    };

    const stats = {
        total: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        completed: orders.filter(o => o.status === 'delivered' || o.status === 'completed').length,
        revenue: orders.reduce((acc, curr) => acc + parseFloat(curr.total_amount), 0)
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer_email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const filteredProducts = products.filter(product => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
            product.title.toLowerCase().includes(term) ||
            product.category.toLowerCase().includes(term) ||
            product.type.toLowerCase().includes(term) ||
            product.price.toLowerCase().includes(term)
        );
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return '#FFA500';
            case 'whatsapp_pending': return '#25D366';
            case 'shipped': return '#3498db';
            case 'delivered':
            case 'completed': return '#2ecc71';
            case 'cancelled': return '#e74c3c';
            default: return '#95a5a6';
        }
    };

    const MaterialInput = ({ label, value, onChange, placeholder, type = 'text', multiline = false, rows = 3, required = false }) => {
        const [isFocused, setIsFocused] = useState(false);

        const inputStyle = {
            width: '100%',
            padding: '1.4rem 1rem 0.6rem',
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: `1.5px solid ${isFocused ? '#8A2BE2' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: '1.2rem',
            color: 'white',
            fontSize: '1rem',
            outline: 'none',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            fontFamily: '"Outfit", sans-serif',
            boxShadow: isFocused ? '0 0 15px rgba(138, 43, 226, 0.2)' : 'none',
        };

        return (
            <div style={{ position: 'relative', width: '100%', marginBottom: '0.5rem' }}>
                <span style={{
                    position: 'absolute',
                    left: '1rem',
                    top: isFocused || value ? '0.4rem' : '1.1rem',
                    fontSize: isFocused || value ? '0.75rem' : '1rem',
                    color: isFocused ? '#8A2BE2' : 'rgba(255,255,255,0.4)',
                    pointerEvents: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    fontWeight: isFocused || value ? 700 : 400,
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>
                    {label} {required && '*'}
                </span>
                {multiline ? (
                    <textarea
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder={isFocused ? placeholder : ''}
                        rows={rows}
                        style={{ ...inputStyle, resize: 'none' }}
                        required={required}
                    />
                ) : (
                    <input
                        type={type}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder={isFocused ? placeholder : ''}
                        style={inputStyle}
                        required={required}
                    />
                )}
            </div>
        );
    };

    const CustomSelect = ({ value, onChange, options, label, fullWidth = false }) => {
        const [isOpen, setIsOpen] = useState(false);
        const selectedOption = options.find(opt => opt.value === value) || options[0];

        return (
            <div style={{ position: 'relative', width: fullWidth ? '100%' : 'auto' }}>
                {label && <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', display: 'block' }}>{label}</label>}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        width: '100%',
                        padding: '0.8rem 1.2rem',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '0.75rem',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        outline: 'none',
                        gap: '1rem',
                        fontSize: '0.95rem'
                    }}
                >
                    <span style={{ fontWeight: 500 }}>{selectedOption.label}</span>
                    <ChevronDown size={18} style={{ opacity: 0.5, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <>
                            <div
                                style={{ position: 'fixed', inset: 0, zIndex: 10 }}
                                onClick={() => setIsOpen(false)}
                            />
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    right: 0,
                                    marginTop: '0.5rem',
                                    backgroundColor: '#1a1a1a',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '1rem',
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                                    zIndex: 11,
                                    overflow: 'hidden',
                                    minWidth: '200px'
                                }}
                            >
                                <div style={{ padding: '0.5rem' }}>
                                    {options.map(opt => (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => {
                                                onChange(opt.value);
                                                setIsOpen(false);
                                            }}
                                            style={{
                                                width: '100%',
                                                padding: '0.8rem 1rem',
                                                backgroundColor: value === opt.value ? 'rgba(138, 43, 226, 0.1)' : 'transparent',
                                                border: 'none',
                                                borderRadius: '0.5rem',
                                                color: value === opt.value ? '#8A2BE2' : 'white',
                                                textAlign: 'left',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                fontSize: '0.9rem',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (value !== opt.value) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                                            }}
                                            onMouseLeave={(e) => {
                                                if (value !== opt.value) e.currentTarget.style.backgroundColor = 'transparent';
                                            }}
                                        >
                                            {opt.label}
                                            {value === opt.value && <Check size={16} />}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    const ImageUpload = ({ label, currentPath, onUpload, fieldName }) => {
        const [isUploading, setIsUploading] = useState(false);

        const handleFileChange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            setIsUploading(true);
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await fetch(`${API_URL}/api/upload`, {
                    method: 'POST',
                    body: formData,
                });
                if (!response.ok) throw new Error('Upload failed');
                const data = await response.json();
                if (data.success) {
                    onUpload(data.imageUrl); // Store the /uploads/filename path
                } else {
                    alert('Upload failed: ' + data.error);
                }
            } catch (err) {
                console.error('Error uploading:', err);
                alert('Error uploading image');
            } finally {
                setIsUploading(false);
            }
        };

        const getPreviewUrl = (path) => {
            if (!path) return null;
            if (path.startsWith('http')) return path;
            if (path.startsWith('/uploads')) return `${API_URL}${path}`;
            // For existing assets in src/assets/ that are just filenames
            return `/src/assets/${path}`;
        };

        return (
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
                    {label}
                </label>
                <div style={{
                    display: 'flex',
                    gap: '1.5rem',
                    alignItems: 'center',
                    padding: '1.2rem',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    borderRadius: '1.2rem',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        borderRadius: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        {currentPath ? (
                            <img src={getPreviewUrl(currentPath)}
                                alt="preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        ) : <Image size={32} style={{ opacity: 0.2 }} />}
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginBottom: '0.8rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                            {currentPath ? currentPath.split('/').pop() : 'No image selected'}
                        </div>
                        <input
                            type="file"
                            id={`file-${fieldName}`}
                            onChange={handleFileChange}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                        <button
                            type="button"
                            onClick={() => document.getElementById(`file-${fieldName}`).click()}
                            style={{
                                padding: '0.7rem 1.2rem',
                                backgroundColor: 'rgba(138, 43, 226, 0.1)',
                                border: '1px solid rgba(138, 43, 226, 0.3)',
                                borderRadius: '0.8rem',
                                color: 'white',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                transition: 'all 0.2s',
                                outline: 'none'
                            }}
                            disabled={isUploading}
                        >
                            {isUploading ? <RefreshCw size={16} className="animate-spin" /> : <Plus size={16} />}
                            {currentPath ? 'Select New Image' : 'Choose Local File'}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    if (loading && orders.length === 0) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', color: 'white' }}>
                <RefreshCw className="animate-spin" size={48} />
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#050505', color: 'white', padding: '100px 5% 50px', fontFamily: '"Outfit", sans-serif' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', background: 'linear-gradient(135deg, #fff 0%, #8A2BE2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Admin Dashboard
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.5)' }}>Manage your orders and business growth</p>
                </div>
                <button
                    onClick={onBack}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <ArrowLeft size={18} /> Logout
                </button>
            </div>

            {error && (
                <div style={{ padding: '1rem', backgroundColor: 'rgba(231, 76, 60, 0.1)', border: '1px solid #e74c3c', borderRadius: '1rem', color: '#e74c3c', marginBottom: '2rem' }}>
                    {error}
                </div>
            )}

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <button
                    onClick={() => setView('orders')}
                    style={{
                        padding: '1rem 2rem',
                        borderRadius: '1rem',
                        background: view === 'orders' ? 'rgba(138, 43, 226, 0.2)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${view === 'orders' ? '#8A2BE2' : 'rgba(255,255,255,0.05)'}`,
                        color: view === 'orders' ? '#8A2BE2' : 'white',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}
                >
                    <ShoppingBag size={20} /> Orders
                </button>
                <button
                    onClick={() => setView('products')}
                    style={{
                        padding: '1rem 2rem',
                        borderRadius: '1rem',
                        background: view === 'products' ? 'rgba(138, 43, 226, 0.2)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${view === 'products' ? '#8A2BE2' : 'rgba(255,255,255,0.05)'}`,
                        color: view === 'products' ? '#8A2BE2' : 'white',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}
                >
                    <Package size={20} /> Inventory
                </button>
                {view === 'products' && (
                    <button
                        onClick={handleAddProduct}
                        style={{
                            marginLeft: 'auto',
                            padding: '1rem 2rem',
                            borderRadius: '1rem',
                            background: 'linear-gradient(135deg, #8A2BE2 0%, #6A1BB2 100%)',
                            border: 'none',
                            color: 'white',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                        }}
                    >
                        <Plus size={20} /> Add Product
                    </button>
                )}
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <StatCard icon={<ShoppingBag color="#8A2BE2" />} label="Total Orders" value={stats.total} />
                <StatCard icon={<Clock color="#FFA500" />} label="Pending" value={stats.pending} />
                <StatCard icon={<CheckCircle color="#2ecc71" />} label="Completed" value={stats.completed} />
                <StatCard icon={<Package color="#3498db" />} label="Total Products" value={products.length} />
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                    <input
                        type="text"
                        placeholder={view === 'orders' ? "Search by order #, name or email..." : "Search by product name, category..."}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 3rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', color: 'white' }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <CustomSelect
                        value={statusFilter}
                        onChange={setStatusFilter}
                        options={[
                            { value: 'all', label: 'All Status' },
                            { value: 'pending', label: 'Pending' },
                            { value: 'whatsapp_pending', label: 'WhatsApp Pending' },
                            { value: 'shipped', label: 'Shipped' },
                            { value: 'delivered', label: 'Delivered' },
                            { value: 'cancelled', label: 'Cancelled' }
                        ]}
                    />
                    <button
                        onClick={view === 'orders' ? fetchOrders : fetchProducts}
                        style={{ padding: '0.8rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', color: 'white', cursor: 'pointer' }}
                    >
                        <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
                    </button>
                </div>
            </div>

            {/* Conditional Table View */}
            {view === 'orders' ? (
                <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <tr>
                                <th style={{ padding: '1.5rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Order #</th>
                                <th style={{ padding: '1.5rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Customer</th>
                                <th style={{ padding: '1.5rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Date</th>
                                <th style={{ padding: '1.5rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Total</th>
                                <th style={{ padding: '1.5rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Status</th>
                                <th style={{ padding: '1.5rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ padding: '4rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>
                                        No orders found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map(order => (
                                    <tr key={order.order_number} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.01)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                        <td style={{ padding: '1.2rem 1.5rem', fontWeight: 700 }}>{order.order_number}</td>
                                        <td style={{ padding: '1.2rem 1.5rem' }}>
                                            <div style={{ fontWeight: 600 }}>{order.customer_name}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>{order.customer_email}</div>
                                        </td>
                                        <td style={{ padding: '1.2rem 1.5rem', color: 'rgba(255,255,255,0.7)' }}>
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </td>
                                        <td style={{ padding: '1.2rem 1.5rem', fontWeight: 700 }}>₹{parseFloat(order.total_amount).toLocaleString()}</td>
                                        <td style={{ padding: '1.2rem 1.5rem' }}>
                                            <span style={{
                                                padding: '0.4rem 0.8rem',
                                                borderRadius: '2rem',
                                                fontSize: '0.75rem',
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                backgroundColor: `${getStatusColor(order.status)}20`,
                                                color: getStatusColor(order.status),
                                                border: `1px solid ${getStatusColor(order.status)}40`
                                            }}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1.2rem 1.5rem' }}>
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                style={{ background: 'none', border: 'none', color: '#8A2BE2', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}
                                            >
                                                <Eye size={18} /> View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <tr>
                                <th style={{ padding: '1.5rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Product</th>
                                <th style={{ padding: '1.5rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Category</th>
                                <th style={{ padding: '1.5rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Price</th>
                                <th style={{ padding: '1.5rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Rating</th>
                                <th style={{ padding: '1.5rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ padding: '4rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>
                                        No products found.
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map(product => (
                                    <tr key={product.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.3s' }}>
                                        <td style={{ padding: '1.2rem 1.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Package size={20} color="#8A2BE2" />
                                                </div>
                                                <div style={{ fontWeight: 700 }}>{product.title}</div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1.2rem 1.5rem', color: 'rgba(255,255,255,0.5)' }}>{product.category}</td>
                                        <td style={{ padding: '1.2rem 1.5rem', fontWeight: 700 }}>{product.price}</td>
                                        <td style={{ padding: '1.2rem 1.5rem' }}>{product.rating} ⭐ ({product.reviews})</td>
                                        <td style={{ padding: '1.2rem 1.5rem' }}>
                                            <div style={{ display: 'flex', gap: '1rem' }}>
                                                <button onClick={() => handleEditProduct(product)} style={{ background: 'none', border: 'none', color: '#8A2BE2', cursor: 'pointer' }}><Edit2 size={18} /></button>
                                                <button onClick={() => handleDeleteProduct(product.id)} style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer' }}><Trash2 size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}


            {/* Order Detail Modal */}
            <AnimatePresence>
                {selectedOrder && (
                    <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedOrder(null)}
                            style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            style={{ position: 'relative', width: '100%', maxWidth: '800px', maxHeight: '90vh', backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                        >
                            {/* Modal Header */}
                            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Order {selectedOrder.order_number}</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>Placed on {new Date(selectedOrder.created_at).toLocaleString()}</p>
                                </div>
                                <button onClick={() => setSelectedOrder(null)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
                                    <XCircle size={24} />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div style={{ padding: '2rem', overflowY: 'auto', flex: 1 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
                                    <div>
                                        <h4 style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Customer Info</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={16} color="#8A2BE2" /> {selectedOrder.customer_name}</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={16} color="#8A2BE2" /> {selectedOrder.customer_email}</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={16} color="#8A2BE2" /> {selectedOrder.customer_phone}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Order Status</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            <CustomSelect
                                                value={selectedOrder.status}
                                                onChange={(val) => updateOrderStatus(selectedOrder.order_number, val)}
                                                fullWidth
                                                options={[
                                                    { value: 'pending', label: 'Pending' },
                                                    { value: 'whatsapp_pending', label: 'WhatsApp Pending' },
                                                    { value: 'shipped', label: 'Shipped' },
                                                    { value: 'delivered', label: 'Delivered' },
                                                    { value: 'cancelled', label: 'Cancelled' }
                                                ]}
                                            />
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>
                                                <Clock size={14} /> Last updated: {new Date(selectedOrder.updated_at).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h4 style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Items Ordered</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                                    {selectedOrder.items.map((item, idx) => (
                                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ width: '50px', height: '50px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <ShoppingBag size={24} color="#8A2BE2" />
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 600 }}>{item.title}</div>
                                                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Qty: {item.quantity} × {item.price}</div>
                                                </div>
                                            </div>
                                            <div style={{ fontWeight: 700 }}>
                                                ₹{(parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity).toLocaleString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <div style={{ color: 'rgba(255,255,255,0.5)' }}>Payment Method: <span style={{ color: 'white', fontWeight: 600 }}>Cash on Delivery</span></div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.25rem' }}>Final Amount</div>
                                        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#8A2BE2' }}>₹{parseFloat(selectedOrder.total_amount).toLocaleString()}</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Product Add/Edit Modal */}
            <AnimatePresence>
                {isProductModalOpen && (
                    <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsProductModalOpen(false)}
                            style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            style={{ position: 'relative', width: '100%', maxWidth: '800px', maxHeight: '90vh', backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                        >
                            {/* Modal Header */}
                            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                                <button onClick={() => setIsProductModalOpen(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
                                    <XCircle size={24} />
                                </button>
                            </div>

                            {/* Modal Form */}
                            <form onSubmit={handleProductSubmit} style={{ padding: '2rem', overflowY: 'auto', flex: 1 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                    {/* Row 1 */}
                                    <div style={{ gridColumn: '1 / -1' }}>
                                        <MaterialInput
                                            label="Product Title"
                                            value={productFormData.title}
                                            onChange={(val) => setProductFormData({ ...productFormData, title: val })}
                                            placeholder="Enter product name"
                                            required
                                        />
                                    </div>

                                    {/* Row 2 */}
                                    <MaterialInput
                                        label="Category"
                                        value={productFormData.category}
                                        onChange={(val) => setProductFormData({ ...productFormData, category: val })}
                                        placeholder="e.g. PREMIUM VAPE"
                                        required
                                    />
                                    <MaterialInput
                                        label="Price"
                                        value={productFormData.price}
                                        onChange={(val) => setProductFormData({ ...productFormData, price: val })}
                                        placeholder="e.g. ₹2,499"
                                        required
                                    />

                                    {/* Row 3 */}
                                    <div style={{ zIndex: 50 }}>
                                        <CustomSelect
                                            label="Product Type"
                                            value={productFormData.type}
                                            onChange={(val) => setProductFormData({ ...productFormData, type: val })}
                                            fullWidth
                                            options={[
                                                { value: 'Vape', label: 'Vape' },
                                                { value: 'Hookah', label: 'Hookah' }
                                            ]}
                                        />
                                    </div>
                                    <MaterialInput
                                        label="Initial Rating"
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="5"
                                        value={productFormData.rating}
                                        onChange={(val) => setProductFormData({ ...productFormData, rating: val })}
                                    />

                                    {/* Row 4 */}
                                    <div style={{ gridColumn: '1 / -1' }}>
                                        <MaterialInput
                                            label="Description"
                                            value={productFormData.description}
                                            onChange={(val) => setProductFormData({ ...productFormData, description: val })}
                                            multiline
                                            rows={4}
                                            placeholder="Write a compelling product description..."
                                        />
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', gridColumn: '1 / -1' }}>
                                        <ImageUpload
                                            label="Product Image"
                                            currentPath={productFormData.image_path}
                                            onUpload={(url) => setProductFormData({ ...productFormData, image_path: url })}
                                            fieldName="image_path"
                                        />
                                        <ImageUpload
                                            label="Background Image"
                                            currentPath={productFormData.bg_path}
                                            onUpload={(url) => setProductFormData({ ...productFormData, bg_path: url })}
                                            fieldName="bg_path"
                                        />
                                    </div>

                                    {/* Featured Product Logic */}
                                    <div style={{ gridColumn: '1 / -1', padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: productFormData.is_featured ? '1.5rem' : '0' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: productFormData.is_featured ? 'rgba(138, 43, 226, 0.2)' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
                                                    <Star size={20} color={productFormData.is_featured ? '#8A2BE2' : 'rgba(255,255,255,0.3)'} fill={productFormData.is_featured ? '#8A2BE2' : 'none'} />
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 700, fontSize: '1rem' }}>Featured Product</div>
                                                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Show this product in the Hero Carousel</div>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setProductFormData({ ...productFormData, is_featured: !productFormData.is_featured })}
                                                style={{
                                                    width: '50px',
                                                    height: '26px',
                                                    borderRadius: '13px',
                                                    backgroundColor: productFormData.is_featured ? '#8A2BE2' : 'rgba(255,255,255,0.1)',
                                                    position: 'relative',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s'
                                                }}
                                            >
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '3px',
                                                    left: productFormData.is_featured ? '27px' : '3px',
                                                    width: '20px',
                                                    height: '20px',
                                                    borderRadius: '50%',
                                                    backgroundColor: 'white',
                                                    transition: 'all 0.3s',
                                                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                                                }} />
                                            </button>
                                        </div>

                                        {productFormData.is_featured && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                style={{ overflow: 'hidden' }}
                                            >
                                                <div style={{ paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                                    <ImageUpload
                                                        label="Hero Cover Image (Transparent background recommended)"
                                                        currentPath={productFormData.cover_image_path}
                                                        onUpload={(url) => setProductFormData({ ...productFormData, cover_image_path: url })}
                                                        fieldName="cover_image_path"
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>

                                {/* Features Section */}
                                <div style={{ marginTop: '2.5rem' }}>
                                    <h4 style={{ fontSize: '0.9rem', color: '#8A2BE2', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ width: '20px', height: '2px', backgroundColor: '#8A2BE2' }}></div> Product Features
                                    </h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                        {(productFormData.features || []).map((feature, idx) => (
                                            <div key={idx} style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                padding: '0.5rem 1rem',
                                                backgroundColor: 'rgba(138, 43, 226, 0.1)',
                                                border: '1px solid rgba(138, 43, 226, 0.2)',
                                                borderRadius: '2rem',
                                                color: 'white',
                                                fontSize: '0.85rem'
                                            }}>
                                                {feature}
                                                <XCircle
                                                    size={14}
                                                    style={{ cursor: 'pointer', opacity: 0.6 }}
                                                    onClick={() => {
                                                        const newFeatures = productFormData.features.filter((_, i) => i !== idx);
                                                        setProductFormData({ ...productFormData, features: newFeatures });
                                                    }}
                                                />
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const feat = window.prompt('Enter new feature:');
                                                if (feat) {
                                                    setProductFormData({
                                                        ...productFormData,
                                                        features: [...(productFormData.features || []), feat]
                                                    });
                                                }
                                            }}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                backgroundColor: 'rgba(255,255,255,0.05)',
                                                border: '1px dashed rgba(255,255,255,0.2)',
                                                borderRadius: '2rem',
                                                color: 'rgba(255,255,255,0.6)',
                                                cursor: 'pointer',
                                                fontSize: '0.85rem'
                                            }}
                                        >
                                            + Add Feature
                                        </button>
                                    </div>
                                </div>

                                {/* Specifications Section */}
                                <div style={{ marginTop: '2.5rem' }}>
                                    <h4 style={{ fontSize: '0.9rem', color: '#8A2BE2', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ width: '20px', height: '2px', backgroundColor: '#8A2BE2' }}></div> Product Specifications
                                    </h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                                        {Object.entries(productFormData.specifications || {}).map(([key, value]) => (
                                            <div key={key} style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '1.25rem',
                                                backgroundColor: 'rgba(255,255,255,0.02)',
                                                borderRadius: '1.25rem',
                                                border: '1px solid rgba(255,255,255,0.05)',
                                                transition: 'all 0.3s'
                                            }}>
                                                <div>
                                                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>{key}</div>
                                                    <div style={{ fontWeight: 600, color: 'white' }}>{value}</div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newSpecs = { ...productFormData.specifications };
                                                        delete newSpecs[key];
                                                        setProductFormData({ ...productFormData, specifications: newSpecs });
                                                    }}
                                                    style={{ background: 'rgba(255,71,87,0.1)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#ff4757', transition: 'all 0.2s' }}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const key = window.prompt('Enter specification name (e.g. Battery):');
                                                if (!key) return;
                                                const value = window.prompt(`Enter value for ${key}:`);
                                                if (value) {
                                                    setProductFormData({
                                                        ...productFormData,
                                                        specifications: {
                                                            ...(productFormData.specifications || {}),
                                                            [key]: value
                                                        }
                                                    });
                                                }
                                            }}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: '1.5rem',
                                                backgroundColor: 'rgba(138, 43, 226, 0.02)',
                                                border: '1px dashed rgba(138, 43, 226, 0.3)',
                                                borderRadius: '1.25rem',
                                                color: '#8A2BE2',
                                                cursor: 'pointer',
                                                fontSize: '0.9rem',
                                                fontWeight: 600,
                                                gap: '0.5rem',
                                                transition: 'all 0.3s'
                                            }}
                                        >
                                            <Plus size={20} />
                                            Add Specification
                                        </button>
                                    </div>
                                </div>

                                <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem' }}>
                                    <button
                                        type="button"
                                        onClick={() => setIsProductModalOpen(false)}
                                        style={{ flex: 1, padding: '1.2rem', backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1.2rem', color: 'white', fontWeight: 600, cursor: 'pointer' }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        style={{
                                            flex: 2,
                                            padding: '1.2rem',
                                            background: 'linear-gradient(135deg, #8A2BE2 0%, #6A1BB2 100%)',
                                            border: 'none',
                                            borderRadius: '1.2rem',
                                            color: 'white',
                                            fontWeight: 800,
                                            fontSize: '1rem',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.75rem',
                                            boxShadow: '0 10px 20px rgba(138, 43, 226, 0.3)'
                                        }}
                                    >
                                        <Save size={20} /> {editingProduct ? 'Update Product' : 'Create Product'}
                                    </button>
                                </div>
                            </form>

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

const StatCard = ({ icon, label, value }) => (
    <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '1.2rem', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
        </div>
        <div>
            <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.25rem' }}>{label}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{value}</div>
        </div>
    </div>
);

export default AdminDashboard;
