import { Box, Button, Checkbox, Dialog, DialogActions, FormLabel, IconButton, Stack, TextField, Typography } from "@mui/material";
import { postTask, putTask, deleteTask, putImpedimento } from '../../Utils/cruds/CrudsTask.jsx';
import { Add, CheckCircle, CheckCircleOutlined, Close, Delete, Send } from "@mui/icons-material";
import SelectUsuarios from "../Modais/SelectUsuarios/SelectUsuarios.jsx";
import { useWarningValidator } from "../../Utils/useWarning.jsx";
import { inputStyle } from "../Modal/Forms/Forms.styles.jsx";
import { Content, Actions } from "./Modal.style.jsx";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const ModalTarefa = ({ open, onClose, task, toogleModal, atualizarSprints, atualizarProjetos, usuarios, sizeUsuarios, pagesUsuarios, atualizarUsuarios, idSprint, dtInicioSprint, dtFimSprint }) => {
    const [titulo, setTitulo] = useState(task?.titulo || "");
    const [descricao, setDescricao] = useState(task?.descricao || "");
    const [dtInicio, setDtInicio] = useState(task?.dtInicio || "");
    const [dtFim, setDtFim] = useState(task?.dtFim || "");
    const [responsavel, setResponsavel] = useState(task?.responsavel || null);
    const [fkResponsavel, setFkResponsavel] = useState(task?.responsavel?.idUsuario || '#');
    const [comentario, setComentario] = useState(task?.comentario || "");
    const [comImpedimento, setComImpedimento] = useState(task?.comImpedimento);
    const [checkpoints, setCheckpoints] = useState(task?.checkpoints || []);

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

    const [erros, setErros] = useState({});

    const validarCampos = () => {
        const novosErros = {};

        if (!titulo.trim()) novosErros.titulo = "Título é obrigatório";
        if (!dtInicio.trim()) novosErros.dtInicio = "Data de início é obrigatória";
        if (!dtFim.trim()) novosErros.dtFim = "Data de finalização é obrigatória";

        if (dtInicio && dtFim) {
            const inicio = new Date(dtInicio);
            const fim = new Date(dtFim);
            const inicioSprint = new Date(dtInicioSprint);
            const fimSprint = new Date(dtFimSprint);

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

    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

    const handlePostTask = async () => {
        if (!validarCampos()) return;
        setErros({});
        let newFkResponsavel;

        if (fkResponsavel == "#") newFkResponsavel = null;
        else newFkResponsavel = fkResponsavel;

        const newTask = { fkSprint: idSprint, titulo, descricao, dtInicio, dtFim, comentario, fkResponsavel: newFkResponsavel, checkpoints, idEditor: usuarioLogado.idUsuario, permissaoEditor: usuarioLogado.permissao };
        const response = await postTask(newTask);
        if (response) {
            toogleModal();
            atualizarSprints();
            atualizarProjetos();
        }
    };

    const handleImpedimentoTask = async () => {
        const body = { idEditor: usuarioLogado.idUsuario, permissaoEditor: usuarioLogado.permissao }
        const modifiedTask = {
            idEditor: usuarioLogado.idUsuario,
            permissaoEditor: usuarioLogado.permissao,
            titulo,
            descricao,
            dtInicio,
            dtFim,
            comImpedimento,
            comentario,
            fkResponsavel,
            checkpoints
        };
        const response = await putImpedimento(modifiedTask, body, task.idTarefa);
        if (response) {
            toogleModal();
            atualizarSprints();
            atualizarProjetos();
        }
    }

    const handlePutTask = async () => {
        if (!validarCampos()) return;
        setErros({});
        let newFkResponsavel;

        if (fkResponsavel == "#") newFkResponsavel = null;
        else newFkResponsavel = fkResponsavel;

        const modifiedTask = {
            idEditor: usuarioLogado.idUsuario,
            permissaoEditor: usuarioLogado.permissao,
            titulo,
            descricao,
            dtInicio,
            dtFim,
            comImpedimento,
            comentario,
            fkResponsavel: newFkResponsavel,
            checkpoints
        };
        const response = await putTask(modifiedTask, task.idTarefa);
        if (response) {
            toogleModal();
            atualizarSprints();
            atualizarProjetos();
        }
    };

    const handleDeleteTask = async () => {
        const bodyDelete = { idEditor: usuarioLogado.idUsuario, permissaoEditor: usuarioLogado.permissao };
        const response = await deleteTask(task.idTarefa, bodyDelete);
        if (response) {
            toogleModal();
            atualizarProjetos();
            atualizarSprints();
        }
    };

    const handleAddCheckbox = () => {
        const newId = checkpoints.length + 1;
        setCheckpoints([...checkpoints, { idCheckpoint: `${newId}`, descricao: '', finalizado: false }]);
    };

    const handleToggleCheckbox = (id) => {
        setCheckpoints(checkpoints.map(cb => cb.idCheckpoint === id ? { ...cb, finalizado: !cb.finalizado } : cb));
    };

    const handleLabelChange = (id, newLabel) => {
        setCheckpoints(checkpoints.map(cb => cb.idCheckpoint === id ? { ...cb, descricao: newLabel } : cb));
    };

    const removerErro = (campo) => {
        setErros((prevErros) => {
            const { [campo]: _, ...resto } = prevErros;
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
                        <Close onClick={onClose} size="small" style={{ cursor: "pointer" }} />
                    </Box>
                    <Stack gap={3}>
                        <Typography width="100%" textAlign="center" color="#fff" fontWeight="bold" fontSize={18}>
                            {task == null ? "Criar Tarefa" : "Editar Tarefa"}
                        </Typography>

                        <Stack direction="row" justifyContent="space-between" mb={2} gap='50px' >
                            <Box component="form" onSubmit={(e) => e.preventDefault()} display="flex" flexDirection="column" gap={2} flex='1'>

                                <TextField
                                    label="Título"
                                    type="text"
                                    disabled={usuarioLogado.permissao === 'FUNC'}
                                    value={titulo}
                                    onChange={(e) => {
                                        removerErro("titulo")
                                        setTitulo(e.target.value)
                                    }}
                                    fullWidth
                                    variant="outlined"
                                    InputLabelProps={{ style: inputStyle.label }}
                                    InputProps={{ style: inputStyle.input }}
                                    sx={inputStyle.sx}
                                    error={!!erros.titulo}
                                    helperText={erros.titulo}
                                />

                                <TextField
                                    label="Descrição"
                                    multiline
                                    disabled={usuarioLogado.permissao === 'FUNC'}
                                    rows={6}
                                    value={descricao}
                                    onChange={(e) => {
                                        removerErro("descricao")
                                        setDescricao(e.target.value)
                                    }}
                                    fullWidth
                                    variant="outlined"
                                    InputLabelProps={{ style: inputStyle.label }}
                                    InputProps={{ style: { ...inputStyle.input, paddingRight: '5px' } }}
                                    sx={inputStyle.sx}
                                    error={!!erros.descricao}
                                    helperText={erros.descricao}
                                />

                                <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>

                                    <TextField
                                        label="Data de Início"
                                        type="date"
                                        disabled={usuarioLogado.permissao === 'FUNC'}
                                        value={dtInicio}
                                        onChange={(e) => {
                                            removerErro("dtInicio")
                                            setDtInicio(e.target.value)
                                        }}
                                        fullWidth
                                        variant="outlined"
                                        InputLabelProps={{ style: inputStyle.label, shrink: true }}
                                        InputProps={{ style: inputStyle.input }}
                                        sx={inputStyle.sx}
                                        error={!!erros.dtInicio}
                                        helperText={erros.dtInicio}
                                    />

                                    <TextField
                                        label="Data Final"
                                        type="date"
                                        disabled={usuarioLogado.permissao === 'FUNC'}
                                        value={dtFim}
                                        onChange={(e) => {
                                            removerErro("dtFim")
                                            setDtFim(e.target.value)
                                        }}
                                        fullWidth
                                        variant="outlined"
                                        InputLabelProps={{ style: inputStyle.label, shrink: true }}
                                        InputProps={{ style: inputStyle.input }}
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
                                    onChange={(e) => {
                                        removerErro("fkResponsavel")
                                        setFkResponsavel(e.target.value)
                                    }}
                                    disabled={usuarioLogado.permissao === 'FUNC'}
                                    error={!!erros.fkResponsavel}
                                />
                            </Box>
                            <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start" gap={2} flex='1' maxHeight="100%" position="relative">
                                <Typography
                                    sx={{
                                        position: "absolute",
                                        top: "-10px",
                                        left: "10px",
                                        // backgroundColor: "#22272B",
                                        // backgroundColor: "#1D1D1D",
                                        padding: "0 4px",
                                        fontSize: "0.85rem",
                                        color: "#fff"
                                    }}
                                >
                                    Sub-tarefas
                                </Typography>

                                <Stack display="flex" flexDirection="column" alignItems="start" overflow={'auto'} width="100%" gap={2} height="16rem" maxHeight="16rem"
                                    //backgroundColor="#1A1E22"
                                    backgroundColor="#1D1D1D"
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
                                        <Box key={cb.idCheckpoint} display="flex" borderRadius="10px" width="100%" backgroundColor="#2D2D2D">
                                            <Stack direction="row" alignItems="center" flex='1'>
                                                <Checkbox
                                                    checked={cb.finalizado}
                                                    onChange={() => handleToggleCheckbox(cb.idCheckpoint)}
                                                    icon={<CheckCircleOutlined />}
                                                    checkedIcon={<CheckCircle />}
                                                    disabled={usuarioLogado.idUsuario != fkResponsavel}
                                                />
                                                <TextField
                                                    placeholder="Nova subtarefa"
                                                    value={cb.descricao}
                                                    onChange={(e) => handleLabelChange(cb.idCheckpoint, e.target.value)}
                                                    variant="standard"
                                                    multiline
                                                    maxRows={3}
                                                    disabled={(usuarioLogado.idUsuario != fkResponsavel && usuarioLogado.permissao == 'FUNC')}
                                                    sx={{
                                                        flex: 1,
                                                        input: { color: '#FFF' },
                                                        textarea: {
                                                            color: '#FFF',
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

                                            {(usuarioLogado.idUsuario == fkResponsavel || usuarioLogado.permissao != 'FUNC') && (<IconButton onClick={() => setCheckpoints(checkpoints.filter(c => c.idCheckpoint !== cb.idCheckpoint))} color="error">
                                                <Delete />
                                            </IconButton>)}
                                        </Box>
                                    ))}

                                    {(usuarioLogado.idUsuario == fkResponsavel || usuarioLogado.permissao != 'FUNC') && (<IconButton onClick={handleAddCheckbox} color="primary">
                                        <Add />
                                    </IconButton>)}
                                </Stack>

                                <TextField
                                    label="Comentário"
                                    multiline
                                    disabled={task && usuarioLogado.idUsuario !== fkResponsavel}
                                    rows={4.5}
                                    value={comentario}
                                    onChange={(e) => setComentario(e.target.value)}
                                    fullWidth
                                    variant="outlined"
                                    InputLabelProps={{ style: inputStyle.label }}
                                    InputProps={{ style: inputStyle.input }}
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

                                {usuarioLogado.idUsuario == fkResponsavel && task.progresso < 100 ?
                                    <Button fullWidth variant='outlined' color={comImpedimento ? 'error' : 'success'} onClick={(e) => {
                                        e.stopPropagation(); handleImpedimentoTask()
                                    }}>
                                        {comImpedimento ? 'Remover Impedimento' : 'Acionar Impedimento'}</Button>
                                    : usuarioLogado.idUsuario == fkResponsavel && task.progresso == 100 ?
                                        <Button fullWidth variant='outlined' color={'info'} onClick={(e) => e.stopPropagation()}>TAREFA FINALIZADA</Button>
                                        : null}
                                {usuarioLogado.permissao == 'FUNC' ? null :
                                    <Button variant="contained" color="error" onClick={handleDeleteTask}>
                                        <Delete />
                                    </Button>
                                }
                                {usuarioLogado.idUsuario == fkResponsavel ?
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