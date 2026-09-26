import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vstep_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (document.documentElement.classList.contains('dark')) return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('vstep_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.backgroundColor = '#111827';
      document.documentElement.style.colorScheme = 'dark';
      document.body.classList.add('dark-body');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.backgroundColor = '#f9fafb';
      document.documentElement.style.colorScheme = 'light';
      document.body.classList.remove('dark-body');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
