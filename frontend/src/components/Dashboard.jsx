import React from 'react';
import ChartRenderer from './ChartRenderer';

/**
 * Dashboard Component
 * Displays the chart visualization and AI-generated insights
 * 
 * @param {Object} data - Response data from the API containing chart info and insights
 * @param {boolean} isLoading - Loading state indicator
 * @param {string} error - Error message if API call failed
 */
const Dashboard = ({ data, isLoading, error }) => {
  // Loading state display
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-12 animate-pulse">
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-3 bg-gray-100 rounded w-32"></div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="h-64 bg-gray-100 rounded-xl"></div>
            <div className="h-20 bg-gray-50 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state display
  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-700">Something went wrong</h3>
              <p className="text-red-600 mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!data) {
    return (
      <div className="w-full max-w-4xl mx-auto text-center text-gray-500 mt-10">
        <p>Enter a query to generate insights 📊</p>
      </div>
    );
  }

  // Success state (chart + insight)
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Chart Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          📊 Visualization
        </h2>

        <ChartRenderer chartType={data.chart} data={data.data} />
      </div>

      {/* Insight Card */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-blue-700 mb-2">
          💡 Insight
        </h3>
        <p className="text-gray-700">
          {data.insight || "No insights available"}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;