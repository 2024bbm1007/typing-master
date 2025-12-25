import React, { useState } from 'react';
import { X, CheckCircle, Crown, Loader } from 'lucide-react';
import PaymentService from '../../services/paymentService';
import { PAYMENT_CONFIG } from '../../config/paymentConfig';

/**
 * PaymentModal Component
 * Enhanced payment modal with gateway integration points
 */
const PaymentModal = ({ onClose, onPaymentSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const plan = PaymentService.getPlan('premium');

  const handlePayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Initialize payment gateway
      await PaymentService.initializePayment('razorpay');

      // Process payment
      const result = await PaymentService.processPayment('premium', {
        // TODO: Add user details for payment
        name: 'User',
        email: 'user@example.com'
      });

      if (result.success) {
        // Verify payment
        const verification = await PaymentService.verifyPayment(result.transactionId);
        
        if (verification.verified) {
          setSuccess(true);
          
          // Notify parent component
          setTimeout(() => {
            if (onPaymentSuccess) {
              onPaymentSuccess(result);
            }
            onClose();
          }, 2000);
        } else {
          throw new Error('Payment verification failed');
        }
      } else {
        throw new Error('Payment processing failed');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 border-2 border-yellow-500/50 rounded-2xl p-6 max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent flex items-center gap-2">
            <Crown className="w-6 h-6 text-yellow-400" />
            Premium Features
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
            disabled={isProcessing}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {success ? (
          // Success State
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Payment Successful!</h3>
            <p className="text-gray-400">Premium features unlocked</p>
          </div>
        ) : (
          <>
            {/* Features List */}
            <div className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6 text-center">
              <div className="text-5xl font-bold text-yellow-400">₹{plan.price}</div>
              <div className="text-sm text-gray-400 mt-1">Lifetime access • One-time payment</div>
              {PAYMENT_CONFIG.testMode && (
                <div className="mt-2 text-xs text-orange-400 font-semibold">
                  TEST MODE - No real charges
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Crown className="w-5 h-5" />
                  Unlock Premium Now
                </>
              )}
            </button>

            {/* Payment Info */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Secure payment powered by Razorpay
              </p>
              <p className="text-xs text-gray-500 mt-1">
                🔒 Your payment information is encrypted
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
