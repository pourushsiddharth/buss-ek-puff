# Production API Connection Fix

## Problem
The website was failing to connect to the backend on the live site because the API URL was hardcoded to `https://buss-ek-puff.vercel.app/`, which only works on your local machine.

## Solution Implemented
1.  **Created `src/config.js`**:
    -   Centralized API URL configuration.
    -   It uses `import.meta.env.VITE_API_URL` if available (for production).
    -   Falls back to `https://buss-ek-puff.vercel.app/` for local development.

2.  **Updated All Components**:
    -   Replaced all hardcoded `https://buss-ek-puff.vercel.app/` instances with the dynamic `API_URL` import in:
        -   `AdminLogin.jsx`
        -   `AdminDashboard.jsx`
        -   `ProductSlider.jsx`
        -   `ProductDetail.jsx`
        -   `Hero.jsx`
        -   `Checkout.jsx`
        -   `AllProducts.jsx`

3.  **Added `.env.example`**:
    -   Documented the `VITE_API_URL` variable.

## Next Steps for You
1.  **Push these changes to GitHub**.
2.  **Configure Production Environment**:
    -   If you are using **Vercel/Netlify** for the frontend:
        -   Go to your project settings -> Environment Variables.
        -   Add `VITE_API_URL` and set it to your live backend URL (e.g., `https://your-backend-app.onrender.com` or wherever your `server.js` is running).
    -   If your frontend and backend are on the same domain/server:
        -   You might arguably not need the full URL if served from the same origin, but using the full URL is safer if you aren't sure.
