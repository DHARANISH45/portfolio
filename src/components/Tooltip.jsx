import React, { useState } from 'react';

const Tooltip = ({ children, text, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Position class mapping
  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  // Arrow position class mapping
  const arrowClasses = {
    top: 'bottom-[-6px] left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'top-[-6px] left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent',
    left: 'right-[-6px] top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent',
    right: 'left-[-6px] top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent'
  };
  
  return (
    <div className="relative flex items-center justify-center group"
         onMouseEnter={() => setIsVisible(true)}
         onMouseLeave={() => setIsVisible(false)}
         onFocus={() => setIsVisible(true)}
         onBlur={() => setIsVisible(false)}>
      {children}
      
      <div className={`absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg 
                      opacity-0 pointer-events-none transition-opacity duration-300 whitespace-nowrap
                      ${positionClasses[position]} ${isVisible ? 'opacity-100' : ''}`}>
        {text}
        <div className={`absolute w-0 h-0 border-4 border-gray-900 
                      ${arrowClasses[position]}`}></div>
      </div>
    </div>
  );
};

export default Tooltip;
