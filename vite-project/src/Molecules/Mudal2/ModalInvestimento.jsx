import { Box, Button, Dialog, DialogActions, Stack, TextField, Typography } from "@mui/material";
import { postInvestimento, putInvestimento } from '../../Utils/cruds/CrudsInvestimento.jsx';
import { Send, Close } from "@mui/icons-material";
import { useWarningValidator } from "../../Utils/useWarning.jsx";
import { inputStyle } from "../Modal/Forms/Forms.styles.jsx";
import { Content, Actions } from "./Modal.style.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router";


const ModalInvestimento = ({ open, onClose, investimento, toogleModal, atualizarEntidade }) => {
    const { idProjeto } = useParams();

    const [descricao, setDescricao] = useState(investimento?.descricao || "");
    const [valor, setValor] = useState(investimento?.valor || "");
    const [dtInvestimento, setDtInvestimento] = useState(investimento?.dtInvestimento || "");

    useEffect(() => {
        setDescricao(investimento?.descricao || "");
        setValor(investimento?.valor || "");
        setDtInvestimento(investimento?.dtInvestimento || "");
    }, [investimento]);

    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

    const handlePostInvestimento = async () => {
        const newInvestimento = { descricao, valor, dtInvestimento, fkProjeto: idProjeto, idEditor: usuarioLogado.idUsuario, permissaoEditor: usuarioLogado.permissao };
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
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
                <Content>
                    <Box display="flex" justifyContent="flex-end" alignItems="center">
                        <Close onClick={onClose} size="small" style={{ cursor: "pointer" }} />
                    </Box>
                    <Stack gap={3}>
                        <Typography width="100%" textAlign="center" color="#fff" fontWeight="bold" fontSize={18}>
                            {investimento == null ? "Criar Investimento" : "Editar Investimento"}
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
                            sx={inputStyle.sx}
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
                            sx={inputStyle.sx}
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
                            sx={inputStyle.sx}
                        />
                    </Stack>
                </Content>
                <Actions>
                    {investimento == null ? (
                        <Button variant="contained" color="primary" endIcon={<Send />} onClick={handlePostInvestimento}>
                            Adicionar
                        </Button>
                    ) : (
                        <Button variant="contained" color="primary" endIcon={<Send />} onClick={handlePutInvestimento}>
                            Salvar Alterações
                        </Button>
                    )}
                </Actions>
            </Dialog>
        </>
    );
}

export default ModalInvestimento;