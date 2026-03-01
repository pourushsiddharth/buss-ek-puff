import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Product data without image imports
const productsData = [
    {
        id: 'v1',
        title: 'MIDNIGHT MIST',
        category: 'PREMIUM VAPE',
        price: '₹2,499',
        originalPrice: '₹3,499',
        rating: 4.8,
        reviews: 127,
        description: 'Experience the cool, refreshing blend of dark berries inspired by the fresh mountain air of the Swiss Alps. This premium vape delivers an unparalleled flavor experience with every puff.',
        imagePath: 'product1.png',
        bgPath: 'product1_bg.png',
        type: 'Vape',
        features: [
            'Premium Quality Materials',
            '5000+ Puffs Capacity',
            'Rechargeable Battery',
            'Leak-Proof Design',
            'Multiple Flavor Options',
            'Authentic Product Guarantee'
        ],
        is_out_of_stock: false,
        variations: [
            { flavor: 'Original Dark Berry', image: 'product1.png' },
            { flavor: 'Strawberry Blast', image: 'product3.png' }
        ]
    },
    {
        id: 'v2',
        title: 'ARCTIC FREEZE',
        category: 'PREMIUM VAPE',
        price: '₹2,299',
        originalPrice: '₹3,299',
        rating: 4.7,
        reviews: 98,
        description: 'A crisp and refreshing menthol chill that captures the essence of the frozen northern glaciers. Perfect for those who love an icy blast with every inhale.',
        imagePath: 'product2.png',
        bgPath: 'product2_bg.png',
        type: 'Vape',
        features: [
            'Intense Menthol Flavor',
            '5000+ Puffs Capacity',
            'Fast Charging Technology',
            'Ergonomic Design',
            'Premium Build Quality',
            'Long-Lasting Performance'
        ],
        is_out_of_stock: false,
        variations: [
            { flavor: 'Pure Arctic', image: 'product2.png' },
            { flavor: 'Mint Fusion', image: 'product5.png' }
        ]
    },
    {
        id: 'v3',
        title: 'CRIMSON BERRY',
        category: 'PREMIUM VAPE',
        price: '₹2,499',
        originalPrice: '₹3,299',
        rating: 4.9,
        reviews: 156,
        description: 'A vibrant explosion of sun-ripened berries picked fresh from the valley vines. Sweet, tangy, and absolutely irresistible.',
        imagePath: 'product3.png',
        bgPath: 'product3_bg.png',
        type: 'Vape',
        features: [
            'Natural Berry Flavors',
            '5000+ Puffs Capacity',
            'Smooth Vapor Production',
            'Premium Coil Technology',
            'Vibrant Color Design',
            'Consistent Flavor Profile'
        ],
        is_out_of_stock: false,
        variations: [
            { flavor: 'Crimson Base', image: 'product3.png' },
            { flavor: 'Berry Ice', image: 'product2.png' }
        ]
    },
    {
        id: 'v4',
        title: 'GOLDEN TOBACCO',
        category: 'PREMIUM VAPE',
        price: '₹2,699',
        originalPrice: '₹3,699',
        rating: 4.6,
        reviews: 89,
        description: 'A smooth and traditional golden tobacco flavor with a rich, earthy profile from highland farms. For the classic tobacco enthusiast.',
        imagePath: 'product4.png',
        bgPath: 'product4_bg.png',
        type: 'Vape',
        features: [
            'Authentic Tobacco Taste',
            '5000+ Puffs Capacity',
            'Rich Flavor Profile',
            'Premium Tobacco Extract',
            'Smooth Throat Hit',
            'Classic Design'
        ],
        is_out_of_stock: false,
        variations: [
            { flavor: 'Smooth Golden', image: 'product4.png' }
        ]
    },
    {
        id: 'v5',
        title: 'EMERALD MINT',
        category: 'PREMIUM VAPE',
        price: '₹2,399',
        originalPrice: '₹3,199',
        rating: 4.8,
        reviews: 134,
        description: 'Cool and invigorating garden mint with a subtle touch of coastal breeze freshness. A refreshing experience with every puff.',
        imagePath: 'product5.png',
        bgPath: 'product5_bg.png',
        type: 'Vape',
        features: [
            'Fresh Mint Flavor',
            '5000+ Puffs Capacity',
            'Cooling Sensation',
            'Natural Mint Extract',
            'Sleek Green Design',
            'Refreshing Aftertaste'
        ],
        is_out_of_stock: false,
        variations: [
            { flavor: 'Emerald Base', image: 'product5.png' },
            { flavor: 'Tobacco Mint', image: 'product4.png' }
        ]
    },
    {
        id: 'v6',
        title: 'JADE JOURNEY',
        category: 'PREMIUM VAPE',
        price: '₹3,299',
        originalPrice: '₹4,499',
        rating: 4.8,
        reviews: 215,
        description: 'An exotic escape with refreshing green melon and cooling mint. Pure bliss in every puff.',
        imagePath: 'product5.png',
        bgPath: 'product5_bg.png',
        type: 'Vape',
        features: [
            'Fresh Mint Flavor',
            '5000+ Puffs Capacity',
            'Cooling Sensation',
            'Natural Mint Extract',
            'Sleek Green Design',
            'Refreshing Aftertaste'
        ],
        is_out_of_stock: true,
        variations: [
            { flavor: 'Jade Edition', image: 'product5.png' }
        ]
    },
    {
        id: 'h1',
        title: 'CRIMSON CONQUEST',
        category: 'ELITE HOOKAH',
        price: '₹12,999',
        originalPrice: '₹16,999',
        rating: 4.9,
        reviews: 67,
        description: 'A bold statement piece with a ruby reflection that resonates with passion and power. This elite hookah combines artistry with functionality.',
        imagePath: 'hookah_ruby.png',
        bgPath: 'product1_bg.png',
        type: 'Hookah',
        features: [
            'Premium Ruby Mirror Finish',
            'Hand-Crafted Design',
            'Superior Smoke Quality',
            'Durable Construction',
            'Easy to Clean',
            'Complete Accessories Included'
        ],
        is_out_of_stock: false,
        variations: [
            { flavor: 'Ruby Edition', image: 'hookah_ruby.png' },
            { flavor: 'Emerald Edition', image: 'hookah_emerald.png' }
        ]
    },
    {
        id: 'h2',
        title: 'CRYSTAL CLARITY',
        category: 'ELITE HOOKAH',
        price: '₹14,999',
        originalPrice: '₹18,999',
        rating: 5.0,
        reviews: 45,
        description: 'Experience absolute transparency with our master-crafted pure prism glass base. A stunning centerpiece for any collection.',
        imagePath: 'hookah3_glass.png',
        bgPath: 'product2_bg.png',
        type: 'Hookah',
        features: [
            'Pure Crystal Glass Base',
            'Master-Crafted Design',
            'Exceptional Clarity',
            'Premium Build Quality',
            'Elegant Appearance',
            'Complete Setup Included'
        ],
        is_out_of_stock: false,
        variations: [
            { flavor: 'Clear Crystal', image: 'hookah3_glass.png' }
        ]
    },
    {
        id: 'h3',
        title: 'STERLING SHIMMER',
        category: 'ELITE HOOKAH',
        price: '₹11,999',
        originalPrice: '₹15,999',
        rating: 4.7,
        reviews: 52,
        description: 'Sleek, silver-polished mirror base that captures every highlight of your room. Modern elegance meets traditional craftsmanship.',
        imagePath: 'hookah_silver.png',
        bgPath: 'product3_bg.png',
        type: 'Hookah',
        features: [
            'Silver Mirror Finish',
            'Polished Perfection',
            'Modern Design',
            'High-Quality Materials',
            'Smooth Smoking Experience',
            'Premium Accessories'
        ],
        is_out_of_stock: false,
        variations: [
            { flavor: 'Sterling Edition', image: 'hookah_silver.png' },
            { flavor: 'Gold Trim', image: 'hookah_gold.png' }
        ]
    },
    {
        id: 'h4',
        title: 'GILDED GLORY',
        category: 'ELITE HOOKAH',
        price: '₹15,999',
        originalPrice: '₹19,999',
        rating: 4.9,
        reviews: 38,
        description: 'Indulge in the opulence of gold with an aurum aura that adds a touch of royalty. The ultimate luxury hookah experience.',
        imagePath: 'hookah_gold.png',
        bgPath: 'product4_bg.png',
        type: 'Hookah',
        features: [
            'Gold Mirror Finish',
            'Luxurious Design',
            'Premium Craftsmanship',
            'Royal Appearance',
            'Superior Performance',
            'Exclusive Accessories'
        ],
        is_out_of_stock: false,
        variations: [
            { flavor: 'Gilded Base', image: 'hookah_gold.png' },
            { flavor: 'Duo Trim', image: 'hookah_silver&gold.png' }
        ]
    },
    {
        id: 'h5',
        title: 'DUO DYNASTY',
        category: 'ELITE HOOKAH',
        price: '₹16,999',
        originalPrice: '₹21,999',
        rating: 5.0,
        reviews: 29,
        description: 'A harmonious blend of silver and gold accents creating a dynamic metallic mastery. The perfect fusion of elegance and power.',
        imagePath: 'hookah_silver&gold.png',
        bgPath: 'product5_bg.png',
        type: 'Hookah',
        features: [
            'Dual-Tone Mirror Finish',
            'Unique Design',
            'Artistic Craftsmanship',
            'Premium Materials',
            'Exceptional Quality',
            'Limited Edition'
        ],
        is_out_of_stock: false,
        variations: [
            { flavor: 'Duo Edition', image: 'hookah_silver&gold.png' }
        ]
    },
    {
        id: 'h6',
        title: 'JADE JOURNEY',
        category: 'ELITE HOOKAH',
        price: '₹13,999',
        originalPrice: '₹17,999',
        rating: 4.8,
        reviews: 41,
        description: 'A deep, mystical emerald enchantment that brings the essence of the forest to your home. Nature-inspired luxury at its finest.',
        imagePath: 'hookah_emerald.png',
        bgPath: 'product1_bg.png',
        type: 'Hookah',
        features: [
            'Emerald Mirror Finish',
            'Nature-Inspired Design',
            'Premium Quality',
            'Mystical Appearance',
            'Smooth Performance',
            'Complete Package'
        ],
        is_out_of_stock: true,
        variations: [
            { flavor: 'Jade Edition', image: 'hookah_emerald.png' },
            { flavor: 'Ruby Edition', image: 'hookah_ruby.png' }
        ]
    }
];

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function setupDatabase() {
    try {
        console.log('🔌 Connecting to database...');
        await client.connect();
        console.log('✅ Connected to database successfully!');

        // Create products table
        console.log('\n📋 Creating products table...');

        // Drop the existing table to ensure schema updates like 'variations' column are applied
        await client.query(`DROP TABLE IF EXISTS products CASCADE;`);

        await client.query(`
            CREATE TABLE IF NOT EXISTS products (
                id VARCHAR(10) PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                category VARCHAR(100) NOT NULL,
                price VARCHAR(50) NOT NULL,
                original_price VARCHAR(50),
                rating DECIMAL(2,1),
                reviews INTEGER,
                description TEXT,
                image_path VARCHAR(255),
                bg_path VARCHAR(255),
                type VARCHAR(50),
                features JSONB,
                is_out_of_stock BOOLEAN DEFAULT false,
                variations JSONB,
                gallery_images JSONB DEFAULT '[]',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✅ Products table created successfully!');

        // Clear existing data
        console.log('\n🗑️  Clearing existing product data...');
        await client.query('DELETE FROM products');
        console.log('✅ Existing data cleared!');

        // Insert all products
        console.log('\n📦 Inserting product data...');
        let insertedCount = 0;

        for (const product of productsData) {
            const query = `
                INSERT INTO products (
                    id, title, category, price, original_price, rating, reviews,
                    description, image_path, bg_path, type, features, is_out_of_stock, variations, gallery_images
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
                ON CONFLICT (id) DO UPDATE SET
                    title = EXCLUDED.title,
                    category = EXCLUDED.category,
                    price = EXCLUDED.price,
                    original_price = EXCLUDED.original_price,
                    rating = EXCLUDED.rating,
                    reviews = EXCLUDED.reviews,
                    description = EXCLUDED.description,
                    image_path = EXCLUDED.image_path,
                    bg_path = EXCLUDED.bg_path,
                    type = EXCLUDED.type,
                    features = EXCLUDED.features,
                    is_out_of_stock = EXCLUDED.is_out_of_stock,
                    variations = EXCLUDED.variations,
                    updated_at = CURRENT_TIMESTAMP
            `;

            const values = [
                product.id,
                product.title,
                product.category,
                product.price,
                product.originalPrice,
                product.rating,
                product.reviews,
                product.description,
                product.imagePath,
                product.bgPath,
                product.type,
                JSON.stringify(product.features),
                product.is_out_of_stock || false,
                JSON.stringify(product.variations || []),
                JSON.stringify(product.gallery_images || [])
            ];

            await client.query(query, values);
            insertedCount++;
            console.log(`  ✓ Inserted: ${product.title} (${product.id})`);
        }

        console.log(`\n✅ Successfully inserted ${insertedCount} products!`);

        // Verify the data
        console.log('\n🔍 Verifying data...');
        const result = await client.query('SELECT id, title, category, type, price FROM products ORDER BY id');
        console.log(`\n📊 Total products in database: ${result.rows.length}`);
        console.log('\n📋 Products Summary:');
        console.table(result.rows);

        // Get statistics
        const stats = await client.query(`
            SELECT 
                type,
                COUNT(*) as count,
                AVG(rating) as avg_rating
            FROM products
            GROUP BY type
        `);
        console.log('\n📈 Statistics by Type:');
        console.table(stats.rows);

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error('Stack:', error.stack);
    } finally {
        await client.end();
        console.log('\n🔌 Database connection closed.');
    }
}

// Run the setup
setupDatabase();
