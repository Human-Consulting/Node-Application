export const inputStyle = {
    label: { color: '#fff' },
    input: { color: '#fff' },
    sx: {
        marginBottom: 1,
        backgroundColor: '#22272B',
        borderRadius: 1,
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
