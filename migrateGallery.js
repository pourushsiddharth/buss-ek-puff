import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function migrate() {
    try {
        await client.connect();
        console.log('✅ Connected to database');

        // Safely add gallery_images column if it doesn't exist
        await client.query(`
            ALTER TABLE products
            ADD COLUMN IF NOT EXISTS gallery_images JSONB DEFAULT '[]';
        `);
        console.log('✅ gallery_images column added (or already exists)');
    } catch (err) {
        console.error('❌ Migration error:', err.message);
    } finally {
        await client.end();
        console.log('🔌 Connection closed');
    }
}

migrate();
