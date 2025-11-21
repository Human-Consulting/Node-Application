import { useState } from "react";
import { postInvestimento, putInvestimento } from '../../../Utils/cruds/CrudsInvestimento.jsx';
import { Box, Button, TextField, Typography } from '@mui/material';
import { inputStyle } from "./Forms.styles.jsx";
import SendIcon from '@mui/icons-material/Send';
import { useParams } from "react-router";

const FormsInvestimento = ({ investimento, toogleModal, atualizarEntidade }) => {

    const { idProjeto } = useParams();

    const [descricao, setDescricao] = useState(investimento?.descricao || "");
    const [valor, setValor] = useState(investimento?.valor || "");
    const [dtInvestimento, setDtInvestimento] = useState(investimento?.dtInvestimento || "");

    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

    const handlePostInvestimento = async () => {
        const newInvestimento = { 
            descricao, 
            valor, 
            dtInvestimento, 
            fkProjeto: idProjeto, 
            idEditor: usuarioLogado.idUsuario, 
            permissaoEditor: usuarioLogado.permissao 
        };
        toogleModal();
        await postInvestimento(newInvestimento, toogleModal);
        atualizarEntidade();
    };

    const handlePutInvestimento = async () => {
        const modifiedInvestimento = {
            idEditor: usuarioLogado.idUsuario,
            permissaoEditor: usuarioLogado.permissao,
            fkProjeto: idProjeto,
            descricao,
            valor,
            dtInvestimento
        }
        toogleModal();
        await putInvestimento(modifiedInvestimento, investimento.idInvestimento);
        await atualizarEntidade();
    }

    return (
        <Box component="form" onSubmit={(e) => e.preventDefault()} display="flex" flexDirection="column" gap={2}>
            <Typography 
                variant="h5" 
                textAlign="center" 
                mb={2}
                sx={(theme) => ({
                    color: theme.palette.custom.textPrimary
                })}
            >
                {investimento == null ? "Adicionar Investimento" : `Visualizar Investimento`}
            </Typography>

            <TextField
                label="Descrição"
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                fullWidth
                variant="outlined"
                InputLabelProps={{ style: inputStyle.label }}
                InputProps={{ style: inputStyle.input }}
                sx={(theme) => ({
                    ...inputStyle.sx,
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: theme.palette.custom.inputBackground,
                        color: theme.palette.custom.textPrimary
                    }
                })}
            />

            <TextField
                label="Valor"
                type="number"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                fullWidth
                variant="outlined"
                InputLabelProps={{ style: inputStyle.label }}
                InputProps={{ style: inputStyle.input }}
                sx={(theme) => ({
                    ...inputStyle.sx,
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: theme.palette.custom.inputBackground,
                        color: theme.palette.custom.textPrimary
                    }
                })}
            />

            <TextField
                label="Data do Investimento"
                type="date"
                disabled={usuarioLogado.permissao === 'FUNC'}
                value={dtInvestimento}
                onChange={(e) => setDtInvestimento(e.target.value)}
                fullWidth
                variant="outlined"
                InputLabelProps={{ style: inputStyle.label, shrink: true }}
                InputProps={{ style: inputStyle.input }}
                sx={(theme) => ({
                    ...inputStyle.sx,
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: theme.palette.custom.inputBackground,
                        color: theme.palette.custom.textPrimary
                    }
                })}
            />

            {investimento == null ? (
                <Button 
                    variant="contained" 
                    color="primary" 
                    endIcon={<SendIcon />} 
                    onClick={handlePostInvestimento}
                    sx={(theme) => ({
                        backgroundColor: theme.palette.custom.button,
                        color: theme.palette.custom.buttonText,
                        '&:hover': {
                            backgroundColor: theme.palette.custom.buttonHover
                        }
                    })}
                >
                    Adicionar
                </Button>
            ) : (
                <Button 
                    variant="contained" 
                    color="primary" 
                    endIcon={<SendIcon />} 
                    onClick={handlePutInvestimento}
                    sx={(theme) => ({
                        backgroundColor: theme.palette.custom.button,
                        color: theme.palette.custom.buttonText,
                        '&:hover': {
                            backgroundColor: theme.palette.custom.buttonHover
                        }
                    })}
                >
                    Salvar Alterações
                </Button>
            )}
        </Box>
    )
}

export default FormsInvestimento;
