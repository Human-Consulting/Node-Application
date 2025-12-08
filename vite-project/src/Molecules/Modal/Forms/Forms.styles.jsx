export const inputStyle = (theme) => ({
  label: {
    color: theme.palette.text.primary,
  },

  input: {
    color: theme.palette.text.primary,
  },

  sx: {
    marginBottom: 1,
    backgroundColor: theme.palette.background.paper, // ← AQUI resolve o fundo preto
    borderRadius: 1,

    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: theme.palette.text.disabled,
    },

    "& textarea::-webkit-scrollbar": {
      width: "8px",
    },

    "& textarea::-webkit-scrollbar-track": {
      background: theme.palette.background.default,
      borderRadius: "4px",
    },

    "& textarea::-webkit-scrollbar-thumb": {
      background: theme.palette.divider,
      borderRadius: "4px",
    },

    "& textarea::-webkit-scrollbar-thumb:hover": {
      background: theme.palette.text.secondary,
    },
  },
});
