import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';

dotenv.config();

async function migrate() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        console.log('Connected to DB');

        console.log('Adding is_featured and cover_image_path columns...');
        await client.query(`
            ALTER TABLE products 
            ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE,
            ADD COLUMN IF NOT EXISTS cover_image_path VARCHAR(255);
        `);
        console.log('Migration completed successfully!');
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await client.end();
    }
}

migrate();
