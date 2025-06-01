import { useState } from "react";
import { Box, Button, TextField, Typography, Stack } from '@mui/material';
import { inputStyle } from "./Forms.styles.jsx";
import SendIcon from '@mui/icons-material/Send';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { putEsqueciASenhaUsuario } from "../../Utils/Cruds/CrudsUsuario.jsx";

const FormsEditarSenhaUsuario = ({ id, toggleModal }) => {

    const [senhaAtualizada, setSenhaAtualizada] = useState('');
    const [confirmarSenhaAtualizada, setConfirmarSenhaAtualizada] = useState('');

    const [showSenhaAtualizada, setShowSenhaAtualizada] = useState(false);
    const [showConfirmarSenhaAtualizada, setShowConfirmarSenhaAtualizada] = useState(false);

    const [erroConfirmarSenha, setErroConfirmarSenha] = useState(false);
    const [erroTamanhoSenha, setErroTamanhoSenha] = useState(false);

    const handlePutUsuario = async () => {

        if (senhaAtualizada.length < 6) {
            setErroTamanhoSenha(true);
            return;
        }

        if (senhaAtualizada !== confirmarSenhaAtualizada) {
            setErroConfirmarSenha(true);
            setConfirmarSenhaAtualizada('');
            return;
        }

        setErroConfirmarSenha(false);
        setErroTamanhoSenha(false);

        const body = {senhaAtualizada};
        const resposta = await putEsqueciASenhaUsuario(body, id);
        if (resposta) {
            toggleModal();
            setSenhaAtualizada('');
            setConfirmarSenhaAtualizada('');
        }
    }

    return (
        <Box component="form" onSubmit={(e) => e.preventDefault()} display="flex" flexDirection="column" gap={2}>
            <Typography variant="h5" textAlign="center" mb={2}>
                Editar Senha
            </Typography>

            <TextField
                label="Nova Senha"
                type={showSenhaAtualizada ? "text" : "password"}
                value={senhaAtualizada}
                onChange={(e) => {
                    setSenhaAtualizada(e.target.value);
                    setErroTamanhoSenha(false);
                }}
                fullWidth
                variant="outlined"
                autoComplete="off"
                InputLabelProps={{ style: inputStyle.label }}
                InputProps={{
                    style: inputStyle.input,
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowSenhaAtualizada(!showSenhaAtualizada)}
                                edge="end"
                            >
                                {showSenhaAtualizada ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                sx={inputStyle.sx}
                error={erroTamanhoSenha}
                helperText={erroTamanhoSenha ? "A senha deve ter pelo menos 6 dígitos!" : ""}
            />

            <TextField
                label="Confirmar Nova Senha"
                type={showConfirmarSenhaAtualizada ? "text" : "password"}
                value={confirmarSenhaAtualizada}
                onChange={(e) => {
                    setConfirmarSenhaAtualizada(e.target.value);
                    setErroConfirmarSenha(false);
                }}
                fullWidth
                variant="outlined"
                autoComplete="off"
                InputLabelProps={{ style: inputStyle.label }}
                InputProps={{
                    style: inputStyle.input,
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowConfirmarSenhaAtualizada(!showConfirmarSenhaAtualizada)}
                                edge="end"
                            >
                                {showConfirmarSenhaAtualizada ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                sx={inputStyle.sx}
                error={erroConfirmarSenha}
                helperText={erroConfirmarSenha ? "As senhas devem ser iguais!" : ""}
            />

            <Stack direction="row" spacing={2} justifyContent="center" mt={2}>

                < Button
                    variant="contained"
                    color="primary"
                    onClick={handlePutUsuario}
                    endIcon={<SendIcon />}
                    sx={{ flex: 1 }}
                >
                    SALVAR
                </Button>
            </Stack>
        </Box >
    )
}

export default FormsEditarSenhaUsuario