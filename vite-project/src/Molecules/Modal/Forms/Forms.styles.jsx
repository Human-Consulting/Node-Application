export const inputStyle = {
    label: { color: '#fff' },
    input: { color: '#fff' },
    sx: {
        backgroundColor: '#22272B',
        borderRadius: '10px',
        background: '#1A1E22',
        // background: '#1D1D1D',

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
