// ThemeContext.jsx
import { createContext, useState } from "react";
import { lightTheme, darkTheme } from "../Utils/Theme";

export const ThemeContext = createContext();

// eslint-disable-next-line react/prop-types
export function ThemeProviderCustom({ children }) {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        theme: isDark ? darkTheme : lightTheme,
        toggle: () => setIsDark((p) => !p),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
