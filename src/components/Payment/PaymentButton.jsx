import React from 'react';
import { Crown } from 'lucide-react';

/**
 * PaymentButton Component
 * Button to trigger payment modal
 */
const PaymentButton = ({ onClick, className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2 ${sizeClasses[size]} ${className}`}
    >
      <Crown className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
      Get Premium ₹19
    </button>
  );
};

export default PaymentButton;
