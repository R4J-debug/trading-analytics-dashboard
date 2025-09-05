import React from 'react';
import { Trade, formatCurrency, formatPercentage } from '../services/analyticsApi';

interface TradesTableProps {
  trades: Trade[];
}

const TradesTable: React.FC<TradesTableProps> = ({ trades }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short'
    });
  };

  const getPnlIcon = (pnl: number) => {
    return pnl >= 0 ? '↗️' : '↘️';
  };

  return (
    <div className="trades-table-container">
      <div className="trades-table-header">
        <div className="table-header-cell date-header">📅 Date</div>
        <div className="table-header-cell symbol-header">🏷️ Symbol</div>
        <div className="table-header-cell price-header">💰 Entry</div>
        <div className="table-header-cell price-header">💸 Exit</div>
        <div className="table-header-cell pnl-header">📊 P/L</div>
        <div className="table-header-cell return-header">📈 Return</div>
      </div>
      
      <div className="trades-table-body">
        {trades.map((trade, index) => (
          <div key={trade.id} className={`trade-row ${trade.pnl >= 0 ? 'trade-profit' : 'trade-loss'}`}>
            <div className="trade-cell date-cell">
              <div className="cell-content">
                <span className="date-text">{formatDate(trade.date)}</span>
                <span className="year-text">{new Date(trade.date).getFullYear()}</span>
              </div>
            </div>
            
            <div className="trade-cell symbol-cell">
              <div className="cell-content">
                <span className="symbol-text">{trade.symbol}</span>
                <span className="trade-type">{trade.tradeType || 'BUY'}</span>
              </div>
            </div>
            
            <div className="trade-cell price-cell">
              <div className="cell-content">
                <span className="price-value">{formatCurrency(trade.entryPrice)}</span>
              </div>
            </div>
            
            <div className="trade-cell price-cell">
              <div className="cell-content">
                <span className="price-value">{formatCurrency(trade.exitPrice)}</span>
              </div>
            </div>
            
            <div className="trade-cell pnl-cell">
              <div className="cell-content">
                <span className="pnl-icon">{getPnlIcon(trade.pnl)}</span>
                <span className={`pnl-value ${trade.pnl >= 0 ? 'positive' : 'negative'}`}>
                  {formatCurrency(trade.pnl)}
                </span>
              </div>
            </div>
            
            <div className="trade-cell return-cell">
              <div className="cell-content">
                <span className={`return-badge ${trade.pnl >= 0 ? 'return-positive' : 'return-negative'}`}>
                  {formatPercentage(trade.pnlPercentage)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradesTable;

