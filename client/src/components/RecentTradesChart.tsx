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
      const isProfit = trade.pnl >= 0;
      const formattedDate = new Date(trade.date).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short'
      });
      
      return (
        <div className="chart-tooltip">
          <div className="tooltip-header">
            <div className="tooltip-symbol">
              <span className="symbol-icon">📊</span>
              <span className="symbol-text">{trade.symbol}</span>
            </div>
            <div className={`tooltip-badge ${isProfit ? 'tooltip-badge-profit' : 'tooltip-badge-loss'}`}>
              {isProfit ? '↗️' : '↘️'} {trade.pnlPercentage >= 0 ? '+' : ''}{trade.pnlPercentage.toFixed(2)}%
            </div>
          </div>
          
          <div className="tooltip-details">
            <div className="tooltip-row">
              <span className="tooltip-label">📅 Date</span>
              <span className="tooltip-value">{formattedDate}</span>
            </div>
            <div className="tooltip-row">
              <span className="tooltip-label">💰 Entry</span>
              <span className="tooltip-value">{formatCurrency(trade.entryPrice)}</span>
            </div>
            <div className="tooltip-row">
              <span className="tooltip-label">💸 Exit</span>
              <span className="tooltip-value">{formatCurrency(trade.exitPrice)}</span>
            </div>
          </div>
          
          <div className="tooltip-pnl">
            <span className="pnl-label">Profit/Loss</span>
            <span className={`pnl-value ${isProfit ? 'pnl-profit' : 'pnl-loss'}`}>
              {formatCurrency(trade.pnl)}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container recent-trades-chart">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={trades} 
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.6} />
          <XAxis 
            dataKey="symbol" 
            stroke="#6B7280"
            fontSize={11}
            angle={-45}
            textAnchor="end"
            height={60}
            interval={0}
            tick={{ fontSize: 11, fontWeight: 500 }}
          />
          <YAxis 
            stroke="#6B7280"
            fontSize={11}
            tick={{ fontSize: 11, fontWeight: 500 }}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ 
              fill: 'rgba(59, 130, 246, 0.1)',
              stroke: 'rgba(59, 130, 246, 0.3)',
              strokeWidth: 2,
              radius: 4
            }}
            animationDuration={200}
            animationEasing="ease-out"
          />
          <Bar 
            dataKey="pnl" 
            radius={[4, 4, 0, 0]}
            animationDuration={800}
            animationEasing="ease-out"
          >
            {trades.map((trade, index) => (
              <Cell
                key={`cell-${index}`}
                fill={trade.pnl >= 0 ? '#10B981' : '#EF4444'}
                className="chart-bar"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RecentTradesChart;

