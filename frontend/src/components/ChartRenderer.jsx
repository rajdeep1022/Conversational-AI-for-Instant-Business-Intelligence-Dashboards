import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from 'recharts';

/**
 * ChartRenderer Component
 * Dynamically renders different chart types based on the chart type specification
 * 
 * @param {string} chartType - Type of chart to render ('bar', 'line', 'pie')
 * @param {Array} data - Array of data points with label and value properties
 */

// Color palette for charts
const COLORS = [
  '#0ea5e9', // primary-500
  '#8b5cf6', // violet-500
  '#10b981', // emerald-500
  '#f59e0b', // amber-500
  '#ef4444', // red-500
  '#ec4899', // pink-500
  '#06b6d4', // cyan-500
  '#84cc16', // lime-500
];

/**
 * Custom tooltip component for better styling
 */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-100">
        <p className="font-medium text-gray-800">{label}</p>
        <p className="text-primary-600 font-semibold">
          Value: {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

/**
 * Renders a Bar Chart
 */
const renderBarChart = (data) => (
  <ResponsiveContainer width="100%" height={400}>
    <BarChart
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      barSize={60}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
      <XAxis 
        dataKey="label" 
        tick={{ fill: '#64748b', fontSize: 12 }}
        axisLine={{ stroke: '#e2e8f0' }}
      />
      <YAxis 
        tick={{ fill: '#64748b', fontSize: 12 }}
        axisLine={{ stroke: '#e2e8f0' }}
        tickFormatter={(value) => value.toLocaleString()}
      />
      <Tooltip content={<CustomTooltip />} />
      <Legend wrapperStyle={{ paddingTop: '20px' }} />
      <Bar 
        dataKey="value" 
        fill="#0ea5e9"
        radius={[8, 8, 0, 0]}
        name="Value"
      />
    </BarChart>
  </ResponsiveContainer>
);

/**
 * Renders a Line Chart
 */
const renderLineChart = (data) => (
  <ResponsiveContainer width="100%" height={400}>
    <LineChart
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
      <XAxis 
        dataKey="label" 
        tick={{ fill: '#64748b', fontSize: 12 }}
        axisLine={{ stroke: '#e2e8f0' }}
      />
      <YAxis 
        tick={{ fill: '#64748b', fontSize: 12 }}
        axisLine={{ stroke: '#e2e8f0' }}
        tickFormatter={(value) => value.toLocaleString()}
      />
      <Tooltip content={<CustomTooltip />} />
      <Legend wrapperStyle={{ paddingTop: '20px' }} />
      <Line
        type="monotone"
        dataKey="value"
        stroke="#0ea5e9"
        strokeWidth={3}
        dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 6 }}
        activeDot={{ r: 8, fill: '#0369a1' }}
        name="Value"
      />
    </LineChart>
  </ResponsiveContainer>
);

/**
 * Renders a Pie Chart
 */
const renderPieChart = (data) => {
  // Calculate total for percentage display
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={140}
          paddingAngle={4}
          dataKey="value"
          nameKey="label"
          label={({ label, percent }) => 
            `${label}: ${(percent * 100).toFixed(1)}%`
          }
          labelLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={COLORS[index % COLORS.length]} 
              stroke="white"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value, name, props) => [
            `${value.toLocaleString()} (${((value / total) * 100).toFixed(1)}%)`,
            name
          ]}
          contentStyle={{
            backgroundColor: 'white',
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Legend 
          layout="horizontal" 
          verticalAlign="bottom" 
          align="center"
          wrapperStyle={{ paddingTop: '20px' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

/**
 * Main ChartRenderer Component
 */
const ChartRenderer = ({ chartType, data }) => {
  // Validate inputs
  if (!chartType || !data || !Array.isArray(data)) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-xl">
        <p className="text-gray-500">Invalid chart data provided</p>
      </div>
    );
  }

  // Render appropriate chart based on type
  const renderChart = () => {
    switch (chartType.toLowerCase()) {
      case 'bar':
        return renderBarChart(data);
      case 'line':
        return renderLineChart(data);
      case 'pie':
        return renderPieChart(data);
      default:
        // Default to bar chart for unknown types
        console.warn(`Unknown chart type: ${chartType}, defaulting to bar chart`);
        return renderBarChart(data);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 capitalize">
          {chartType} Chart Visualization
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="w-3 h-3 rounded-full bg-primary-500"></span>
          {data.length} data points
        </div>
      </div>
      {renderChart()}
    </div>
  );
};

export default ChartRenderer;