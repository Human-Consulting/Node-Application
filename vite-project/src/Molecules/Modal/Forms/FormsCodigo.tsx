import { useRef, useState, useEffect } from "react";
import type { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction } from "react";
import { Box, Button, TextField, Typography, Stack } from '@mui/material';
import { Send, Restore } from '@mui/icons-material';
import { enviarCodigo } from "../../../Utils/cruds/CrudsUsuario";

interface FormsCodigoProps {
    email: string | null;
    setCodigoDigitado: Dispatch<SetStateAction<string | null>>;
    setIsValid: Dispatch<SetStateAction<boolean>>;
    codigoValidade: number | null;
    setCodigoValidade: Dispatch<SetStateAction<number | null>>;
    isValidTempo: boolean;
    setIsValidTempo: Dispatch<SetStateAction<boolean>>;
}

const FormsCodigo = ({ email, setCodigoDigitado, setIsValid, codigoValidade, setCodigoValidade, isValidTempo, setIsValidTempo }: FormsCodigoProps) => {

    const [values, setValues] = useState(['', '', '', '', '', '']);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const [tempoRestante, setTempoRestante] = useState("");

    useEffect(() => {
        const intervalo = setInterval(() => {
            const agora = Date.now();
            const diferenca = (codigoValidade ?? 0) - agora;

            if (diferenca <= 0) {
                setTempoRestante("00:00");
                clearInterval(intervalo);
                setIsValid(false);
                return;
            }

            const minutos = Math.floor(diferenca / 1000 / 60);
            const segundos = Math.floor((diferenca / 1000) % 60);
            setTempoRestante(`${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`);
        }, 1000);

        return () => clearInterval(intervalo);
    }, [codigoValidade, isValidTempo, setIsValid]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const newValue = e.target.value.replace(/[^0-9a-zA-Z]/g, '').slice(-1);
        const newValues = [...values];
        newValues[index] = newValue;
        setValues(newValues);

        if (newValue && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !values[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleReenviarCodigo = async () => {
        const body = { email };
        await enviarCodigo(body);
        setIsValidTempo(true);
        const tempoLimite = 5 * 60 * 1000;
        const validade = Date.now() + tempoLimite;
        setCodigoValidade(validade);
        setTimeout(() => setIsValidTempo(false), tempoLimite);
    };

    const handleValidarCodigo = () => {
        const codigoFinal = values.join('');

        if (codigoFinal.length === 6) {
            setCodigoDigitado(codigoFinal);
            setIsValid(true);
        } else {
            alert("Código incompleto.");
        }
    };

    return (
        <Box component="form" onSubmit={(e) => e.preventDefault()} display="flex" flexDirection="column" gap={2}>
            {isValidTempo ? <>
                <Typography variant="h5" textAlign="center" mb={2} >
                    Código expira em: {tempoRestante}
                </Typography>

                <Stack direction="row" spacing={1} justifyContent="center">
                    {values.map((val, index) => (
                        <TextField
                            key={index}
                            inputRef={el => { inputsRef.current[index] = el; }}
                            value={val}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            inputProps={{
                                maxLength: 1,
                                style: { textAlign: 'center', fontSize: '1.5rem', color: 'white' }
                            }}
                            sx={{
                                width: '3rem',
                                border: '1px solid #ccc',
                            }}
                        />
                    ))}
                </Stack>

                <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleReenviarCodigo}
                        endIcon={<Restore />}
                        sx={{ flex: 1 }}
                    >
                        Reenviar Código
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleValidarCodigo}
                        endIcon={<Send />}
                        sx={{ flex: 1 }}
                    >
                        Validar Código
                    </Button>
                </Stack>
            </> :
                <>
                    <Typography color="error" textAlign="center">
                        Código expirou. Clique em &quot;Reenviar Código&quot; e tente novamente.
                    </Typography>
                    <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleReenviarCodigo}
                            endIcon={<Restore />}
                            sx={{ flex: 1 }}
                        >
                            Reenviar Código
                        </Button>
                    </Stack>
                </>
            }
        </Box >
    );
};

export default FormsCodigo;
