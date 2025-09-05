const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data generation functions
function generateRandomInRange(min, max, decimals = 2) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function generateMockTrades(count = 10) {
  const symbols = ['RELIANCE', 'TCS', 'HDFC', 'INFY', 'ITC', 'SBIN', 'HDFCBANK', 'ICICIBANK', 'BHARTIARTL', 'KOTAKBANK'];
  const trades = [];
  
  for (let i = 0; i < count; i++) {
    const entryPrice = generateRandomInRange(100, 3000, 2);
    const exitPrice = generateRandomInRange(entryPrice * 0.8, entryPrice * 1.2, 2);
    const pnl = parseFloat((exitPrice - entryPrice).toFixed(2));
    const pnlPercentage = parseFloat(((pnl / entryPrice) * 100).toFixed(2));
    
    trades.push({
      id: i + 1,
      date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      entryPrice: entryPrice,
      exitPrice: exitPrice,
      pnl: pnl,
      pnlPercentage: pnlPercentage,
      tradeType: pnl >= 0 ? 'profit' : 'loss'
    });
  }
  
  return trades.reverse(); // Most recent first
}

function calculateStreaks(trades) {
  let currentWinStreak = 0;
  let currentLossStreak = 0;
  let maxWinStreak = 0;
  let maxLossStreak = 0;
  
  trades.forEach(trade => {
    if (trade.pnl >= 0) {
      currentWinStreak++;
      currentLossStreak = 0;
      maxWinStreak = Math.max(maxWinStreak, currentWinStreak);
    } else {
      currentLossStreak++;
      currentWinStreak = 0;
      maxLossStreak = Math.max(maxLossStreak, currentLossStreak);
    }
  });
  
  return { maxWinStreak, maxLossStreak };
}

function generateAnalyticsData() {
  const totalTrades = generateRandomInRange(50, 200, 0);
  const recentTrades = generateMockTrades(10);
  
  // Generate all historical trades for calculations
  const allTrades = generateMockTrades(totalTrades);
  const winningTrades = allTrades.filter(trade => trade.pnl >= 0);
  const losingTrades = allTrades.filter(trade => trade.pnl < 0);
  
  const winRate = parseFloat(((winningTrades.length / totalTrades) * 100).toFixed(2));
  
  const totalProfits = winningTrades.reduce((sum, trade) => sum + trade.pnl, 0);
  const totalLosses = Math.abs(losingTrades.reduce((sum, trade) => sum + trade.pnl, 0));
  const profitFactor = totalLosses > 0 ? parseFloat((totalProfits / totalLosses).toFixed(2)) : totalProfits;
  
  const averageReturn = parseFloat((allTrades.reduce((sum, trade) => sum + trade.pnlPercentage, 0) / totalTrades).toFixed(2));
  
  const netPnL = parseFloat((totalProfits - totalLosses).toFixed(2));
  const netPnLPercentage = parseFloat(((netPnL / 100000) * 100).toFixed(2)); // Assuming ₹1,00,000 initial capital
  
  const { maxWinStreak, maxLossStreak } = calculateStreaks(allTrades);
  
  // Generate P/L curve data for chart
  const plCurveData = [];
  let cumulativePnL = 100000; // Starting capital
  
  for (let i = 0; i < 30; i++) {
    const dailyReturn = generateRandomInRange(-2, 3, 2);
    cumulativePnL += (cumulativePnL * dailyReturn / 100);
    plCurveData.push({
      date: new Date(Date.now() - ((29 - i) * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      value: parseFloat(cumulativePnL.toFixed(2)),
      return: dailyReturn
    });
  }
  
  // Calculate max drawdown
  let peak = plCurveData[0].value;
  let maxDrawdown = 0;
  
  plCurveData.forEach(point => {
    if (point.value > peak) {
      peak = point.value;
    }
    const drawdown = ((peak - point.value) / peak) * 100;
    maxDrawdown = Math.max(maxDrawdown, drawdown);
  });
  
  return {
    winRate,
    profitFactor,
    averageReturn,
    maxDrawdown: parseFloat(maxDrawdown.toFixed(2)),
    totalTrades,
    winningTrades: winningTrades.length,
    losingTrades: losingTrades.length,
    longestWinStreak: maxWinStreak,
    longestLossStreak: maxLossStreak,
    sharpeRatio: generateRandomInRange(0.8, 2.2, 2),
    netPnL,
    netPnLPercentage,
    recentTrades,
    plCurveData,
    winLossDistribution: [
      { name: 'Winning Trades', value: winningTrades.length, color: '#10B981' },
      { name: 'Losing Trades', value: losingTrades.length, color: '#EF4444' }
    ]
  };
}

// Routes
app.get('/analytics', (req, res) => {
  try {
    const analyticsData = generateAnalyticsData();
    res.json(analyticsData);
  } catch (error) {
    console.error('Error generating analytics data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Analytics server running on port ${PORT}`);
  console.log(`📊 Analytics endpoint: http://localhost:${PORT}/analytics`);
});

