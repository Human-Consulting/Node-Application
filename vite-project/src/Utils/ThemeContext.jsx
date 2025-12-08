import { createContext, useState, useMemo, useEffect } from "react";
import { getTheme } from "../Utils/Theme";

export const ThemeContext = createContext();

export function ThemeProviderCustom({ children }) {
  // ✅ ESTADOS DO TEMA
  const [isDark, setIsDark] = useState(() => {
    const salvo = localStorage.getItem("theme-mode");
    return salvo ? JSON.parse(salvo) : false;
  });

  const [primaryColor, setPrimaryColor] = useState(() => {
    return localStorage.getItem("theme-primary") || "#1976d2"; // azul padrão
  });

  // ✅ SALVA NO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("theme-mode", JSON.stringify(isDark));
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem("theme-primary", primaryColor);
  }, [primaryColor]);

  const theme = useMemo(
    () =>
      getTheme(isDark ? "dark" : "light", primaryColor), // 👈 agora entra a cor
    [isDark, primaryColor]
  );

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        theme,
        toggle: () => setIsDark((p) => !p), // ✅ alterna claro/escuro
        primaryColor,
        setPrimaryColor // ✅ MUDA A COR DO SISTEMA
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
