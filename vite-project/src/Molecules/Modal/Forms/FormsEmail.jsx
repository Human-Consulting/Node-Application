import { useState } from "react";
import { Box, Button, TextField, Stack } from '@mui/material';
import { inputStyle } from "./Forms.styles.jsx";
import { Send } from '@mui/icons-material';
import { getIdUsuario, enviarCodigo } from "../../../Utils/Cruds/CrudsUsuario.jsx";
import { Actions } from "../../Mudal2/Modal.style.jsx";

const FormsEmail = ({ setCodigo, setEmail, setId, setCodigoValidade, setIsValidTempo }) => {

    const [email, setEmailSend] = useState("");

    const [erros, setErros] = useState({});

    const gerarCodigo = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    const handleEnvioEmail = async () => {
        if (!validarCampos()) return;
        setErros({});
        const id = await getIdUsuario(email);
        if (id) {
            setId(id);
            const codigo = gerarCodigo();
            const body = { email, codigo };

            const envio = await enviarCodigo(body);
            if (envio) {
                setEmail(email);
                setCodigo(codigo);
                setIsValidTempo(true);

                const tempoLimite = 5 * 60 * 1000;
                const validade = Date.now() + tempoLimite;
                setCodigoValidade(validade);
                setTimeout(() => setIsValidTempo(false), tempoLimite);
            }
        }
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validarCampos = () => {
        const novosErros = {};

        if (!email.trim()) novosErros.email = "Email é obrigatório";
        else if (!emailRegex.test(email)) novosErros.email = "Formato de email inválido";

        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    };

    const removerErro = (campo) => {
        setErros((prevErros) => {
            const { [campo]: _, ...resto } = prevErros;
            return resto;
        });
    };


    return (
        <>
            <Stack sx={{ padding: 2 }}>
                <TextField
                    label="Email para envio do código"
                    value={email}
                    onChange={(e) => {
                        removerErro("email")
                        setEmailSend(e.target.value)
                    }}
                    fullWidth
                    variant="outlined"
                    autoComplete="off"
                    InputLabelProps={{ style: inputStyle.label }}
                    InputProps={{ style: inputStyle.input }}
                    sx={inputStyle.sx}
                    error={!!erros.email}
                    helperText={erros.email}
                />
            </Stack>

            <Actions>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEnvioEmail}
                    endIcon={<Send />}
                // sx={{ flex: 1 }}
                >
                    Enviar Código
                </Button>
            </Actions>
        </>
    )
}

export default FormsEmail