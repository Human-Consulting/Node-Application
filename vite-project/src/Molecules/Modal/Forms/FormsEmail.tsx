import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { TextField, Stack } from '@mui/material';
import { inputStyle } from "./Forms.styles";
import { Send } from '@mui/icons-material';
import { getIdUsuario, enviarCodigo } from "../../../Utils/cruds/CrudsUsuario";
import { Actions } from "../../Mudal2/Modal.style";
import Button from "@mui/material/Button";

interface FormsEmailProps {
    setCodigoEnviado: Dispatch<SetStateAction<boolean>>;
    setEmail: Dispatch<SetStateAction<string | null>>;
    setId: Dispatch<SetStateAction<number | string | null>>;
    setCodigoValidade: Dispatch<SetStateAction<number | null>>;
    setIsValidTempo: Dispatch<SetStateAction<boolean>>;
}

const FormsEmail = ({ setCodigoEnviado, setEmail, setId, setCodigoValidade, setIsValidTempo }: FormsEmailProps) => {

    const [email, setEmailSend] = useState("");

    const [erros, setErros] = useState<Record<string, string>>({});

    const handleEnvioEmail = async () => {
        if (!validarCampos()) return;
        setErros({});
        const id = await getIdUsuario(email);
        if (id) {
            setId(id as number | string);
            const body = { email };

            const envio = await enviarCodigo(body);
            if (envio) {
                setEmail(email);
                setCodigoEnviado(true);
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
        const novosErros: Record<string, string> = {};

        if (!email.trim()) novosErros.email = "Email é obrigatório";
        else if (!emailRegex.test(email)) novosErros.email = "Formato de email inválido";

        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    };

    const removerErro = (campo: string) => {
        setErros((prevErros) => {
            const { [campo]: _removed, ...resto } = prevErros;
            void _removed;
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
                        removerErro("email");
                        setEmailSend(e.target.value);
                    }}
                    fullWidth
                    variant="outlined"
                    autoComplete="off"
                    InputLabelProps={{ sx: inputStyle.label }}
                    InputProps={{ sx: inputStyle.input }}
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
    );
};

export default FormsEmail;
