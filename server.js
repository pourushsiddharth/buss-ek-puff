import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Multer Storage Configuration
// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer Storage Configuration
let storage;

if (process.env.NODE_ENV === 'production') {
    // Use Cloudinary for production
    storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'buss-ek-puff',
            allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        },
    });
} else {
    // Use Local Disk for development
    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/uploads/');
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        }
    });
}

const upload = multer({ storage: storage });

// Create a fresh transporter for each email send (avoids stale connections in serverless)
const createTransporter = () => {
    console.log('📧 Creating email transporter with:', {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        user: process.env.EMAIL_USER ? '✅ Set' : '❌ Missing',
        pass: process.env.EMAIL_PASS ? '✅ Set' : '❌ Missing',
    });
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT) || 465,
        secure: (parseInt(process.env.EMAIL_PORT) || 465) === 465,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
    });
};

const sendOrderEmails = async (order, req) => {
    if (!process.env.EMAIL_USER || !process.env.ADMIN_EMAIL) {
        console.log('⚠️ Email settings not configured in .env. Skipping notification.');
        return;
    }

    // Safely get items
    let items = [];
    try {
        items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
    } catch (e) {
        console.error('❌ Error parsing order items for email:', e);
        items = [];
    }

    const itemsHtml = Array.isArray(items) ? items.map(item => `
        <div style="padding: 10px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between;">
            <div>
                <strong style="color: #333;">${item.title}</strong><br/>
                <span style="color: #666; font-size: 0.9rem;">Quantity: ${item.quantity}</span>
            </div>
            <div style="font-weight: 700; color: #8A2BE2;">
                ${item.price}
            </div>
        </div>
    `).join('') : '<p>No items found</p>';

    // Determine base URL dynamically from request using referer or origin
    const defaultUrl = process.env.NODE_ENV === 'production' ? 'https://buss-ek-puff.vercel.app' : 'http://localhost:5173';
    const baseUrl = req.get('origin') || req.get('referer') || process.env.FRONTEND_URL || defaultUrl;
    // Remove trailing slash if present
    const cleanBaseUrl = baseUrl.replace(/\/$/, '');

    // 1. Admin Email Options
    const adminMailOptions = {
        from: `"Buss Ek Puff Orders" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `🚨 NEW ORDER RECEIVED: #${order.order_number}`,
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
                <div style="background: #8A2BE2; padding: 20px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 1.5rem;">New Order Received!</h1>
                </div>
                <div style="padding: 30px; background: #ffffff;">
                    <h2 style="color: #333; margin-top: 0;">Order #${order.order_number}</h2>
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        <p style="margin: 5px 0;"><strong>Customer:</strong> ${order.customer_name}</p>
                        <p style="margin: 5px 0;"><strong>Phone:</strong> ${order.customer_phone}</p>
                    </div>
                    <p style="color: #666; font-size: 1.1rem; line-height: 1.6;">
                        A new order has been successfully placed. Please check your admin dashboard for the complete details and to manage this order.
                    </p>
                    <div style="margin-top: 30px; text-align: center;">
                        <a href="${cleanBaseUrl}/?admin=true" style="background: #8A2BE2; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: 700;">View Dashboard</a>
                    </div>
                </div>
            </div>
        `,
    };

    // 2. Customer Email Options
    const customerMailOptions = {
        from: `"Buss Ek Puff" <${process.env.EMAIL_USER}>`,
        to: order.customer_email,
        subject: `Order Confirmation - #${order.order_number}`,
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
                <div style="background: #000000; padding: 30px; text-align: center;">
                    <h1 style="color: #8A2BE2; margin: 0; font-size: 2rem; letter-spacing: 2px;">BUSS EK PUFF</h1>
                    <p style="color: #ffffff; margin: 10px 0 0; font-weight: 300;">Premium Vape & Hookah Collection</p>
                </div>
                <div style="padding: 40px; background: #ffffff; text-align: center;">
                    <div style="color: #4CAF50; font-size: 4rem; margin-bottom: 20px;">✓</div>
                    <h2 style="color: #333; margin-bottom: 10px;">Order Confirmed!</h2>
                    <p style="color: #666; font-size: 1.1rem; line-height: 1.6;">Hi ${order.customer_name.split(' ')[0]}, thank you for shopping with us! We've received your order and are currently processing it.</p>
                    
                    <div style="margin: 30px 0; padding: 20px; border: 1px dashed #ccc; border-radius: 10px; display: inline-block;">
                        <span style="color: #999; font-size: 0.9rem; text-transform: uppercase;">Order Number</span><br/>
                        <span style="font-size: 1.8rem; font-weight: 800; color: #8A2BE2;">#${order.order_number}</span>
                    </div>

                    <div style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 30px;">
                        <p style="color: #333;"><strong>What's Next?</strong></p>
                        <p style="color: #666; font-size: 0.95rem;">Our team will contact you shortly to confirm the delivery details.</p>
                        <div style="margin-top: 20px;">
                            <a href="https://wa.me/919334807758?text=Hi, I just placed an order #${order.order_number}. I'd like to confirm the details." 
                               style="background: #25D366; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: 700; display: inline-flex; align-items: center; gap: 10px;">
                               Contact on WhatsApp
                            </a>
                        </div>
                    </div>

                    <div style="margin-top: 40px;">
                        <p style="color: #999; font-size: 0.8rem;">Thank you for choosing Buss Ek Puff</p>
                    </div>
                </div>
                <div style="background: #f7f7f7; padding: 20px; text-align: center; color: #aaa; font-size: 0.75rem;">
                    © 2026 BUSS EK PUFF. All Rights Reserved.
                </div>
            </div>
        `,
    };

    try {
        const transporter = createTransporter();
        console.log(`📧 Attempting to send emails for order #${order.order_number}...`);
        // Send to Admin
        await transporter.sendMail(adminMailOptions);
        console.log(`📧 Notification sent to Admin (${process.env.ADMIN_EMAIL})`);

        // Send to Customer
        await transporter.sendMail(customerMailOptions);
        console.log(`📧 Thank you mail sent to Customer (${order.customer_email})`);
    } catch (err) {
        console.error('❌ Failed to send emails:', err.message);
        console.error('❌ Full error:', JSON.stringify(err, Object.getOwnPropertyNames(err)));
    }
};

