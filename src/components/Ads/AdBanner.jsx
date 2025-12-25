import React from 'react';
import { AD_CONFIG } from '../../config/adConfig';

/**
 * AdBanner Component
 * Reusable banner ad component with multiple size support
 */
const AdBanner = ({ adSlot, size = '728x90', className = '' }) => {
  const [width, height] = size.split('x').map(Number);
  
  // In test mode, show placeholder
  if (AD_CONFIG.testMode) {
    return (
      <div 
        className={`bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center ${className}`}
        style={{ width: `${width}px`, height: `${height}px`, maxWidth: '100%' }}
      >
        <div className="text-center text-gray-500 text-xs">
          <div className="font-bold mb-1">Ad Placeholder</div>
          <div>{size} • Slot: {adSlot}</div>
          <div className="text-[10px] mt-1">TEST MODE</div>
        </div>
      </div>
    );
  }

  // TODO: Implement real AdSense integration
  // For production, replace with actual Google AdSense code:
  // <ins className="adsbygoogle"
  //      style={{ display: 'inline-block', width: `${width}px`, height: `${height}px` }}
  //      data-ad-client={AD_CONFIG.adsense.publisherId}
  //      data-ad-slot={adSlot}></ins>
  
  return (
    <div 
      className={`bg-gray-800/30 border border-gray-700 rounded-lg flex items-center justify-center ${className}`}
      style={{ width: `${width}px`, height: `${height}px`, maxWidth: '100%' }}
    >
      <div className="text-center text-gray-600 text-xs">
        Ad: {adSlot}
      </div>
    </div>
  );
};

export default AdBanner;
