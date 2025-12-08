import { createContext, useState, useMemo } from "react";
import { getTheme } from "../Utils/Theme";

export const ThemeContext = createContext();

export function ThemeProviderCustom({ children }) {
  const [isDark, setIsDark] = useState(false);

  const theme = useMemo(
    () => getTheme(isDark ? "dark" : "light"),
    [isDark]
  );

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        theme,
        toggle: () => setIsDark((p) => !p),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