// Submit Order Endpoint
app.post('/api/submitOrder', async (req, res) => {
    console.error('🔵 [submitOrder] Endpoint hit');
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    let dbClosed = false;
    let emailSent = false;
    let emailError = null;
    try {
        const {
            orderNumber,
            customerName,
            customerEmail,
            customerPhone,
            items,
            totalAmount,
            status = 'pending'
        } = req.body;

        // Validate required fields
        if (!orderNumber || !customerName || !customerEmail || !customerPhone || !items || !totalAmount) {
            return res.status(400).json({
                error: 'Missing required fields',
                required: ['orderNumber', 'customerName', 'customerEmail', 'customerPhone', 'items', 'totalAmount']
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(customerEmail)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Validate phone format (10 digits)
        const phoneDigits = customerPhone.replace(/\D/g, '');
        if (phoneDigits.length !== 10) {
            return res.status(400).json({ error: 'Invalid phone number. Must be 10 digits.' });
        }

        // Connect to database
        await client.connect();
        console.error('🔵 [submitOrder] DB connected');

        // Insert order into database
        const query = `
            INSERT INTO orders (
                order_number,
                customer_name,
                customer_email,
                customer_phone,
                items,
                total_amount,
                status,
                created_at,
                updated_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
            RETURNING *;
        `;

        const values = [
            orderNumber,
            customerName,
            customerEmail,
            customerPhone,
            JSON.stringify(items),
            totalAmount,
            status
        ];

        const result = await client.query(query, values);
        const order = result.rows[0];

        console.error('🔵 [submitOrder] Order created:', order.order_number);

        // Close DB connection FIRST to free resources before email
        await client.end();
        dbClosed = true;
        console.error('🔵 [submitOrder] DB closed, sending emails...');

        // Send emails (must await on serverless - background tasks get killed)
        try {
            await sendOrderEmails(order, req);
            emailSent = true;
            console.error('🔵 [submitOrder] ✅ Emails sent!');
        } catch (emailErr) {
            emailError = emailErr.message;
            console.error('🔵 [submitOrder] ❌ Email failed:', emailErr.message);
            console.error('🔵 [submitOrder] ❌ Stack:', emailErr.stack);
        }

        // Return success response
        console.error('🔵 [submitOrder] Returning response, emailSent:', emailSent);
        return res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            orderNumber: order.order_number,
            orderId: order.id,
            emailSent,
            emailError
        });

    } catch (error) {
        console.error('❌ Error submitting order:', error);

        // Check for duplicate order number
        if (error.code === '23505') {
            return res.status(409).json({ error: 'Order number already exists' });
        }

        return res.status(500).json({
            error: 'Failed to submit order',
            message: error.message
        });

    } finally {
        if (!dbClosed) {
            await client.end();
        }
    }
});

// [Rest of endpoints...]
// Get All Orders Endpoint (for admin dashboard)
app.get('/api/orders', async (req, res) => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        await client.connect();

        const query = `
            SELECT * FROM orders
            ORDER BY created_at DESC;
        `;

        const result = await client.query(query);

        return res.status(200).json({
            success: true,
            orders: result.rows,
            count: result.rows.length
        });

    } catch (error) {
        console.error('Error fetching orders:', error);
        return res.status(500).json({
            error: 'Failed to fetch orders',
            message: error.message
        });

    } finally {
        await client.end();
    }
});

// Update Order Status Endpoint
app.patch('/api/orders/:orderNumber/status', async (req, res) => {
    const { orderNumber } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ error: 'Status is required' });
    }

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        await client.connect();

        const query = `
            UPDATE orders
            SET status = $1, updated_at = NOW()
            WHERE order_number = $2
            RETURNING *;
        `;

        const result = await client.query(query, [status, orderNumber]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'Order status updated',
            order: result.rows[0]
        });

    } catch (error) {
        console.error('Error updating order status:', error);
        return res.status(500).json({
            error: 'Failed to update order status',
            message: error.message
        });

    } finally {
        await client.end();
    }
});

