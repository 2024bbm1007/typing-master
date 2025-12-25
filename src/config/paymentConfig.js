/**
 * Payment Configuration
 * Configure payment plans and payment gateway providers
 */

export const PAYMENT_CONFIG = {
  enabled: true,
  testMode: true,
  currency: 'INR',
  
  plans: {
    premium: {
      id: 'premium_lifetime',
      name: 'Premium Lifetime',
      price: 19,
      currency: 'INR',
      features: [
        'Detailed Performance Graphs',
        'Weak Key Identification', 
        'Speed vs Accuracy Analysis',
        'Advanced Analytics Dashboard',
        'Ad-Free Experience',
        'Session History',
        'Priority Support'
      ]
    }
  },
  
  providers: {
    razorpay: {
      keyId: 'rzp_test_XXXXXXXXXXXX', // TODO: Add your Razorpay key
      keySecret: '', // Keep on backend only - DO NOT expose in frontend
    },
    stripe: {
      publishableKey: 'pk_test_XXXXXXXXXXXX', // TODO: Add your Stripe key
    },
    paypal: {
      clientId: 'XXXXXXXXXXXX', // TODO: Add your PayPal client ID
    }
  }
};

export default PAYMENT_CONFIG;
