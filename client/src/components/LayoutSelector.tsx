import React, { useState } from 'react';

interface ThemeMenuProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const ThemeMenu: React.FC<ThemeMenuProps> = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    {
      id: 'light',
      name: 'Light Mode',
      icon: '☀️'
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      icon: '🌙'
    }
  ];

  const handleThemeChange = (themeId: string) => {
    onThemeChange(themeId);
    setIsOpen(false);
  };

  return (
    <div className="theme-menu">
      <button 
        className="theme-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Theme menu"
      >
        <div className="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      
      {isOpen && (
        <div className="theme-dropdown">
          <div className="theme-dropdown-header">
            <span>Theme</span>
          </div>
          {themes.map((theme) => (
            <button
              key={theme.id}
              className={`theme-option ${currentTheme === theme.id ? 'active' : ''}`}
              onClick={() => handleThemeChange(theme.id)}
            >
              <span className="theme-icon">{theme.icon}</span>
              <span className="theme-name">{theme.name}</span>
              {currentTheme === theme.id && (
                <span className="check-icon">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
      
      {isOpen && (
        <div 
          className="theme-overlay" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ThemeMenu;
