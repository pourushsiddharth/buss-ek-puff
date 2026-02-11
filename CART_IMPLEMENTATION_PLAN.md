# Shopping Cart & Order Management Implementation Plan

## Overview
This document outlines the complete implementation of a shopping cart system with checkout, database storage, admin dashboard, and email notifications for the Buss Ek Puff e-commerce site.

## Architecture

### Frontend Components
1. **CartContext** - Global state management for cart
2. **Cart Modal/Page** - Display cart items
3. **Checkout Form** - Collect customer details
4. **Admin Dashboard** - View and manage orders

### Backend
1. **Database Schema** - Orders table
2. **API Endpoints** - Order submission and retrieval
3. **Email Service** - Admin notifications

### Database Setup (PostgreSQL)
4. **Orders Table** - Store customer orders

---

## Phase 1: Cart Context & State Management

### File: `src/context/CartContext.jsx`
- Create React Context for cart state
- Functions: addToCart, removeFromCart, updateQuantity, clearCart
- Persist cart to localStorage

### File: `src/App.jsx`
- Wrap app with CartProvider

---

## Phase 2: Add to Cart Functionality

### Update Files:
- `src/components/AllProducts.jsx` - Add "Add to Cart" button
- `src/components/ProductDetail.jsx` - Add "Add to Cart" button
- `src/components/ProductSection.jsx` - Add "Add to Cart" button

---

## Phase 3: Cart Display

### File: `src/components/Cart.jsx`
- Display cart items
- Show product image, title, price, quantity
- Remove item button
- Update quantity controls
- Total price calculation
- Proceed to checkout button

### File: `src/components/Navbar.jsx`
- Add cart icon with item count badge
- Click to open cart modal/page

---

## Phase 4: Checkout Flow

### File: `src/components/Checkout.jsx`
- Form fields:
  - Name (required)
  - Email (required)
  - Phone Number (required)
- Display order summary
- Submit order button

---

## Phase 5: Database Schema

### SQL Schema for Orders Table:
```sql
CREATE TABLE orders (
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
```

### File: `setupOrders.js`
- Script to create orders table
- Run: `node setupOrders.js`

---

## Phase 6: API Endpoints

### File: `api/submitOrder.js` (or backend route)
- Accept POST request with order data
- Validate required fields
- Generate unique order number
- Store order in database
- Send email notification to admin
- Return success response

### File: `api/getOrders.js`
- Accept GET request
- Retrieve all orders from database
- Return orders array

---

## Phase 7: Admin Dashboard

### File: `src/components/AdminDashboard.jsx`
- Protected route (password/auth)
- Display all orders in table format
- Show:
  - Order number
  - Customer name
  - Email
  - Phone
  - Items (expandable)
  - Total amount
  - Date
  - Status
- Filter by status
- Search by order number or customer name
- Mark order as completed/cancelled

### File: `src/App.jsx`
- Add route for `/admin`

---

## Phase 8: Email Notifications

### Dependencies:
```bash
npm install nodemailer
```

### File: `api/sendEmail.js`
- Configure nodemailer with SMTP settings
- Send simple notification: "New order received"
- No customer details in email (as per requirement)

### Environment Variables (`.env`):
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@bussekpuff.com
```

---

## Implementation Steps

### Step 1: Create Cart Context
```bash
# Create context file
# Implement cart state management
# Add to App.jsx
```

### Step 2: Add Cart Buttons
```bash
# Update AllProducts.jsx
# Update ProductDetail.jsx
# Update ProductSection.jsx
```

### Step 3: Create Cart Component
```bash
# Build Cart.jsx
# Add to Navbar
# Implement cart modal
```

### Step 4: Create Checkout
```bash
# Build Checkout.jsx
# Add form validation
# Connect to cart context
```

### Step 5: Setup Database
```bash
# Create setupOrders.js
# Run database setup
# Verify table creation
```

### Step 6: Create API
```bash
# Create API folder structure
# Implement submitOrder endpoint
# Implement getOrders endpoint
# Test with Postman
```

### Step 7: Build Admin Dashboard
```bash
# Create AdminDashboard.jsx
# Add authentication
# Connect to API
# Test order display
```

### Step 8: Setup Email
```bash
# Install nodemailer
# Configure SMTP
# Create email template
# Test email sending
```

---

## Testing Checklist

- [ ] Add product to cart from products page
- [ ] Add product to cart from product detail page
- [ ] View cart with correct items and quantities
- [ ] Update quantities in cart
- [ ] Remove items from cart
- [ ] Cart persists on page refresh
- [ ] Proceed to checkout
- [ ] Fill checkout form (all fields required)
- [ ] Submit order successfully
- [ ] Order stored in database
- [ ] Admin receives email notification
- [ ] View order in admin dashboard
- [ ] Filter and search orders
- [ ] Update order status

---

## Security Considerations

1. **Admin Dashboard**: Implement proper authentication
2. **API Endpoints**: Add rate limiting
3. **Email**: Use environment variables for credentials
4. **Database**: Use parameterized queries to prevent SQL injection
5. **Form Validation**: Client-side and server-side validation

---

## Future Enhancements

1. Payment gateway integration
2. Order tracking for customers
3. Email confirmation to customers
4. Inventory management
5. Discount codes
6. Multiple shipping addresses
7. Order history for returning customers

---

## Files to Create

1. `src/context/CartContext.jsx`
2. `src/components/Cart.jsx`
3. `src/components/Checkout.jsx`
4. `src/components/AdminDashboard.jsx`
5. `setupOrders.js`
6. `api/submitOrder.js`
7. `api/getOrders.js`
8. `api/sendEmail.js`

## Files to Modify

1. `src/App.jsx`
2. `src/components/Navbar.jsx`
3. `src/components/AllProducts.jsx`
4. `src/components/ProductDetail.jsx`
5. `src/components/ProductSection.jsx`
6. `.env`

---

**Estimated Implementation Time**: 6-8 hours
**Complexity**: High
**Dependencies**: pg, nodemailer, dotenv (already installed)
