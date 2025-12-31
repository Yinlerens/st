import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  isDarkMode: boolean;
  fontSize: number;
  toggleTheme: () => void;
  setFontSize: (size: number) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      isDarkMode: false,
      fontSize: 16,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setFontSize: (size: number) => set({ fontSize: size }),
    }),
    {
      name: 'theme-storage',
    }
  )
);
