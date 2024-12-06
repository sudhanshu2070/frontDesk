import React, { useState, useEffect } from 'react';
import { predefinedThemes } from '../../utils/themes';
import { applyTheme } from '../../utils/themeUtils';
import './ThemeSelector.css';

type Theme = {
  [key: string]: string;
};

const ThemeSelector: React.FC = () => {
  const [currentView, setCurrentView] = useState<'site' | 'navbar'>('site');
  const [currentTheme] = useState<string>('light');
  const [customTheme, setCustomTheme] = useState<Theme>({});
  const [navbarTheme, setNavbarTheme] = useState<Theme>({
    '--navbar-bg-color': '#ffffff',
    '--navbar-text-color': '#000000',
    '--navbar-font-style': 'normal',
  });

  const [contentKey, setContentKey] = useState(0); // Key to re-trigger animations

  useEffect(() => {
    const savedTheme = localStorage.getItem('customTheme');
    if (savedTheme) {
      const theme: Theme = JSON.parse(savedTheme);
      setCustomTheme(theme);
      applyTheme(theme);
    } else {
      applyTheme(predefinedThemes[currentTheme]);
    }
  }, [currentTheme]);

  const handleSiteThemeChange = (key: string, value: string) => {
    const updatedTheme = { ...customTheme, [key]: value };
    setCustomTheme(updatedTheme);
    applyTheme(updatedTheme);
  };

  const handleNavbarThemeChange = (key: string, value: string) => {
    const updatedTheme = { ...navbarTheme, [key]: value };
    setNavbarTheme(updatedTheme);
    applyTheme(updatedTheme);
  };

  const saveThemes = () => {
    localStorage.setItem('customTheme', JSON.stringify(customTheme));
    localStorage.setItem('navbarTheme', JSON.stringify(navbarTheme));
    alert('Themes saved!');
  };

  const switchView = (view: 'site' | 'navbar') => {
    setCurrentView(view);
    setContentKey((prevKey) => prevKey + 1); // Increment key to re-trigger animation
  };

  return (
    <div className="theme-selector-container">
      <div className="theme-selector-popup">
        {/* Sidebar */}
        <div className="theme-selector-sidebar">
          <button
            className={`theme-toggle-btn ${currentView === 'site' ? 'active' : ''}`}
            onClick={() => switchView('site')}
          >
            Site Theme
          </button>
          <button
            className={`theme-toggle-btn ${currentView === 'navbar' ? 'active' : ''}`}
            onClick={() => switchView('navbar')}
          >
            Navbar Theme
          </button>
        </div>

        {/* Content */}
        <div key={contentKey} className="theme-selector-content">
          {currentView === 'site' && (
            <>
              <h3>Customize Site Theme</h3>
              <div className="custom-input">
                <label>Background Color:</label>
                <input
                  type="color"
                  value={customTheme['--bg-color'] || predefinedThemes[currentTheme]['--bg-color']}
                  onChange={(e) => handleSiteThemeChange('--bg-color', e.target.value)}
                />
              </div>
              <div className="custom-input">
                <label>Text Color:</label>
                <input
                  type="color"
                  value={customTheme['--text-color'] || predefinedThemes[currentTheme]['--text-color']}
                  onChange={(e) => handleSiteThemeChange('--text-color', e.target.value)}
                />
              </div>
              <div className="custom-input">
                <label>Accent Color:</label>
                <input
                  type="color"
                  value={customTheme['--accent-color'] || predefinedThemes[currentTheme]['--accent-color']}
                  onChange={(e) => handleSiteThemeChange('--accent-color', e.target.value)}
                />
              </div>
            </>
          )}

          {currentView === 'navbar' && (
            <>
              <h3>Customize Navbar Theme</h3>
              <div className="custom-input">
                <label>Navbar Background Color:</label>
                <input
                  type="color"
                  value={navbarTheme['--navbar-bg-color']}
                  onChange={(e) =>
                    handleNavbarThemeChange('--navbar-bg-color', e.target.value)
                  }
                />
              </div>
              <div className="custom-input">
                <label>Navbar Text Color:</label>
                <input
                  type="color"
                  value={navbarTheme['--navbar-text-color']}
                  onChange={(e) =>
                    handleNavbarThemeChange('--navbar-text-color', e.target.value)
                  }
                />
              </div>
              <div className="custom-input">
                <label>Navbar Font Style:</label>
                <select
                  value={navbarTheme['--navbar-font-style']}
                  onChange={(e) =>
                    handleNavbarThemeChange('--navbar-font-style', e.target.value)
                  }
                >
                  <option value="normal">Normal</option>
                  <option value="italic">Italic</option>
                  <option value="bold">Bold</option>
                </select>
              </div>
            </>
          )}

          <button onClick={saveThemes} className="save-theme-btn">
            Save Themes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;