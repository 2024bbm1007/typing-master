import React from 'react';
import { Crown, Check } from 'lucide-react';

/**
 * PremiumBadge Component
 * Badge to indicate premium status
 */
const PremiumBadge = ({ variant = 'default', className = '' }) => {
  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full ${className}`}>
        <Crown className="w-3 h-3 text-yellow-400" />
        <span className="text-xs font-semibold text-yellow-400">PRO</span>
      </div>
    );
  }

  if (variant === 'large') {
    return (
      <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50 rounded-xl ${className}`}>
        <Crown className="w-5 h-5 text-yellow-400" />
        <div>
          <div className="text-sm font-bold text-yellow-400">Premium Member</div>
          <div className="text-xs text-gray-400">All features unlocked</div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg ${className}`}>
      <Crown className="w-4 h-4 text-yellow-400" />
      <span className="text-sm font-semibold text-yellow-400">Premium</span>
    </div>
  );
};

export default PremiumBadge;
