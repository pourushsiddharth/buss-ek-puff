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

async function verifyDatabase() {
    try {
        await client.connect();
        console.log('Connected to database!\n');

        // Get all products
        const result = await client.query('SELECT * FROM products ORDER BY id');

        console.log(`Total products in database: ${result.rows.length}\n`);

        // Display each product
        result.rows.forEach((product, index) => {
            console.log(`${index + 1}. ${product.title} (${product.id})`);
            console.log(`   Category: ${product.category}`);
            console.log(`   Type: ${product.type}`);
            console.log(`   Price: ${product.price}`);
            console.log(`   Rating: ${product.rating} (${product.reviews} reviews)`);
            console.log('');
        });

        // Statistics
        const stats = await client.query(`
            SELECT type, COUNT(*) as count, AVG(rating)::numeric(10,2) as avg_rating
            FROM products
            GROUP BY type
        `);

        console.log('Statistics:');
        stats.rows.forEach(stat => {
            console.log(`  ${stat.type}: ${stat.count} products, Avg Rating: ${stat.avg_rating}`);
        });

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await client.end();
    }
}

verifyDatabase();
