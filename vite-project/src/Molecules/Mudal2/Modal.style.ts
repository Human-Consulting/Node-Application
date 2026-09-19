import { styled, DialogContent, DialogActions } from "@mui/material";

// Was previously a duplicate `background` key (dead code - the second
// literal silently won at runtime). Resolved to the theme's paper surface,
// matching the winning near-black value's intent.
export const Content = styled(DialogContent)(({ theme }) => ({
    background: theme.palette.background.paper,
}));

export const Actions = styled(DialogActions)(({ theme }) => ({
    padding: '2',
    background: theme.palette.background.paper,
}));
