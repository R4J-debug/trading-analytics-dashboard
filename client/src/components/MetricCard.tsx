import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  variant?: 'default' | 'success' | 'danger' | 'neutral';
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  trend = 'neutral',
  icon,
  className = '',
  children,
  variant = 'default'
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'positive':
        return 'text-profit';
      case 'negative':
        return 'text-loss';
      default:
        return 'text-neutral-600';
    }
  };

  const getBadgeColor = () => {
    switch (trend) {
      case 'positive':
        return 'bg-green-100 text-green-800';
      case 'negative':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCardVariant = () => {
    switch (variant) {
      case 'success':
        return 'card-success';
      case 'danger':
        return 'card-danger';
      case 'neutral':
        return 'card-neutral';
      default:
        return '';
    }
  };

  return (
    <div className={`card ${getCardVariant()} animate-slide-up ${className}`}>
      <div className="card-header">
        <div className="card-content">
          <div className={`card-title ${className?.includes('activity-card') ? 'activity-title-row' : ''}`}>
            <div className="title-left">
              {icon && <div className="text-gray-500">{icon}</div>}
              <h3>{title}</h3>
            </div>
            
            {className?.includes('activity-card') && subtitle && (
              <div className="title-right">
                <span className="activity-subtitle">
                  {subtitle.toUpperCase()}
                </span>
              </div>
            )}
          </div>
          
          {!className?.includes('activity-card') && (
            <div className="card-value">
              <span className={`card-value-main ${getTrendColor()}`}>
                {value}
              </span>
              {subtitle && (
                <span className={`card-subtitle ${getBadgeColor()}`}>
                  {subtitle}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      
      {children && (
        <div className={className?.includes('activity-card') ? 'activity-content' : 'card-children'}>
          {children}
        </div>
      )}
    </div>
  );
};

export default MetricCard;

