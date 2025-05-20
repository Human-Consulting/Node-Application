import { useState } from "react";
import { putSenhaUsuario } from '../../Utils/cruds/CrudsUsuario.jsx';
import { Box, Button, TextField, Typography, Stack } from '@mui/material';
import { inputStyle } from "./Forms.styles.jsx";
import SendIcon from '@mui/icons-material/Send';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

const FormsEditarSenhaUsuario = ({ idUsuario, atualizarUsuarios, editarSenhaUsuario }) => {

    const [senhaAtual, setSenhaAtual] = useState('');
    const [senhaAtualizada, setSenhaAtualizada] = useState('');
    const [confirmarSenhaAtualizada, setConfirmarSenhaAtualizada] = useState('');

    const [showSenhaAtual, setShowSenhaAtual] = useState(false);
    const [showSenhaAtualizada, setShowSenhaAtualizada] = useState(false);
    const [showConfirmarSenhaAtualizada, setShowConfirmarSenhaAtualizada] = useState(false);

    const [erroConfirmarSenha, setErroConfirmarSenha] = useState(false);
    const [erroTamanhoSenha, setErroTamanhoSenha] = useState(false);
    const [erroTamanhoSenhaAtual, setErroTamanhoSenhaAtual] = useState(false);

    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

    const handlePutUsuario = async () => {
        if (senhaAtual.length < 6) {
            setErroTamanhoSenhaAtual(true);
            return;
        }

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
        setErroTamanhoSenhaAtual(false);

        const modifiedUsuario = {
            idEditor: usuarioLogado.idUsuario,
            senhaAtual,
            senhaAtualizada
        }
        await putSenhaUsuario(modifiedUsuario, idUsuario);
        editarSenhaUsuario();
        atualizarUsuarios();
    }

    return (
        <Box component="form" onSubmit={(e) => e.preventDefault()} display="flex" flexDirection="column" gap={2}>
            <Typography variant="h5" textAlign="center" mb={2}>
                Editar Senha
            </Typography>

            <TextField
                label="Senha Atual"
                type={showSenhaAtual ? "text" : "password"}
                value={senhaAtual}
                onChange={(e) => {
                    setSenhaAtual(e.target.value);
                    setErroTamanhoSenhaAtual(false);
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
                                onClick={() => setShowSenhaAtual(!showSenhaAtual)}
                                edge="end"
                            >
                                {showSenhaAtual ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                sx={inputStyle.sx}
                error={erroTamanhoSenhaAtual}
                helperText={erroTamanhoSenhaAtual ? "A senha deve ter pelo menos 6 dígitos!" : ""}
            />

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