import type { SxProps, Theme } from '@mui/material';

interface InputStyle {
    label: SxProps<Theme>;
    input: SxProps<Theme>;
    sx: SxProps<Theme>;
}

export const inputStyle: InputStyle = {
    // `sx` (not `style`) so these theme path strings ('text.primary') resolve
    // against the live theme on every render - consumed via TextField's
    // `InputLabelProps={{ sx: ... }}` / `InputProps={{ sx: ... }}` across
    // 15+ call sites, all updated from `style:` to `sx:` alongside this change.
    label: { color: 'text.primary' },
    input: { color: 'text.primary' },
    sx: {
        // `background` (below) is a shorthand and wins over `backgroundColor`
        // in the cascade, so the two hex values here were already a
        // duplicate-key situation; consolidated into one theme-aware token.
        backgroundColor: 'background.paper',
        borderRadius: '10px',

        "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "#999"
        },
        "& textarea::-webkit-scrollbar": {
            width: "8px",
        },
        "& textarea::-webkit-scrollbar-track": {
            background: "#1a1a1a",
            borderRadius: "4px",
        },
        "& textarea::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "4px",
        },
        "& textarea::-webkit-scrollbar-thumb:hover": {
            background: "#aaa",
        }
    }
};
