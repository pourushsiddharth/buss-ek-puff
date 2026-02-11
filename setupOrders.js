import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function setupOrdersTable() {
    try {
        console.log('Connecting to database...');
        await client.connect();
        console.log('Connected to database successfully!\n');

        // Create orders table
        console.log('Creating orders table...');
        await client.query(`
            CREATE TABLE IF NOT EXISTS orders (
                id SERIAL PRIMARY KEY,
                order_number VARCHAR(50) UNIQUE NOT NULL,
                customer_name VARCHAR(255) NOT NULL,
                customer_email VARCHAR(255) NOT NULL,
                customer_phone VARCHAR(50) NOT NULL,
                items JSONB NOT NULL,
                total_amount DECIMAL(10, 2) NOT NULL,
                status VARCHAR(50) DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✓ Orders table created successfully!\n');

        // Create index on order_number for faster lookups
        console.log('Creating index on order_number...');
        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_order_number ON orders(order_number);
        `);
        console.log('✓ Index created successfully!\n');

        // Create index on status for filtering
        console.log('Creating index on status...');
        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_status ON orders(status);
        `);
        console.log('✓ Index created successfully!\n');

        // Verify table structure
        console.log('Verifying table structure...');
        const tableInfo = await client.query(`
            SELECT column_name, data_type, is_nullable, column_default
            FROM information_schema.columns
            WHERE table_name = 'orders'
            ORDER BY ordinal_position;
        `);

        console.log('\nOrders Table Structure:');
        console.log('─'.repeat(80));
        tableInfo.rows.forEach(col => {
            console.log(`${col.column_name.padEnd(20)} | ${col.data_type.padEnd(20)} | Nullable: ${col.is_nullable}`);
        });
        console.log('─'.repeat(80));

        console.log('\n✅ Orders table setup completed successfully!');
        console.log('\nYou can now:');
        console.log('1. Submit orders through the checkout form');
        console.log('2. View orders in the admin dashboard');
        console.log('3. Receive email notifications for new orders\n');

    } catch (error) {
        console.error('❌ Error setting up orders table:', error.message);
        console.error('Stack:', error.stack);
    } finally {
        await client.end();
        console.log('Database connection closed.');
    }
}

setupOrdersTable();
