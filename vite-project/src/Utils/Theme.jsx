import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#1976d2",
    },

    background: {
      default: "#d4d4d4",
      paper: "#eeeeee",
    },

    custom: {
      sidebar: "#d4d4d4",
      sidebarItem: "#e0e0e0",
      sidebarItemHover: "#cfcfcf",
      sidebarBorderSelected: "#084B8A",
      scrollbar: "#888",
      scrollbarHover: "#666",
      textPrimary: "#000000",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#90caf9",
    },

    background: {
      default: "#1d1d1d",
      paper: "#1a1a1a",
    },

    custom: {
      sidebar: "#1d1d1d",
      sidebarItem: "#1a1a1a",
      sidebarItemHover: "#1a1a1a",
      sidebarBorderSelected: "#084B8A",
      scrollbar: "#888",
      scrollbarHover: "#aaa",
      textPrimary: "#ffffff",
    },
  },
});
