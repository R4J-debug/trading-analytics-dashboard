import React, { useState, useEffect } from 'react';
import MetricCard from './MetricCard';
import PLCurveChart from './PLCurveChart';
import WinLossChart from './WinLossChart';
import RecentTradesChart from './RecentTradesChart';
import TradesTable from './TradesTable';
import ThemeMenu from './LayoutSelector';
import LayoutDemo from './LayoutDemo';
import { 
  fetchAnalyticsData, 
  AnalyticsData, 
  formatCurrency, 
  formatPercentage 
} from '../services/analyticsApi';

const Dashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTheme, setCurrentTheme] = useState<string>('light');
  const [showLayoutDemo, setShowLayoutDemo] = useState<boolean>(false);

  useEffect(() => {
    const loadAnalyticsData = async () => {
      try {
        setLoading(true);
        const data = await fetchAnalyticsData();
        setAnalyticsData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load analytics data. Please try again.');
        console.error('Error loading analytics data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAnalyticsData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p className="text-gray-600">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error || !analyticsData) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="error-title">Error</div>
          <p className="text-gray-600">{error || 'No data available'}</p>
          <button 
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const getTrend = (value: number): 'positive' | 'negative' | 'neutral' => {
    if (value > 0) return 'positive';
    if (value < 0) return 'negative';
    return 'neutral';
  };

  const getThemeClass = () => {
    switch (currentTheme) {
      case 'dark':
        return 'theme-dark';
      case 'light':
      default:
        return ''; // Light theme (default)
    }
  };

  return (
    <div className={`dashboard-container ${getThemeClass()}`}>
      <ThemeMenu 
        currentTheme={currentTheme} 
        onThemeChange={setCurrentTheme} 
      />
      
      <button 
        className="layout-info-button"
        onClick={() => setShowLayoutDemo(true)}
        title="View Layout Information"
      >
        ℹ️
      </button>
      
      {showLayoutDemo && (
        <LayoutDemo onClose={() => setShowLayoutDemo(false)} />
      )}
      
      <div className="dashboard-content">
        {/* Header */}
        <div className="dashboard-header animate-fade-in">
          <h1 className="dashboard-title">
            📊 Trading Analytics Dashboard
          </h1>
          <p className="dashboard-subtitle">
            Comprehensive overview of your trading performance and metrics
          </p>
        </div>

        {/* Key Metrics */}
        <section className="hero-metrics-section">
          <div className="hero-metrics-grid">
            <MetricCard
              title="Portfolio Performance"
              value={formatPercentage(analyticsData.netPnLPercentage)}
              trend={getTrend(analyticsData.netPnLPercentage)}
              subtitle={`${formatCurrency(analyticsData.netPnL)} total P/L`}
              variant={analyticsData.netPnLPercentage > 0 ? 'success' : 'danger'}
              icon="💎"
              className="hero-card"
            />
            
            <MetricCard
              title="Win Rate"
              value={formatPercentage(analyticsData.winRate)}
              trend={getTrend(analyticsData.winRate - 50)}
              subtitle={`${analyticsData.winningTrades}/${analyticsData.totalTrades} trades`}
              variant={analyticsData.winRate > 50 ? 'success' : 'neutral'}
              icon="🎯"
              className="compact-card"
            />
            
            <MetricCard
              title="Profit Factor"
              value={analyticsData.profitFactor.toFixed(2)}
              trend={getTrend(analyticsData.profitFactor - 1)}
              subtitle={analyticsData.profitFactor >= 1 ? 'Profitable' : 'Unprofitable'}
              variant={analyticsData.profitFactor >= 1 ? 'success' : 'danger'}
              icon="💰"
              className="compact-card"
            />
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="performance-section">
          <div className="section-header">
            <h2 className="section-title">Performance Analytics</h2>
            <p className="section-subtitle">Trading performance metrics</p>
          </div>
          
          <div className="performance-grid">
            <MetricCard
              title="Average Return"
              value={formatPercentage(analyticsData.averageReturn)}
              trend={getTrend(analyticsData.averageReturn)}
              subtitle="Per trade"
              variant={analyticsData.averageReturn > 0 ? 'success' : 'danger'}
              icon="📈"
            />
            
            <MetricCard
              title="Max Drawdown"
              value={formatPercentage(-analyticsData.maxDrawdown)}
              trend="negative"
              subtitle="Peak to trough"
              variant="danger"
              icon="📉"
            />
            
            <MetricCard
              title="Sharpe Ratio"
              value={analyticsData.sharpeRatio.toFixed(2)}
              trend={getTrend(analyticsData.sharpeRatio - 1)}
              subtitle="Risk-adjusted return"
              variant={analyticsData.sharpeRatio > 1 ? 'success' : 'neutral'}
              icon="⚖️"
            />
            
            <MetricCard
              title="Total Trades"
              value={analyticsData.totalTrades}
              subtitle="All time"
              variant="neutral"
              icon="🔢"
            />
            
            <MetricCard
              title="Longest Win Streak"
              value={analyticsData.longestWinStreak}
              trend="positive"
              subtitle="Consecutive wins"
              variant="success"
              icon="🔥"
            />
            
            <MetricCard
              title="Longest Loss Streak"
              value={analyticsData.longestLossStreak}
              trend="negative"
              subtitle="Consecutive losses"
              variant="danger"
              icon="❄️"
            />
          </div>
        </section>

        {/* Charts */}
        <section className="charts-section">
          <div className="section-header">
            <h2 className="section-title">Performance Visualization</h2>
            <p className="section-subtitle">Portfolio and trading analysis</p>
          </div>
          
          <div className="charts-grid">
            <div className="main-chart">
              <MetricCard
                title="Portfolio Equity Curve"
                value=""
                className="chart-card"
                variant="neutral"
                icon="📈"
              >
                <PLCurveChart data={analyticsData.plCurveData} />
              </MetricCard>
            </div>
            
            <div className="side-chart">
              <MetricCard
                title="Win/Loss Distribution"
                value=""
                className="chart-card"
                variant="neutral"
                icon="🥧"
              >
                <WinLossChart data={analyticsData.winLossDistribution} />
              </MetricCard>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="activity-section">
          <div className="section-header">
            <h2 className="section-title">Recent Trading Activity</h2>
            <p className="section-subtitle">Latest trades and performance</p>
          </div>
          
          <div className="activity-grid">
            <div className="activity-chart">
              <MetricCard
                title="Recent Trades P/L"
                value=""
                subtitle="Last 10 trades"
                className="activity-card"
                variant="neutral"
                icon="📊"
              >
                <RecentTradesChart trades={analyticsData.recentTrades} />
              </MetricCard>
            </div>
            
            <div className="activity-table">
              <MetricCard
                title="Trade Details"
                value=""
                subtitle="Transaction history"
                className="activity-card"
                variant="neutral"
                icon="📋"
              >
                <TradesTable trades={analyticsData.recentTrades} />
              </MetricCard>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

