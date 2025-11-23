import { Box, Button, Dialog, DialogActions, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { Close, Send, Visibility, VisibilityOff } from "@mui/icons-material";
import { useWarningValidator } from "../../Utils/useWarning.jsx";
import { inputStyle } from "../Modal/Forms/Forms.styles.jsx";
import { Content, Actions } from "./Modal.style.jsx";
import { useState } from "react";


const ModalEditarSenhaUsuario = ({ open, onClose, idUsuario, atualizarUsuarios, editarSenhaUsuario }) => {
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
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
                <Content>
                    <Box display="flex" justifyContent="flex-end" alignItems="center">
                        <Close onClick={onClose} size="small" style={{ cursor: "pointer" }} />
                    </Box>
                    <Stack gap={3}>
                        <Typography width="100%" textAlign="center" color="#fff" fontWeight="bold" fontSize={18}>
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
                    </Stack>
                </Content>
                <Actions>
                    < Button
                        variant="contained"
                        color="primary"
                        onClick={handlePutUsuario}
                        endIcon={<Send />}
                    >
                        SALVAR
                    </Button>
                </Actions>
            </Dialog>
        </>
    );
}

export default ModalEditarSenhaUsuario;