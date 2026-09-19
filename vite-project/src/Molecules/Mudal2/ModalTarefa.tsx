import { Box, Button, Checkbox, Dialog, IconButton, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postTask, putTask, deleteTask, putImpedimento, Task, TaskPayload, EditorBody, Checkpoint } from '../../Utils/cruds/CrudsTask';
import { Usuario } from "../../Utils/cruds/CrudsUsuario";
import { Add, CheckCircle, CheckCircleOutlined, Close, Delete, Send } from "@mui/icons-material";
import SelectUsuarios from "../Modais/SelectUsuarios/SelectUsuarios";
import { useWarningValidator } from "../../Utils/useWarning";
import { inputStyle } from "../Modal/Forms/Forms.styles";
import { Content, Actions } from "./Modal.style";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";

interface TaskEntity {
    idTarefa?: number;
    titulo?: string;
    descricao?: string;
    dtInicio?: string;
    dtFim?: string;
    responsavel?: { idUsuario?: number | string; [key: string]: unknown } | null;
    comentario?: string;
    comImpedimento?: boolean;
    checkpoints?: Checkpoint[];
    progresso?: number;
    [key: string]: unknown;
}

interface ModalTarefaProps {
    open: boolean;
    onClose: () => void;
    task?: TaskEntity | null;
    toogleModal: () => void;
    atualizarSprints: () => void | Promise<unknown>;
    atualizarProjetos?: () => void | Promise<unknown>;
    usuarios?: Usuario[];
    sizeUsuarios?: number;
    pagesUsuarios?: number;
    atualizarUsuarios?: (page?: number, nome?: string | null) => void | Promise<unknown>;
    idSprint?: number | string | null;
    dtInicioSprint?: string | null;
    dtFimSprint?: string | null;
}

interface TarefaErros {
    titulo?: string;
    descricao?: string;
    dtInicio?: string;
    dtFim?: string;
    fkResponsavel?: string;
}

