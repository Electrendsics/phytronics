import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('phytronics-theme') || 'auto';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    const applyTheme = () => {
      root.classList.remove('light', 'dark');
      
      let activeTheme = theme;
      
      if (theme === 'auto') {
        const hour = new Date().getHours();
        const isNight = hour >= 18 || hour < 6;
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        activeTheme = isNight || systemPrefersDark ? 'dark' : 'light';
      }
      
      root.classList.add(activeTheme);
      // Ensures data-theme is set for any libraries that depend on it
      root.setAttribute('data-theme', activeTheme);
    };

    applyTheme();
    localStorage.setItem('phytronics-theme', theme);

    // If auto is selected, listen for system theme changes
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme();
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);