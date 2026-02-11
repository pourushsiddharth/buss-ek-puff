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

async function queryProducts() {
    try {
        await client.connect();

        // Get command line argument
        const args = process.argv.slice(2);
        const command = args[0];

        if (!command) {
            console.log('Usage: node queryProducts.js [command]');
            console.log('\nAvailable commands:');
            console.log('  all          - Show all products');
            console.log('  vapes        - Show only vapes');
            console.log('  hookahs      - Show only hookahs');
            console.log('  top-rated    - Show top rated products');
            console.log('  [product-id] - Show specific product (e.g., v1, h2)');
            return;
        }

        let query, params = [];

        switch (command.toLowerCase()) {
            case 'all':
                query = 'SELECT * FROM products ORDER BY id';
                break;
            case 'vapes':
                query = "SELECT * FROM products WHERE type = 'Vape' ORDER BY rating DESC";
                break;
            case 'hookahs':
                query = "SELECT * FROM products WHERE type = 'Hookah' ORDER BY rating DESC";
                break;
            case 'top-rated':
                query = 'SELECT * FROM products WHERE rating >= 4.8 ORDER BY rating DESC, reviews DESC';
                break;
            default:
                query = 'SELECT * FROM products WHERE id = $1';
                params = [command];
        }

        const result = await client.query(query, params);

        if (result.rows.length === 0) {
            console.log('No products found.');
            return;
        }

        console.log(`\nFound ${result.rows.length} product(s):\n`);

        result.rows.forEach((product, index) => {
            console.log(`${'='.repeat(60)}`);
            console.log(`${index + 1}. ${product.title} (${product.id})`);
            console.log(`${'='.repeat(60)}`);
            console.log(`Category: ${product.category}`);
            console.log(`Type: ${product.type}`);
            console.log(`Price: ${product.price} (Original: ${product.original_price})`);
            console.log(`Rating: ${product.rating} ⭐ (${product.reviews} reviews)`);
            console.log(`\nDescription:`);
            console.log(`  ${product.description}`);
            console.log(`\nFeatures:`);
            const features = JSON.parse(product.features);
            features.forEach(feature => console.log(`  • ${feature}`));
            console.log(`\nSpecifications:`);
            const specs = JSON.parse(product.specifications);
            Object.entries(specs).forEach(([key, value]) => {
                console.log(`  ${key}: ${value}`);
            });
            console.log(`\nImages:`);
            console.log(`  Product: ${product.image_path}`);
            console.log(`  Background: ${product.bg_path}`);
            console.log(`\nCreated: ${product.created_at}`);
            console.log('');
        });

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await client.end();
    }
}

queryProducts();
