import React, { createContext, useContext, useState } from 'react';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

const steamColors = {
  dark: {
    background: '#2a475e', 
    card: '#1b2838', 
    text: '#c7d5e0',    
    textSecondary: '#66c0f4', 
    border: '#2a475e', 
    primary: '#66c0f4', 
    notification: '#4CAF50',
    danger: '#e74c3c',
  },
  light: {
    background: '#e6f0f7', 
    card: '#ffffff',
    text: '#1b2838', 
    textSecondary: '#3f7c9e',
    border: '#d6e2ea',
    primary: '#3f7c9e',
    notification: '#4CAF50',
    danger: '#c0392b',
  },
};

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: steamColors.dark.background,
    card: steamColors.dark.card,
    text: steamColors.dark.text,
    border: steamColors.dark.border,
    primary: steamColors.dark.primary,
    notification: steamColors.dark.notification,
    danger: steamColors.dark.danger,
  },
};

const MyLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: steamColors.light.background,
    card: steamColors.light.card,
    text: steamColors.light.text,
    border: steamColors.light.border,
    primary: steamColors.light.primary,
    notification: steamColors.light.notification,
    danger: steamColors.light.danger,
  },
};

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const theme = isDark ? MyDarkTheme : MyLightTheme;
  const currentColors = isDark ? steamColors.dark : steamColors.light;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme, colors: currentColors }}>
      {children}
    </ThemeContext.Provider>
  );
};