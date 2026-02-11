import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

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

        // Send email notification to admin (simple notification only)
        try {
            await sendAdminNotification();
        } catch (emailError) {
            console.error('Failed to send email notification:', emailError);
            // Don't fail the order if email fails
        }

        // Return success response
        return res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            orderNumber: order.order_number,
            orderId: order.id
        });

    } catch (error) {
        console.error('Error submitting order:', error);

        // Check for duplicate order number
        if (error.code === '23505') {
            return res.status(409).json({ error: 'Order number already exists' });
        }

        return res.status(500).json({
            error: 'Failed to submit order',
            message: error.message
        });

    } finally {
        await client.end();
    }
}

// Simple email notification function
async function sendAdminNotification() {
    // For now, just log that we would send an email
    // In production, this would use nodemailer or similar
    console.log('📧 New order notification would be sent to admin');

    // TODO: Implement actual email sending
    // const nodemailer = require('nodemailer');
    // const transporter = nodemailer.createTransport({...});
    // await transporter.sendMail({
    //     to: process.env.ADMIN_EMAIL,
    //     subject: 'New Order Received',
    //     text: 'You have received a new order. Please check the admin dashboard.'
    // });
}
