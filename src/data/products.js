// Vapes
import product1 from '../assets/product1.png';
import product2 from '../assets/product2.png';
import product3 from '../assets/product3.png';
import product4 from '../assets/product4.png';
import product5 from '../assets/product5.png';
import product1_bg from '../assets/product1_bg.png';
import product2_bg from '../assets/product2_bg.png';
import product3_bg from '../assets/product3_bg.png';
import product4_bg from '../assets/product4_bg.png';
import product5_bg from '../assets/product5_bg.png';

// Hookahs
import rubyImg from '../assets/hookah_ruby.png';
import glassImg from '../assets/hookah3_glass.png';
import silverImg from '../assets/hookah_silver.png';
import goldImg from '../assets/hookah_gold.png';
import silverGoldImg from '../assets/hookah_silver&gold.png';
import emeraldImg from '../assets/hookah_emerald.png';

export const allProducts = [
    {
        id: 'v1',
        title: 'MIDNIGHT MIST',
        category: 'PREMIUM VAPE',
        price: '₹2,499',
        originalPrice: '₹3,499',
        rating: 4.8,
        reviews: 127,
        description: 'Experience the cool, refreshing blend of dark berries inspired by the fresh mountain air of the Swiss Alps. This premium vape delivers an unparalleled flavor experience with every puff.',
        image: product1,
        bg: product1_bg,
        type: 'Vape',
        features: [
            'Premium Quality Materials',
            '5000+ Puffs Capacity',
            'Rechargeable Battery',
            'Leak-Proof Design',
            'Multiple Flavor Options',
            'Authentic Product Guarantee'
        ],
        specifications: {
            'Nicotine Strength': '5% (50mg)',
            'Battery': '650mAh Rechargeable',
            'E-liquid Capacity': '12ml',
            'Puff Count': '5000+ puffs',
            'Flavor': 'Dark Berry Blend'
        }
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
        image: product2,
        bg: product2_bg,
        type: 'Vape',
        features: [
            'Intense Menthol Flavor',
            '5000+ Puffs Capacity',
            'Fast Charging Technology',
            'Ergonomic Design',
            'Premium Build Quality',
            'Long-Lasting Performance'
        ],
        specifications: {
            'Nicotine Strength': '5% (50mg)',
            'Battery': '650mAh Rechargeable',
            'E-liquid Capacity': '12ml',
            'Puff Count': '5000+ puffs',
            'Flavor': 'Arctic Menthol'
        }
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
        image: product3,
        bg: product3_bg,
        type: 'Vape',
        features: [
            'Natural Berry Flavors',
            '5000+ Puffs Capacity',
            'Smooth Vapor Production',
            'Premium Coil Technology',
            'Vibrant Color Design',
            'Consistent Flavor Profile'
        ],
        specifications: {
            'Nicotine Strength': '5% (50mg)',
            'Battery': '650mAh Rechargeable',
            'E-liquid Capacity': '12ml',
            'Puff Count': '5000+ puffs',
            'Flavor': 'Mixed Berries'
        }
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
        image: product4,
        bg: product4_bg,
        type: 'Vape',
        features: [
            'Authentic Tobacco Taste',
            '5000+ Puffs Capacity',
            'Rich Flavor Profile',
            'Premium Tobacco Extract',
            'Smooth Throat Hit',
            'Classic Design'
        ],
        specifications: {
            'Nicotine Strength': '5% (50mg)',
            'Battery': '650mAh Rechargeable',
            'E-liquid Capacity': '12ml',
            'Puff Count': '5000+ puffs',
            'Flavor': 'Golden Tobacco'
        }
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
        image: product5,
        bg: product5_bg,
        type: 'Vape',
        features: [
            'Fresh Mint Flavor',
            '5000+ Puffs Capacity',
            'Cooling Sensation',
            'Natural Mint Extract',
            'Sleek Green Design',
            'Refreshing Aftertaste'
        ],
        specifications: {
            'Nicotine Strength': '5% (50mg)',
            'Battery': '650mAh Rechargeable',
            'E-liquid Capacity': '12ml',
            'Puff Count': '5000+ puffs',
            'Flavor': 'Garden Mint'
        }
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
        image: rubyImg,
        bg: product1_bg,
        type: 'Hookah',
        features: [
            'Premium Ruby Mirror Finish',
            'Hand-Crafted Design',
            'Superior Smoke Quality',
            'Durable Construction',
            'Easy to Clean',
            'Complete Accessories Included'
        ],
        specifications: {
            'Height': '24 inches',
            'Material': 'Stainless Steel & Glass',
            'Finish': 'Ruby Mirror',
            'Hose Length': '72 inches',
            'Bowl Type': 'Premium Ceramic'
        }
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
        image: glassImg,
        bg: product2_bg,
        type: 'Hookah',
        features: [
            'Pure Crystal Glass Base',
            'Master-Crafted Design',
            'Exceptional Clarity',
            'Premium Build Quality',
            'Elegant Appearance',
            'Complete Setup Included'
        ],
        specifications: {
            'Height': '26 inches',
            'Material': 'Premium Crystal Glass',
            'Finish': 'Clear Glass',
            'Hose Length': '72 inches',
            'Bowl Type': 'Premium Ceramic'
        }
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
        image: silverImg,
        bg: product3_bg,
        type: 'Hookah',
        features: [
            'Silver Mirror Finish',
            'Polished Perfection',
            'Modern Design',
            'High-Quality Materials',
            'Smooth Smoking Experience',
            'Premium Accessories'
        ],
        specifications: {
            'Height': '24 inches',
            'Material': 'Stainless Steel & Glass',
            'Finish': 'Silver Mirror',
            'Hose Length': '72 inches',
            'Bowl Type': 'Premium Ceramic'
        }
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
        image: goldImg,
        bg: product4_bg,
        type: 'Hookah',
        features: [
            'Gold Mirror Finish',
            'Luxurious Design',
            'Premium Craftsmanship',
            'Royal Appearance',
            'Superior Performance',
            'Exclusive Accessories'
        ],
        specifications: {
            'Height': '26 inches',
            'Material': 'Stainless Steel & Glass',
            'Finish': 'Gold Mirror',
            'Hose Length': '72 inches',
            'Bowl Type': 'Premium Ceramic'
        }
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
        image: silverGoldImg,
        bg: product5_bg,
        type: 'Hookah',
        features: [
            'Dual-Tone Mirror Finish',
            'Unique Design',
            'Artistic Craftsmanship',
            'Premium Materials',
            'Exceptional Quality',
            'Limited Edition'
        ],
        specifications: {
            'Height': '28 inches',
            'Material': 'Stainless Steel & Glass',
            'Finish': 'Silver & Gold Mirror',
            'Hose Length': '72 inches',
            'Bowl Type': 'Premium Ceramic'
        }
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
        image: emeraldImg,
        bg: product1_bg,
        type: 'Hookah',
        features: [
            'Emerald Mirror Finish',
            'Nature-Inspired Design',
            'Premium Quality',
            'Mystical Appearance',
            'Smooth Performance',
            'Complete Package'
        ],
        specifications: {
            'Height': '25 inches',
            'Material': 'Stainless Steel & Glass',
            'Finish': 'Emerald Mirror',
            'Hose Length': '72 inches',
            'Bowl Type': 'Premium Ceramic'
        }
    }
];

export default allProducts;
