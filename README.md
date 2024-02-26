# Overview
This MERN app is a concept e-commerce website for Nike. It offers users ability to create accounts, search inventory, add items to their Carts, and checkout.

## Feautures
- User Sign up and Sign in
- Creating new products (Only as `Admin` role)
- Advanced product search with pagination.
- Synchronized User Cart between BE and FE; integrating Redux for real-time frontend updates with backend persistence for cross-session reliability.
- Cart Checkout
    -  Backend validates the logged-in user's cart Cart,
    -  Backend reserves the cart items
    -  Backend creates a stripe `PaymentIntent` and returns it.
    -  Frontend calls stripe and passes the intent to get the `CheckoutForm`
    -  The user submits the form and Stripe handles the rest.

## Topics implemented
- Stripe integration to handle payments, both in the Backend and Frontend.
- JWT Authentication.

## How to run:
### Backend:
  1. Run in terminal `cd server`
  2. Run in terminal `npm install`
  3. Create your `.env` file (Use `.env.sample` as reference)
  4. Run in terminal `npm run dev`

### Frontend:
  1. Run in terminal `cd nike`
  2. Run in terminal `npm install`
  3. Run in terminal `npm run dev`