const ModalTarefa = ({ open, onClose, task, toogleModal, atualizarSprints, atualizarProjetos, usuarios, sizeUsuarios, pagesUsuarios, atualizarUsuarios, idSprint, dtInicioSprint, dtFimSprint }: ModalTarefaProps) => {
    const { idProjeto, idSprint: idSprintParam } = useParams();
    const queryClient = useQueryClient();

    const [titulo, setTitulo] = useState(task?.titulo || "");
    const [descricao, setDescricao] = useState(task?.descricao || "");
    const [dtInicio, setDtInicio] = useState(task?.dtInicio || "");
    const [dtFim, setDtFim] = useState(task?.dtFim || "");
    const [responsavel, setResponsavel] = useState<TaskEntity['responsavel']>(task?.responsavel || null);
    const [fkResponsavel, setFkResponsavel] = useState<string | number>(task?.responsavel?.idUsuario || '#');
    const [comentario, setComentario] = useState(task?.comentario || "");
    const [comImpedimento, setComImpedimento] = useState(task?.comImpedimento);
    const [checkpoints, setCheckpoints] = useState<Checkpoint[]>(task?.checkpoints || []);

    useEffect(() => {
        setTitulo(task?.titulo || "");
        setDescricao(task?.descricao || "");
        setDtInicio(task?.dtInicio || "");
        setDtFim(task?.dtFim || "");
        setResponsavel(task?.responsavel || null);
        setFkResponsavel(task?.responsavel?.idUsuario || '#');
        setComentario(task?.comentario || "");
        setComImpedimento(task?.comImpedimento);
        setCheckpoints(task?.checkpoints || []);
    }, [task])

    const [erros, setErros] = useState<TarefaErros>({});

    const validarCampos = () => {
        const novosErros: TarefaErros = {};

        if (!titulo.trim()) novosErros.titulo = "Título é obrigatório";
        if (!dtInicio.trim()) novosErros.dtInicio = "Data de início é obrigatória";
        if (!dtFim.trim()) novosErros.dtFim = "Data de finalização é obrigatória";

        if (dtInicio && dtFim) {
            const inicio = new Date(dtInicio);
            const fim = new Date(dtFim);
            const inicioSprint = new Date(dtInicioSprint || "");
            const fimSprint = new Date(dtFimSprint || "");

            if (inicio > fim) {
                novosErros.dtFim = "Data de finalização deve ser depois da data de início";
            }

            if (inicio < inicioSprint) {
                novosErros.dtInicio = `Data de início deve ser após o início da sprint (${dayjs(dtInicioSprint).format("DD/MM/YYYY")})`;
            }

            if (fim > fimSprint) {
                novosErros.dtFim = `Data de finalização deve ser antes do fim da sprint (${dayjs(dtFimSprint).format("DD/MM/YYYY")})`;
            }
        }


        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    };

    const { usuario: usuarioLogado } = useAuth();

    // Reuses the same queryKey conventions Task.tsx (['sprints', idProjeto])
    // and CentralTask.tsx (['sprint', idSprint]) rely on for their sprint
    // data, pulled straight off the URL so this works regardless of which
    // screen rendered the modal.
    const invalidarSprints = () => Promise.all([
        queryClient.invalidateQueries({ queryKey: ['sprints', idProjeto] }),
        queryClient.invalidateQueries({ queryKey: ['sprint', idSprintParam] }),
    ]);

    const postTaskMutation = useMutation({
        mutationFn: (payload: TaskPayload) => postTask(payload),
    });

    const putTaskMutation = useMutation({
        mutationFn: ({ payload, idTarefa }: { payload: Partial<TaskPayload> & EditorBody; idTarefa: number | string }) =>
            putTask(payload, idTarefa),
    });

    const deleteTaskMutation = useMutation({
        mutationFn: ({ idTarefa, body }: { idTarefa: number | string; body: EditorBody }) =>
            deleteTask(idTarefa, body),
    });

    const putImpedimentoMutation = useMutation({
        mutationFn: ({ modifiedTask, body, idTarefa }: { modifiedTask: Task; body: EditorBody; idTarefa: number | string }) =>
            putImpedimento(modifiedTask, body, idTarefa),
    });

    const handlePostTask = async () => {
        if (!validarCampos()) return;
        setErros({});
        let newFkResponsavel: string | number | null;

        if (fkResponsavel == "#") newFkResponsavel = null;
        else newFkResponsavel = fkResponsavel;

        const newTask: TaskPayload = { fkSprint: idSprint ?? undefined, titulo, descricao, dtInicio, dtFim, comentario, fkResponsavel: newFkResponsavel, checkpoints, idEditor: usuarioLogado?.idUsuario, permissaoEditor: usuarioLogado?.permissao };
        const response = await postTaskMutation.mutateAsync(newTask);
        if (response) {
            await invalidarSprints();
            toogleModal();
            atualizarSprints();
            atualizarProjetos?.();
        }
    };

    const handleImpedimentoTask = async () => {
        if (task?.idTarefa == null) return;
        const body: EditorBody = { idEditor: usuarioLogado?.idUsuario, permissaoEditor: usuarioLogado?.permissao };
        const modifiedTask: Task = {
            idEditor: usuarioLogado?.idUsuario,
            permissaoEditor: usuarioLogado?.permissao,
            titulo,
            descricao,
            dtInicio,
            dtFim,
            comImpedimento,
            comentario,
            fkResponsavel,
            checkpoints
        };
        const response = await putImpedimentoMutation.mutateAsync({ modifiedTask, body, idTarefa: task.idTarefa });
        if (response) {
            await invalidarSprints();
            toogleModal();
            atualizarSprints();
            atualizarProjetos?.();
        }
    }

    const handlePutTask = async () => {
        if (!validarCampos()) return;
        setErros({});
        if (task?.idTarefa == null) return;
        let newFkResponsavel: string | number | null;

        if (fkResponsavel == "#") newFkResponsavel = null;
        else newFkResponsavel = fkResponsavel;

        const modifiedTask: Partial<TaskPayload> & EditorBody = {
            idEditor: usuarioLogado?.idUsuario,
            permissaoEditor: usuarioLogado?.permissao,
            titulo,
            descricao,
            dtInicio,
            dtFim,
            comImpedimento,
            comentario,
            fkResponsavel: newFkResponsavel,
            checkpoints
        };
        const response = await putTaskMutation.mutateAsync({ payload: modifiedTask, idTarefa: task.idTarefa });
        if (response) {
            await invalidarSprints();
            toogleModal();
            atualizarSprints();
            atualizarProjetos?.();
        }
    };

    const handleDeleteTask = async () => {
        if (task?.idTarefa == null) return;
        const bodyDelete: EditorBody = { idEditor: usuarioLogado?.idUsuario, permissaoEditor: usuarioLogado?.permissao };
        const response = await deleteTaskMutation.mutateAsync({ idTarefa: task.idTarefa, body: bodyDelete });
        if (response) {
            await invalidarSprints();
            toogleModal();
            atualizarProjetos?.();
            atualizarSprints();
        }
    };

    const handleAddCheckbox = () => {
        const newId = checkpoints.length + 1;
        setCheckpoints([...checkpoints, { idCheckpoint: `${newId}`, descricao: '', finalizado: false }]);
    };

    const handleToggleCheckbox = (id?: string | number) => {
        setCheckpoints(checkpoints.map(cb => cb.idCheckpoint === id ? { ...cb, finalizado: !cb.finalizado } : cb));
    };

    const handleLabelChange = (id: string | number | undefined, newLabel: string) => {
        setCheckpoints(checkpoints.map(cb => cb.idCheckpoint === id ? { ...cb, descricao: newLabel } : cb));
    };

    const removerErro = (campo: keyof TarefaErros) => {
        setErros((prevErros) => {
            const resto = { ...prevErros };
            delete resto[campo];
            return resto;
        });
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="md"
                sx={{ zIndex: 150 }}
            >
                <Content>
                    <Box display="flex" justifyContent={useWarningValidator(task) !== null ? "space-between" : "flex-end"} alignItems="center">
                        {useWarningValidator(task)}
                        <Close onClick={onClose} style={{ cursor: "pointer" }} />
                    </Box>
                    <Stack gap={3}>
                        <Typography width="100%" textAlign="center" color="text.primary" fontWeight="bold" fontSize={18}>
                            {task == null ? "Criar Tarefa" : "Editar Tarefa"}
                        </Typography>

                        <Stack direction="row" justifyContent="space-between" mb={2} gap='50px' >
                            <Box component="form" onSubmit={(e) => e.preventDefault()} display="flex" flexDirection="column" gap={2} flex='1'>

                                <TextField
                                    label="Título"
                                    type="text"
                                    disabled={usuarioLogado?.permissao === 'FUNC'}
                                    value={titulo}
                                    onChange={(e) => {
                                        removerErro("titulo")
                                        setTitulo(e.target.value)
                                    }}
                                    fullWidth
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
                                    disabled={usuarioLogado?.permissao === 'FUNC'}
                                    rows={6}
                                    value={descricao}
                                    onChange={(e) => {
                                        removerErro("descricao")
                                        setDescricao(e.target.value)
                                    }}
                                    fullWidth
                                    variant="outlined"
                                    InputLabelProps={{ sx: inputStyle.label }}
                                    InputProps={{ style: { ...inputStyle.input, paddingRight: '5px' } }}
                                    sx={inputStyle.sx}
                                    error={!!erros.descricao}
                                    helperText={erros.descricao}
                                />

                                <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>

                                    <TextField
                                        label="Data de Início"
                                        type="date"
                                        disabled={usuarioLogado?.permissao === 'FUNC'}
                                        value={dtInicio}
                                        onChange={(e) => {
                                            removerErro("dtInicio")
                                            setDtInicio(e.target.value)
                                        }}
                                        fullWidth
                                        variant="outlined"
                                        InputLabelProps={{ sx: inputStyle.label, shrink: true }}
                                        InputProps={{ sx: inputStyle.input }}
                                        sx={inputStyle.sx}
                                        error={!!erros.dtInicio}
                                        helperText={erros.dtInicio}
                                    />

                                    <TextField
                                        label="Data Final"
                                        type="date"
                                        disabled={usuarioLogado?.permissao === 'FUNC'}
                                        value={dtFim}
                                        onChange={(e) => {
                                            removerErro("dtFim")
                                            setDtFim(e.target.value)
                                        }}
                                        fullWidth
                                        variant="outlined"
                                        InputLabelProps={{ sx: inputStyle.label, shrink: true }}
                                        InputProps={{ sx: inputStyle.input }}
                                        sx={inputStyle.sx}
                                        error={!!erros.dtFim}
                                        helperText={erros.dtFim}
                                    />
                                </Stack>
                                <SelectUsuarios
                                    usuarios={usuarios}
                                    sizeUsuarios={sizeUsuarios}
                                    pagesUsuarios={pagesUsuarios}
                                    atualizarUsuarios={atualizarUsuarios}
                                    responsavel={responsavel}
                                    fkResponsavel={fkResponsavel}
                                    onChange={(e: SelectChangeEvent) => {
                                        removerErro("fkResponsavel")
                                        setFkResponsavel(e.target.value)
                                    }}
                                    disabled={usuarioLogado?.permissao === 'FUNC'}
                                    error={!!erros.fkResponsavel}
                                />
                            </Box>
                            <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start" gap={2} flex='1' maxHeight="100%" position="relative">
                                <Typography
                                    sx={{
                                        position: "absolute",
                                        top: "-10px",
                                        left: "10px",
                                        padding: "0 4px",
                                        fontSize: "0.85rem",
                                        color: "text.primary"
                                    }}
                                >
                                    Sub-tarefas
                                </Typography>

                                <Stack display="flex" flexDirection="column" alignItems="start" overflow={'auto'} width="100%" gap={2} height="16rem" maxHeight="16rem"
                                    backgroundColor="background.paper"
                                    borderRadius="10px"
                                    pl={1}
                                    pr={1}
                                    pb={1}
                                    pt={2}
                                    sx={{
                                        '&::-webkit-scrollbar': {
                                            width: '8px',
                                        },
                                        '&::-webkit-scrollbar-track': {
                                            background: 'transparent',
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                            background: '#888',
                                            borderRadius: '4px',
                                        },
                                        '&::-webkit-scrollbar-thumb:hover': {
                                            background: '#aaa',
                                        },
                                    }}>

                                    {checkpoints.map(cb => (
                                        <Box key={cb.idCheckpoint} display="flex" borderRadius="10px" width="100%" backgroundColor="background.paper">
                                            <Stack direction="row" alignItems="center" flex='1'>
                                                <Checkbox
                                                    checked={!!cb.finalizado}
                                                    onChange={() => handleToggleCheckbox(cb.idCheckpoint)}
                                                    icon={<CheckCircleOutlined />}
                                                    checkedIcon={<CheckCircle />}
                                                    disabled={usuarioLogado?.idUsuario != fkResponsavel}
                                                />
                                                <TextField
                                                    placeholder="Nova subtarefa"
                                                    value={cb.descricao}
                                                    onChange={(e) => handleLabelChange(cb.idCheckpoint, e.target.value)}
                                                    variant="standard"
                                                    multiline
                                                    maxRows={3}
                                                    disabled={(usuarioLogado?.idUsuario != fkResponsavel && usuarioLogado?.permissao == 'FUNC')}
                                                    sx={{
                                                        flex: 1,
                                                        input: { color: 'text.primary' },
                                                        textarea: {
                                                            color: 'text.primary',
                                                            '&::-webkit-scrollbar': {
                                                                width: '8px',
                                                            },
                                                            '&::-webkit-scrollbar-track': {
                                                                background: '#1D1D1D',
                                                            },
                                                            '&::-webkit-scrollbar-thumb': {
                                                                background: '#888',
                                                                borderRadius: '4px',
                                                            },
                                                            '&::-webkit-scrollbar-thumb:hover': {
                                                                background: '#aaa',
                                                            },
                                                        },
                                                        "& .MuiInputBase-input.Mui-disabled": {
                                                            WebkitTextFillColor: "#999"
                                                        },
                                                    }}
                                                />
                                            </Stack>

                                            {(usuarioLogado?.idUsuario == fkResponsavel || usuarioLogado?.permissao != 'FUNC') && (<IconButton onClick={() => setCheckpoints(checkpoints.filter(c => c.idCheckpoint !== cb.idCheckpoint))} color="error">
                                                <Delete />
                                            </IconButton>)}
                                        </Box>
                                    ))}

                                    {(usuarioLogado?.idUsuario == fkResponsavel || usuarioLogado?.permissao != 'FUNC') && (<IconButton onClick={handleAddCheckbox} color="primary">
                                        <Add />
                                    </IconButton>)}
                                </Stack>

                                <TextField
                                    label="Comentário"
                                    multiline
                                    disabled={!!task && usuarioLogado?.idUsuario !== fkResponsavel}
                                    rows={4.5}
                                    value={comentario}
                                    onChange={(e) => setComentario(e.target.value)}
                                    fullWidth
                                    variant="outlined"
                                    InputLabelProps={{ sx: inputStyle.label }}
                                    InputProps={{ sx: inputStyle.input }}
                                    sx={{ ...inputStyle.sx, height: "calc((3.5rem * 2) + 1.5rem)" }}
                                />
                            </Box>

                        </Stack>
                    </Stack>
                </Content>
                <Actions>
                    {task == null ?
                        <Button variant="contained" color="primary" endIcon={<Send />} onClick={handlePostTask}>
                            Enviar
                        </Button>
                        :
                        <>
                            <Stack direction="row" spacing={2} justifyContent="center">

                                {usuarioLogado?.idUsuario == fkResponsavel && (task.progresso ?? 0) < 100 ?
                                    <Button fullWidth variant='outlined' color={comImpedimento ? 'error' : 'success'} onClick={(e) => {
                                        e.stopPropagation(); handleImpedimentoTask()
                                    }}>
                                        {comImpedimento ? 'Remover Impedimento' : 'Acionar Impedimento'}</Button>
                                    : usuarioLogado?.idUsuario == fkResponsavel && task.progresso == 100 ?
                                        <Button fullWidth variant='outlined' color={'info'} onClick={(e) => e.stopPropagation()}>TAREFA FINALIZADA</Button>
                                        : null}
                                {usuarioLogado?.permissao == 'FUNC' ? null :
                                    <Button variant="contained" color="error" onClick={handleDeleteTask}>
                                        <Delete />
                                    </Button>
                                }
                                {usuarioLogado?.idUsuario == fkResponsavel ?
                                    <Button sx={{ flex: 1 }} variant="contained" color="primary" onClick={handlePutTask}>
                                        <Send />
                                    </Button>
                                    :
                                    <Button sx={{ flex: 1 }} variant="contained" color="primary" endIcon={<Send />} onClick={handlePutTask}>
                                        Salvar Alterações
                                    </Button>
                                }
                            </Stack>
                        </>}
                </Actions>
            </Dialog>
        </>
    );
}

export default ModalTarefa;
