import { Box, Button, Dialog, Stack, TextField, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postInvestimento, putInvestimento, Investimento, InvestimentoPayload, EditorBody } from '../../Utils/cruds/CrudsInvestimento';
import { Send, Close } from "@mui/icons-material";
import { useWarningValidator } from "../../Utils/useWarning";
import { inputStyle } from "../Modal/Forms/Forms.styles";
import { Content, Actions } from "./Modal.style";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";

interface ModalInvestimentoProps {
    open: boolean;
    onClose: () => void;
    investimento?: Investimento | null;
    toogleModal: (investimento: Investimento | null) => void;
    atualizarEntidade: () => void | Promise<unknown>;
}

const ModalInvestimento = ({ open, onClose, investimento, toogleModal, atualizarEntidade }: ModalInvestimentoProps) => {
    const { idProjeto } = useParams();
    const queryClient = useQueryClient();

    const [descricao, setDescricao] = useState(investimento?.descricao || "");
    const [valor, setValor] = useState<number | string>(investimento?.valor || "");
    const [dtInvestimento, setDtInvestimento] = useState(investimento?.dtInvestimento || "");

    useEffect(() => {
        setDescricao(investimento?.descricao || "");
        setValor(investimento?.valor || "");
        setDtInvestimento(investimento?.dtInvestimento || "");
    }, [investimento]);

    const { usuario: usuarioLogado } = useAuth();

    const invalidarDashboard = () => Promise.all([
        queryClient.invalidateQueries({ queryKey: ['dashboard', idProjeto] }),
        queryClient.invalidateQueries({ queryKey: ['burndown', idProjeto] }),
    ]);

    const postInvestimentoMutation = useMutation({
        mutationFn: (payload: InvestimentoPayload) => postInvestimento(payload),
    });

    const putInvestimentoMutation = useMutation({
        mutationFn: ({ payload, idInvestimento }: { payload: Partial<InvestimentoPayload> & EditorBody; idInvestimento: number | string }) =>
            putInvestimento(payload, idInvestimento),
    });

    const handlePostInvestimento = async () => {
        const newInvestimento: InvestimentoPayload = { descricao, valor, dtInvestimento, fkProjeto: idProjeto, idEditor: usuarioLogado?.idUsuario, permissaoEditor: usuarioLogado?.permissao };
        toogleModal(null);
        await postInvestimentoMutation.mutateAsync(newInvestimento);
        await invalidarDashboard();
        atualizarEntidade();
    };

    const handlePutInvestimento = async () => {
        if (investimento?.idInvestimento == null) return;

        const modifiedInvestimento: Partial<InvestimentoPayload> & EditorBody = {
            idEditor: usuarioLogado?.idUsuario,
            permissaoEditor: usuarioLogado?.permissao,
            fkProjeto: idProjeto,
            descricao,
            valor,
            dtInvestimento
        }
        toogleModal(null);
        await putInvestimentoMutation.mutateAsync({ payload: modifiedInvestimento, idInvestimento: investimento.idInvestimento });
        await invalidarDashboard();
        await atualizarEntidade();
    }

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
                <Content>
                    <Box display="flex" justifyContent="flex-end" alignItems="center">
                        <Close onClick={onClose} style={{ cursor: "pointer" }} />
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
                            InputLabelProps={{ sx: inputStyle.label }}
                            InputProps={{ sx: inputStyle.input }}
                            sx={inputStyle.sx}
                        />
                        <TextField
                            label="Valor"
                            type="number"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{ sx: inputStyle.label }}
                            InputProps={{ sx: inputStyle.input }}
                            sx={inputStyle.sx}
                        />
                        <TextField
                            label="Data do Investimento"
                            type="date"
                            disabled={usuarioLogado?.permissao === 'FUNC'}
                            value={dtInvestimento}
                            onChange={(e) => setDtInvestimento(e.target.value)}
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{ sx: inputStyle.label, shrink: true }}
                            InputProps={{ sx: inputStyle.input }}
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