// Product Endpoints
app.get('/api/products', async (req, res) => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });
    try {
        await client.connect();
        const result = await client.query('SELECT * FROM products ORDER BY created_at DESC');
        res.json({ success: true, products: result.rows });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    } finally {
        await client.end();
    }
});

app.post('/api/products', async (req, res) => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });
    try {
        const { id, title, category, price, original_price, rating, reviews, description, type, image_path, bg_path, features, specifications, is_featured, cover_image_path } = req.body;
        await client.connect();
        const query = `
            INSERT INTO products (id, title, category, price, original_price, rating, reviews, description, type, image_path, bg_path, features, specifications, is_featured, cover_image_path)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
            RETURNING *;
        `;
        const values = [id, title, category, price, original_price, rating, reviews, description, type, image_path, bg_path, JSON.stringify(features), JSON.stringify(specifications), is_featured || false, cover_image_path];
        const result = await client.query(query, values);
        res.status(201).json({ success: true, product: result.rows[0] });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Failed to add product' });
    } finally {
        await client.end();
    }
});

app.put('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });
    try {
        const { title, category, price, original_price, rating, reviews, description, type, image_path, bg_path, features, specifications, is_featured, cover_image_path } = req.body;
        await client.connect();
        const query = `
            UPDATE products
            SET title=$1, category=$2, price=$3, original_price=$4, rating=$5, reviews=$6, description=$7, type=$8, image_path=$9, bg_path=$10, features=$11, specifications=$12, is_featured=$14, cover_image_path=$15, updated_at=NOW()
            WHERE id=$13
            RETURNING *;
        `;
        const values = [title, category, price, original_price, rating, reviews, description, type, image_path, bg_path, JSON.stringify(features), JSON.stringify(specifications), id, is_featured || false, cover_image_path];
        const result = await client.query(query, values);
        res.json({ success: true, product: result.rows[0] });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    } finally {
        await client.end();
    }
});

app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });
    try {
        await client.connect();
        await client.query('DELETE FROM products WHERE id = $1', [id]);
        res.json({ success: true, message: 'Product deleted' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    } finally {
        await client.end();
    }
});

// Admin Login Endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin@puff.com' && password === 'Admin@123654789') {
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token: 'fake-jwt-token-for-demo' // In a real app, use JWT
        });
    }

    return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'API server is running',
        env: {
            EMAIL_HOST: process.env.EMAIL_HOST ? '✅' : '❌',
            EMAIL_PORT: process.env.EMAIL_PORT ? '✅' : '❌',
            EMAIL_USER: process.env.EMAIL_USER ? '✅' : '❌',
            EMAIL_PASS: process.env.EMAIL_PASS ? '✅' : '❌',
            ADMIN_EMAIL: process.env.ADMIN_EMAIL ? '✅' : '❌',
            DATABASE_URL: process.env.DATABASE_URL ? '✅' : '❌',
            NODE_ENV: process.env.NODE_ENV || 'not set',
        }
    });
});

// Test email endpoint (actually sends a real test email)
app.get('/api/test-email', async (req, res) => {
    try {
        console.log('🧪 Test email endpoint called');
        const transporter = createTransporter();

        await transporter.verify();
        console.log('🧪 SMTP verified, now sending test email...');

        const testResult = await transporter.sendMail({
            from: `"Buss Ek Puff Test" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: '🧪 Test Email - Buss Ek Puff',
            html: `<div style="padding:20px;font-family:sans-serif;">
                <h2>✅ Email is working!</h2>
                <p>This is a test email from your Vercel serverless function.</p>
                <p>Time: ${new Date().toISOString()}</p>
            </div>`
        });

        console.log('🧪 Test email sent:', testResult.messageId);
        res.json({ success: true, message: 'Test email sent!', messageId: testResult.messageId });
    } catch (err) {
        console.error('❌ Test email failed:', err.message);
        res.status(500).json({ success: false, message: 'Email failed', error: err.message });
    }
});

// Image Upload Endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // If using Cloudinary, path is the full URL
    // If using Local, path is accessible via /uploads/filename
    const imageUrl = req.file.path || `/uploads/${req.file.filename}`;

    res.json({
        success: true,
        imageUrl: imageUrl,
        filename: req.file.filename || req.file.originalname
    });
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`\n🚀 API Server running on http://localhost:${PORT}`);
        console.log(`📡 Endpoints:`);
        console.log(`   POST   http://localhost:${PORT}/api/submitOrder`);
        console.log(`   GET    http://localhost:${PORT}/api/orders`);
        console.log(`   PATCH  http://localhost:${PORT}/api/orders/:orderNumber/status`);
        console.log(`   GET    http://localhost:${PORT}/api/health\n`);
    });
}

export default app;
