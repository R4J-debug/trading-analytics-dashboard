import React from 'react';

interface LayoutDemoProps {
  onClose: () => void;
}

const LayoutDemo: React.FC<LayoutDemoProps> = ({ onClose }) => {
  return (
    <div className="layout-demo-overlay">
      <div className="layout-demo-modal">
        <div className="demo-header">
          <h2>🎨 Layout Design Features</h2>
          <button onClick={onClose} className="demo-close">✕</button>
        </div>
        
        <div className="demo-content">
          <div className="demo-section">
            <h3>🏗️ Enhanced Layout Structure</h3>
            <div className="demo-grid">
              <div className="demo-item">
                <div className="demo-icon">📐</div>
                <h4>Asymmetric Grid</h4>
                <p>Hero section uses 2:1 ratio for visual hierarchy</p>
              </div>
              
              <div className="demo-item">
                <div className="demo-icon">🎯</div>
                <h4>Progressive Disclosure</h4>
                <p>Information organized in logical sections</p>
              </div>
              
              <div className="demo-item">
                <div className="demo-icon">✨</div>
                <h4>Micro-interactions</h4>
                <p>Hover effects and smooth animations</p>
              </div>
            </div>
          </div>
          
          <div className="demo-section">
            <h3>🎨 Design Principles Applied</h3>
            <div className="demo-principles">
              <div className="principle">
                <strong>Visual Hierarchy:</strong> Hero metrics prominently displayed in top-left
              </div>
              <div className="principle">
                <strong>White Space:</strong> Strategic spacing for better readability
              </div>
              <div className="principle">
                <strong>Grouping:</strong> Related metrics clustered together
              </div>
              <div className="principle">
                <strong>Consistency:</strong> Unified design language across all components
              </div>
              <div className="principle">
                <strong>Responsiveness:</strong> Adaptive layouts for all screen sizes
              </div>
            </div>
          </div>
          
          <div className="demo-section">
            <h3>🌟 New Layout Sections</h3>
            <div className="demo-sections">
              <div className="section-demo">
                <span className="section-number">1</span>
                <div>
                  <strong>Hero Metrics</strong>
                  <p>Primary performance indicator with supporting metrics</p>
                </div>
              </div>
              
              <div className="section-demo">
                <span className="section-number">2</span>
                <div>
                  <strong>Performance Analytics</strong>
                  <p>Detailed trading performance breakdown</p>
                </div>
              </div>
              
              <div className="section-demo">
                <span className="section-number">3</span>
                <div>
                  <strong>Trading Streaks</strong>
                  <p>Win/loss streak analysis in focused layout</p>
                </div>
              </div>
              
              <div className="section-demo">
                <span className="section-number">4</span>
                <div>
                  <strong>Visualization</strong>
                  <p>Charts with 2:1 asymmetric layout</p>
                </div>
              </div>
              
              <div className="section-demo">
                <span className="section-number">5</span>
                <div>
                  <strong>Activity Details</strong>
                  <p>Recent trades with comprehensive table view</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutDemo;
