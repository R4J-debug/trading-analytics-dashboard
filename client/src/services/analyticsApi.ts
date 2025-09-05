export interface Trade {
  id: number;
  date: string;
  symbol: string;
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  pnlPercentage: number;
  tradeType: 'profit' | 'loss';
}

export interface PLCurveData {
  date: string;
  value: number;
  return: number;
}

export interface WinLossDistribution {
  name: string;
  value: number;
  color: string;
}

export interface AnalyticsData {
  winRate: number;
  profitFactor: number;
  averageReturn: number;
  maxDrawdown: number;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  longestWinStreak: number;
  longestLossStreak: number;
  sharpeRatio: number;
  netPnL: number;
  netPnLPercentage: number;
  recentTrades: Trade[];
  plCurveData: PLCurveData[];
  winLossDistribution: WinLossDistribution[];
}

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const fetchAnalyticsData = async (): Promise<AnalyticsData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: AnalyticsData = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    throw new Error('Failed to fetch analytics data');
  }
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(amount);
};

export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};

