import React, { useState } from 'react';

/**
 * InputBox Component
 * Provides a text input field and submit button for natural language queries
 * 
 * @param {Function} onSubmit - Callback function when query is submitted
 * @param {boolean} isLoading - Loading state to disable input during API call
 */
const InputBox = ({ onSubmit, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Only submit if query is not empty and not just whitespace
    const trimmedQuery = query.trim();
    if (trimmedQuery && !isLoading) {
      onSubmit(trimmedQuery);
    }
  };

  const handleKeyDown = (e) => {
    // Allow submitting with Enter key (but not Shift+Enter)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          {/* Text Input Field */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your data... (e.g., 'Show sales by region')"
            disabled={isLoading}
            className={`
              w-full px-6 py-4 pr-32 text-lg rounded-2xl border-2 transition-all duration-300
              ${isLoading 
                ? 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-white border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 shadow-lg hover:shadow-xl'
              }
            `}
          />
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className={`
              absolute right-2 px-6 py-2 rounded-xl font-medium transition-all duration-300
              ${!query.trim() || isLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg active:transform active:scale-95'
              }
            `}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                    fill="none"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Analyzing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Analyze
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" 
                  />
                </svg>
              </span>
            )}
          </button>
        </div>
        
        {/* Helper Text */}
        <p className="mt-3 text-sm text-gray-500 text-center">
          Try: "Show sales by region", "Display monthly revenue trends", or "Compare product performance"
        </p>
      </form>
    </div>
  );
};

export default InputBox;