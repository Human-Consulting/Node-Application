import { Box, Button, Dialog, Stack, TextField, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSprint, putSprint, deleteSprint, SprintPayload, EditorBody } from '../../Utils/cruds/CrudsSprint';
import { Close, Delete, Send } from "@mui/icons-material";
import { useWarningValidator } from "../../Utils/useWarning";
import { inputStyle } from "../Modal/Forms/Forms.styles";
import { useEffect, useState } from "react";
import { Content, Actions } from "./Modal.style";
import dayjs from "dayjs";
import { useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";

interface SprintEntity {
    idSprint?: number;
    titulo?: string;
    descricao?: string;
    dtInicio?: string;
    dtFim?: string;
    [key: string]: unknown;
}

interface ModalSprintProps {
    open: boolean;
    onClose: () => void;
    sprint?: SprintEntity | null;
    toogleModal: () => void;
    fkProjeto?: number | string;
    atualizarSprints: () => void | Promise<unknown>;
    atualizarProjetos?: () => void | Promise<unknown>;
    dtLastSprint?: string | null;
}

interface SprintErros {
    titulo?: string;
    descricao?: string;
    dtInicio?: string;
    dtFim?: string;
}

const ModalSprint = ({ open, onClose, sprint, toogleModal, fkProjeto, atualizarSprints, atualizarProjetos, dtLastSprint }: ModalSprintProps) => {
    const { idProjeto, idSprint: idSprintParam } = useParams();
    const queryClient = useQueryClient();

    const diaSeguinte = dayjs(dtLastSprint).add(1, 'day').format("YYYY-MM-DD");

    const [titulo, setTitulo] = useState(sprint?.titulo || "");
    const [descricao, setDescricao] = useState(sprint?.descricao || "");
    const [dtInicio, setDtInicio] = useState(sprint?.dtInicio || diaSeguinte);
    const [dtFim, setDtFim] = useState(sprint?.dtFim || "");

    // Keep fields synced with the sprint being edited (create vs edit switch).
    useEffect(() => {
        setTitulo(sprint?.titulo || "");
        setDescricao(sprint?.descricao || "");
        setDtInicio(sprint?.dtInicio || diaSeguinte);
        setDtFim(sprint?.dtFim || "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sprint]);

    const [erros, setErros] = useState<SprintErros>({});

    const { usuario: usuarioLogado } = useAuth();

    // Reuses the exact query-key conventions Task.tsx (['sprints', idProjeto])
    // and CentralTask.tsx (['sprint', idSprint]) use for their sprint data,
    // grabbed straight off the URL so this works no matter which screen
    // rendered the modal.
    const invalidarSprints = () => Promise.all([
        queryClient.invalidateQueries({ queryKey: ['sprints', idProjeto] }),
        queryClient.invalidateQueries({ queryKey: ['sprint', idSprintParam] }),
    ]);

    const postSprintMutation = useMutation({
        mutationFn: (payload: SprintPayload) => postSprint(payload),
    });

    const putSprintMutation = useMutation({
        mutationFn: ({ payload, idSprint }: { payload: Partial<SprintPayload> & EditorBody; idSprint: number | string }) =>
            putSprint(payload, idSprint),
    });

    const deleteSprintMutation = useMutation({
        mutationFn: ({ idSprint, body }: { idSprint: number | string; body: EditorBody }) =>
            deleteSprint(idSprint, body),
    });

    const validarCampos = () => {
        const novosErros: SprintErros = {};

        if (!titulo.trim()) novosErros.titulo = "Título é obrigatório";
        if (!descricao.trim()) novosErros.descricao = "Descrição é obrigatória";
        if (!dtInicio.trim()) novosErros.dtInicio = "Data de início é obrigatória";
        if (!dtFim.trim()) novosErros.dtFim = "Data de finalização é obrigatória";

        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    };

    const handlePostSprint = async () => {
        if (!validarCampos()) return;
        setErros({});
        const newSprint: SprintPayload = { titulo, descricao, dtInicio, dtFim, fkProjeto, idEditor: usuarioLogado?.idUsuario, permissaoEditor: usuarioLogado?.permissao };
        const response = await postSprintMutation.mutateAsync(newSprint);
        if (response) {
            await invalidarSprints();
            atualizarSprints();
            atualizarProjetos?.();
            toogleModal();
        }
    };

    const handleDeleteSprint = async () => {
        if (sprint?.idSprint == null) return;
        const bodyDelete: EditorBody = { idEditor: usuarioLogado?.idUsuario, permissaoEditor: usuarioLogado?.permissao };
        const response = await deleteSprintMutation.mutateAsync({ idSprint: sprint.idSprint, body: bodyDelete });
        toogleModal();
        if (response) {
            await invalidarSprints();
            await atualizarSprints();
            await atualizarProjetos?.();
        }
    }

    const handlePutSprint = async () => {
        if (!validarCampos()) return;
        setErros({});
        if (sprint?.idSprint == null) return;

        const modifiedSprint: Partial<SprintPayload> & EditorBody = {
            idEditor: usuarioLogado?.idUsuario,
            permissaoEditor: usuarioLogado?.permissao,
            titulo,
            descricao,
            dtInicio,
            dtFim
        }
        const response = await putSprintMutation.mutateAsync({ payload: modifiedSprint, idSprint: sprint.idSprint });
        if (response) {
            await invalidarSprints();
            atualizarSprints();
            atualizarProjetos?.();
            toogleModal();
        }
    }

    const removerErro = (campo: keyof SprintErros) => {
        setErros((prevErros) => {
            const { [campo]: _removed, ...resto } = prevErros;
            return resto;
        });
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs"
                sx={{ zIndex: 150 }}
            >
                <Content>
                    <Box display="flex" justifyContent={useWarningValidator(sprint) !== null ? "space-between" : "flex-end"} alignItems="center">
                        {useWarningValidator(sprint)}
                        <Close onClick={onClose} style={{ cursor: "pointer" }} />
                    </Box>
                    <Stack gap={3}>
                        <Typography width="100%" textAlign="center" color="#fff" fontWeight="bold" fontSize={18}>
                            {sprint == null ? "Criar Sprint" : "Editar Sprint"}
                        </Typography>

                        <TextField
                            label="Título"
                            type="text"
                            value={titulo}
                            onChange={(e) => {
                                removerErro("titulo")
                                setTitulo(e.target.value)
                            }}
                            fullWidth
                            disabled={usuarioLogado?.permissao === "FUNC"}
                            variant="outlined"
                            InputLabelProps={{ sx: inputStyle.label }}
                            InputProps={{ sx: inputStyle.input }}
                            sx={inputStyle.sx}
                            error={!!erros.titulo}
                            helperText={erros.titulo}
                        />
                        <TextField
                            label="Descrição"
                            multiline
                            rows={3}
                            value={descricao}
                            onChange={(e) => {
                                removerErro("descricao")
                                setDescricao(e.target.value)
                            }}
                            fullWidth
                            disabled={usuarioLogado?.permissao === "FUNC"}
                            variant="outlined"
                            InputLabelProps={{ sx: inputStyle.label }}
                            InputProps={{ sx: inputStyle.input }}
                            sx={inputStyle.sx}
                            error={!!erros.descricao}
                            helperText={erros.descricao}
                        />
                        <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                            <TextField
                                label="Data de Início"
                                type="date"
                                value={dtInicio}
                                onChange={(e) => {
                                    removerErro("dtInicio")
                                    setDtInicio(e.target.value)
                                }}
                                disabled={usuarioLogado?.permissao === "FUNC"}
                                fullWidth
                                variant="outlined"
                                InputLabelProps={{ shrink: true, sx: inputStyle.label }}
                                InputProps={{ sx: inputStyle.input }}
                                sx={inputStyle.sx}
                                error={!!erros.dtInicio}
                                helperText={erros.dtInicio}
                            />
                            <TextField
                                label="Data Final"
                                type="date"
                                value={dtFim}
                                onChange={(e) => {
                                    removerErro("dtFim")
                                    setDtFim(e.target.value)
                                }}
                                disabled={usuarioLogado?.permissao === "FUNC"}
                                fullWidth
                                variant="outlined"
                                InputLabelProps={{ shrink: true, sx: inputStyle.label }}
                                InputProps={{ sx: inputStyle.input }}
                                sx={inputStyle.sx}
                                error={!!erros.dtFim}
                                helperText={erros.dtFim}
                            />
                        </Stack>
                    </Stack>
                </Content>
                <Actions>
                    {sprint == null ? (
                        <Button variant="contained" color="primary" onClick={handlePostSprint}>
                            Adicionar
                        </Button>
                    ) : usuarioLogado?.permissao == 'FUNC' ? null :
                        <>
                            <Button variant="contained" color="error" onClick={handleDeleteSprint}>
                                <Delete />
                            </Button>
                            < Button variant="contained" color="primary" onClick={handlePutSprint} endIcon={<Send />} sx={{ flex: 1 }}>
                                Salvar Alterações
                            </Button>
                        </>
                    }
                </Actions>
            </Dialog>
        </>
    );
}

export default ModalSprint;
