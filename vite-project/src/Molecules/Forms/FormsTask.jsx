import { useState } from "react";
import { postTask, putTask, deleteTask, putImpedimento } from '../../Utils/cruds/CrudsTask.jsx';
import { Stack, Button, TextField, Select, MenuItem, Typography, Box, Grow } from '@mui/material';
import { inputStyle } from "./Forms.styles.jsx";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { Checkbox, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

const FormsTask = ({ task, toogleModal, atualizarSprints, atualizarProjetos, usuarios, idSprint, dtInicioSprint, dtFimSprint }) => {
    const [titulo, setTitulo] = useState(task?.titulo || "");
    const [descricao, setDescricao] = useState(task?.descricao || "");
    const [dtInicio, setDtInicio] = useState(task?.dtInicio || "");
    const [dtFim, setDtFim] = useState(task?.dtFim || "");
    const [fkResponsavel, setFkResponsavel] = useState(task?.fkResponsavel || '#');
    const [comentario, setComentario] = useState(task?.comentario || "");
    const [comImpedimento, setComImpedimento] = useState(task?.comImpedimento);
    const [checkpoints, setCheckpoints] = useState(task?.checkpoints || []);

    const [erros, setErros] = useState({});

    const validarCampos = () => {
        const novosErros = {};

        if (!titulo.trim()) novosErros.titulo = "Título é obrigatório";
        if (!descricao.trim()) novosErros.descricao = "Descrição é obrigatória";
        if (!dtInicio.trim()) novosErros.dtInicio = "Data de início é obrigatória";
        if (!dtFim.trim()) novosErros.dtFim = "Data de finalização é obrigatória";
        if (!fkResponsavel) novosErros.fkResponsavel = "Responsável é obrigatório";

        if (dtInicio && dtFim) {
            const inicio = new Date(dtInicio);
            const fim = new Date(dtFim);
            const inicioSprint = new Date(dtInicioSprint);
            const fimSprint = new Date(dtFimSprint);

            if (inicio > fim) {
                novosErros.dtFim = "Data de finalização deve ser depois da data de início";
            }

            if (inicio < inicioSprint) {
                novosErros.dtInicio = `Data de início deve ser após o início da sprint (${dtInicioSprint})`;
            }

            if (fim > fimSprint) {
                novosErros.dtFim = `Data de finalização deve ser antes do fim da sprint (${dtFimSprint})`;
            }
        }


        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    };

    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

    const handlePostTask = async () => {
        if (!validarCampos()) return;
        setErros({});

        const newTask = { fkSprint: idSprint, titulo, descricao, dtInicio, dtFim, comentario, fkResponsavel, idEditor: usuarioLogado.idUsuario, permissaoEditor: usuarioLogado.permissao };
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
            // setComImpedimento(!comImpedimento);
            toogleModal();
            atualizarSprints();
            atualizarProjetos();
        }
    }

    const handlePutTask = async () => {
        if (!validarCampos()) return;
        setErros({});

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
        await putTask(modifiedTask, task.idTarefa);
        toogleModal();
        atualizarSprints();
        atualizarProjetos();
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
        <Stack direction="column" mb={2} >
            <Typography variant="h5" textAlign="center" mb={2}>
                {task == null ? "Adicionar Tarefa" : `Visualizar Tarefa`}
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
                        rows={3}
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

                    <Select
                        value={fkResponsavel}
                        onChange={(e) => {
                            removerErro("fkResponsavel")
                            setFkResponsavel(e.target.value)
                        }}
                        disabled={usuarioLogado.permissao === 'FUNC'}
                        fullWidth
                        displayEmpty
                        sx={{
                            ...inputStyle.sx,
                            color: '#FFF',
                        }}
                        error={!!erros.fkResponsavel}
                        MenuProps={{
                            TransitionComponent: Grow,
                            PaperProps: {
                                sx: {
                                    backgroundColor: '#22272B',
                                    color: '#fff',
                                    borderRadius: 2,
                                    mt: 1,
                                    maxHeight: 200,
                                }
                            }
                        }}
                    >
                        <MenuItem value="#">Selecione o responsável</MenuItem>
                        {usuarios.map((usuario) => (
                            <MenuItem key={usuario.idUsuario} value={usuario.idUsuario}>
                                {usuario.nome}
                            </MenuItem>
                        ))}
                    </Select>

                    {task == null ? (
                        <Button variant="contained" color="primary" endIcon={<SendIcon />} onClick={handlePostTask}>
                            Enviar
                        </Button>
                    ) : null}
                </Box>
                {task == null ? null :
                    <>

                        <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start" gap={2} flex='1' maxHeight="100%" >

                            <Stack display="flex" flexDirection="column" alignItems="start" overflow={'auto'} width="100%" gap={2} height="16rem" maxHeight="16rem" paddingRight='5px' sx={{
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
                                    <Box key={cb.idCheckpoint} display="flex" backgroundColor="#22272B" gap={1} width="100%">
                                        <Stack direction="row" alignItems="center" flex='1'>
                                            <Checkbox
                                                checked={cb.finalizado}
                                                onChange={() => handleToggleCheckbox(cb.idCheckpoint)}
                                                icon={<CheckCircleOutlinedIcon />}
                                                checkedIcon={<CheckCircleIcon />}
                                            />
                                            <TextField
                                                placeholder="Novo checkpoint"
                                                value={cb.descricao}
                                                onChange={(e) => handleLabelChange(cb.idCheckpoint, e.target.value)}
                                                variant="standard"
                                                multiline
                                                maxRows={3}
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
                                                    }
                                                }}
                                            />
                                        </Stack>
                                        <IconButton onClick={() => setCheckpoints(checkpoints.filter(c => c.idCheckpoint !== cb.idCheckpoint))} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                ))}

                                <IconButton onClick={handleAddCheckbox} color="primary">
                                    <AddIcon />
                                </IconButton>
                            </Stack>

                            <TextField
                                label="Comentário"
                                multiline
                                disabled={usuarioLogado.idUsuario != task.fkResponsavel}
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
                    </>}

            </Stack>
            {task == null ? null :
                <>
                    <Stack direction="row" spacing={2} justifyContent="center">

                        {usuarioLogado.idUsuario == task.fkResponsavel && task.progresso < 100 ?
                            <Button fullWidth variant='outlined' color={comImpedimento ? 'error' : 'success'} onClick={(e) => {
                                e.stopPropagation(); handleImpedimentoTask()
                            }}>
                                {comImpedimento ? 'Remover Impedimento' : 'Acionar Impedimento'}</Button>
                            : usuarioLogado.idUsuario == task.fkResponsavel && task.progresso == 100 ?
                                <Button fullWidth variant='outlined' color={'info'} onClick={(e) => e.stopPropagation()}>TAREFA FINALIZADA</Button>
                                : null}
                        {usuarioLogado.permissao == 'FUNC' ? null :
                            <Button variant="contained" color="error" onClick={handleDeleteTask}>
                                <DeleteIcon />
                            </Button>
                        }
                        {usuarioLogado.idUsuario == task.fkResponsavel ?
                            <Button sx={{ flex: 1 }} variant="contained" color="primary" onClick={handlePutTask}>
                                <SendIcon />
                            </Button>
                            :
                            <Button sx={{ flex: 1 }} variant="contained" color="primary" endIcon={<SendIcon />} onClick={handlePutTask}>
                                Salvar Alterações
                            </Button>
                        }
                    </Stack>
                </>}
        </Stack>
    );
};

export default FormsTask;
