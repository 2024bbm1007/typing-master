import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

/**
 * Custom hook for theme management
 * Provides access to theme state and controls
 */
const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

export default useTheme;
