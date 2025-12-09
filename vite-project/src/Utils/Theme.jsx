import { createTheme } from "@mui/material/styles";

const colors = {
  primary: "#36518C",

  dark: {
    background: "#0F0F0F",
    paper: "#1A1A1A",
    cardBg: "#1D1D1D",
    text: "#FFFFFF",
    textSecondary: "#BBBBBB",
    icon: "#FFFFFF",
    border: "#2A2A2A",

    sidebar: "#1d1d1d",
    sidebarItem: "#1a1a1a",
    sidebarItemHover: "#1a1a1a",
    sidebarBorderSelected: "#084B8A",

    scrollbar: "#888",
    scrollbarHover: "#aaa",
  },

  light: {
    background: "#f4f4f4",
    paper: "#E6E6E6",
    cardBg: "#d5d5d5",
    text: "#111111",
    textSecondary: "#444444",
    icon: "#111111",
    border: "#CCCCCC",

    sidebar: "#d4d4d4",
    sidebarItem: "#e0e0e0",
    sidebarItemHover: "#cfcfcf",
    sidebarBorderSelected: "#084B8A",

    scrollbar: "#888",
    scrollbarHover: "#666",
  },
};

export const getTheme = (mode = "dark") => {
  const isDark = mode === "dark";
  const themeColors = isDark ? colors.dark : colors.light;

  return createTheme({
    palette: {
      mode,

      primary: {
        main: colors.primary,
      },

      background: {
        default: themeColors.background,
        paper: themeColors.paper,
        cardBg: themeColors.cardBg,
      },

      text: {
        primary: themeColors.text,
        secondary: themeColors.textSecondary,
      },

      iconPrimary: themeColors.icon,
      borderPrimary: themeColors.border,

      custom: {
        sidebar: themeColors.sidebar,
        sidebarItem: themeColors.sidebarItem,
        sidebarItemHover: themeColors.sidebarItemHover,
        sidebarBorderSelected: themeColors.sidebarBorderSelected,
        scrollbar: themeColors.scrollbar,
        scrollbarHover: themeColors.scrollbarHover,
        textPrimary: themeColors.text,
      },

      error: {
        main: "#D32F2F",
      },
    },

    typography: {
      fontFamily: "Roboto, sans-serif",
      allVariants: {
        color: themeColors.text,
      },
    },

    components: {
      // CHIP
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            backgroundColor: themeColors.paper,
          },
          label: {
            color: themeColors.icon,
            fontSize: "12px",
            fontWeight: 400,
          },
        },
      },

      // INPUTS
      MuiTextField: {
        styleOverrides: {
          root: {
            input: {
              color: themeColors.text,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: themeColors.border,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.primary,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.primary,
            },
          },
        },
      },

      // BOTÕES
      MuiButton: {
        styleOverrides: {
          contained: {
            boxShadow: "none",
            backgroundColor: isDark ? colors.primary : "#7ED6A7",
            color: isDark ? "#fff" : "#111",
            "&:hover": {
              backgroundColor: isDark ? "#2C3E75" : "#6BC49A",
            },
            // Se tiver ícones dentro do botão, eles herdam a cor via `color: inherit`
            "& .MuiSvgIcon-root": {
              color: "inherit",
            },
          },
        },
      },

      // PAGINAÇÃO
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            color: themeColors.text,
          },
        },
      },

      // TOOLTIP
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: themeColors.paper,
            color: themeColors.text,
            fontSize: "12px",
          },
        },
      },

      // ÍCONES PADRÃO (SvgIcon)
      MuiSvgIcon: {
        // defaultProps garante que o atributo `fill` do svg seja aplicado (útil para alguns ícones)
        defaultProps: {
          htmlColor: themeColors.icon,
        },
        styleOverrides: {
          root: {
            color: themeColors.icon, // cor via CSS (currentColor)
            // fallback para caso fill não esteja respeitando color:
            fill: themeColors.icon,
            // garantia extra: se for usado dentro de algum componente com cor diferente, preferir currentColor
            "&.MuiSvgIcon-root": {
              fill: themeColors.icon,
            },
          },
        },
      },

      // ÍCONES DENTRO DE BOTÕES
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: themeColors.icon,
            // garante que SvgIcon internos herdem
            "& .MuiSvgIcon-root": {
              color: "inherit",
              fill: "inherit",
            },
          },
        },
      },

      // ÍCONES DO SIDEBAR / LISTAS
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: themeColors.icon,
            minWidth: "36px",
            "& .MuiSvgIcon-root": {
              color: "inherit",
              fill: "inherit",
            },
          },
        },
      },

      // ÍCONES EM INPUTS (search, password etc)
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            color: themeColors.icon,
            "& .MuiSvgIcon-root": {
              color: "inherit",
              fill: "inherit",
            },
          },
        },
      },

      // SCROLLBAR GLOBAL + garantia extra para SVGs herdarem currentColor
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: `${themeColors.scrollbar} transparent`,
            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-track": { background: "transparent" },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: themeColors.scrollbar,
              borderRadius: "6px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: themeColors.scrollbarHover,
            },
          },
          // garantia extra: force svg to use currentColor when possível
          "svg": {
            // muitos ícones respeitam `fill: currentColor`
            fill: "currentColor",
          },
        },
      },
    },
  });
};
