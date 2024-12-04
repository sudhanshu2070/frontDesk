import React, { useState, useEffect } from 'react';
import { predefinedThemes } from '../../utils/themes';
import { applyTheme } from '../../utils/themeUtils';

type Theme = {
    [key: string]: string;
  };
  
  const ThemeSelector: React.FC = () => {
    const [currentTheme, setCurrentTheme] = useState<string>('light'); // Default theme
    const [customTheme, setCustomTheme] = useState<Theme>({});
  
    // Load theme on initial render
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
  
    // Handle predefined theme changes
    const handleThemeChange = (themeName: string) => {
      setCurrentTheme(themeName);
      const theme = predefinedThemes[themeName];
      applyTheme(theme);
    };
  
    // Handle custom theme changes
    const handleCustomThemeChange = (key: string, value: string) => {
      const updatedTheme: Theme = { ...customTheme, [key]: value };
      setCustomTheme(updatedTheme);
      applyTheme(updatedTheme);
    };
  
    // Save custom theme to localStorage
    const saveCustomTheme = () => {
      localStorage.setItem('customTheme', JSON.stringify(customTheme));
      alert('Custom theme saved!');
    };
  
    return (
      <div className="theme-selector">
        <h3>Choose a Theme</h3>
        <select
          value={currentTheme}
          onChange={(e) => handleThemeChange(e.target.value)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
  
        <h3>Customize Theme</h3>
        <div>
          <label>Background Color:</label>
          <input
            type="color"
            value={customTheme['--bg-color'] || predefinedThemes[currentTheme]['--bg-color']}
            onChange={(e) => handleCustomThemeChange('--bg-color', e.target.value)}
          />
        </div>
        <div>
          <label>Text Color:</label>
          <input
            type="color"
            value={customTheme['--text-color'] || predefinedThemes[currentTheme]['--text-color']}
            onChange={(e) => handleCustomThemeChange('--text-color', e.target.value)}
          />
        </div>
        <div>
          <label>Accent Color:</label>
          <input
            type="color"
            value={customTheme['--accent-color'] || predefinedThemes[currentTheme]['--accent-color']}
            onChange={(e) => handleCustomThemeChange('--accent-color', e.target.value)}
          />
        </div>
        <button onClick={saveCustomTheme}>Save Custom Theme</button>
      </div>
    );
  };
  
  export default ThemeSelector;