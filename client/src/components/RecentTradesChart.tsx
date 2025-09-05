import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Trade, formatCurrency } from '../services/analyticsApi';

interface RecentTradesChartProps {
  trades: Trade[];
}

const RecentTradesChart: React.FC<RecentTradesChartProps> = ({ trades }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const trade = payload[0].payload;
      
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-semibold text-gray-900 mb-1">{trade.symbol}</p>
          <p className="text-sm text-gray-600">{`Date: ${trade.date}`}</p>
          <p className="text-sm text-gray-600">{`Entry: ${formatCurrency(trade.entryPrice)}`}</p>
          <p className="text-sm text-gray-600">{`Exit: ${formatCurrency(trade.exitPrice)}`}</p>
          <p className={`text-sm font-semibold ${trade.pnl >= 0 ? 'text-profit' : 'text-loss'}`}>
            {`P/L: ${formatCurrency(trade.pnl)} (${trade.pnlPercentage >= 0 ? '+' : ''}${trade.pnlPercentage}%)`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={trades} 
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="symbol" 
            stroke="#6B7280"
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={60}
            interval={0}
          />
          <YAxis 
            stroke="#6B7280"
            fontSize={12}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="pnl" radius={[2, 2, 0, 0]}>
            {trades.map((trade, index) => (
              <Cell
                key={`cell-${index}`}
                fill={trade.pnl >= 0 ? '#10B981' : '#EF4444'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RecentTradesChart;

