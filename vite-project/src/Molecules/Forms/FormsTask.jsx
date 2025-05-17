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

const FormsTask = ({ task, toogleModal, atualizarSprints, atualizarProjetos, usuarios, idSprint }) => {

    console.log(task);
    const [titulo, setTitulo] = useState(task?.titulo || "");
    const [descricao, setDescricao] = useState(task?.descricao || "");
    const [dtInicio, setDtInicio] = useState(task?.dtInicio || "");
    const [dtFim, setDtFim] = useState(task?.dtFim || "");
    const [fkResponsavel, setFkResponsavel] = useState(task?.fkResponsavel || '#');
    const [comentario, setComentario] = useState(task?.comentario || "");
    const [comImpedimento, setComImpedimento] = useState(task?.comImpedimento);
    const [checkpoints, setCheckpoints] = useState(task?.checkpoints || []);

    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

    const handlePostTask = async () => {
        const novaLista = listaOriginal.map(({ descricao, finalizado }) => ({
            descricao,
            finalizado,
        }));
        const newTask = { fkSprint: idSprint, titulo, descricao, dtInicio, dtFim, comentario, fkResponsavel, idEditor: usuarioLogado.idUsuario, permissaoEditor: usuarioLogado.permissao };
        await postTask(newTask);
        toogleModal();
        atualizarSprints();
        atualizarProjetos();
    };

    const handleImpedimentoTask = async () => {
        const body = { idEditor: usuarioLogado.idUsuario, permissaoEditor: usuarioLogado.permissao }
        toogleModal();
        await putImpedimento(task.idTarefa, body);
        setComImpedimento(!comImpedimento);
        atualizarProjetos();
        atualizarSprints();
    }

    const handlePutTask = async () => {
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
        toogleModal();
        const bodyDelete = { idEditor: usuarioLogado.idUsuario, permissaoEditor: usuarioLogado.permissao };
        await deleteTask(task.idTarefa, bodyDelete);
        atualizarProjetos();
        atualizarSprints();

    };

    const handleAddCheckbox = () => {
        const newId = checkpoints.length + 1;
        setCheckpoints([...checkpoints, { idCheckpoint: `${newId}`, descricao: `Nova opção ${newId}`, finalizado: false }]);
    };

    const handleToggleCheckbox = (id) => {
        setCheckpoints(checkpoints.map(cb => cb.idCheckpoint === id ? { ...cb, finalizado: !cb.finalizado } : cb));
    };

    const handleLabelChange = (id, newLabel) => {
        setCheckpoints(checkpoints.map(cb => cb.idCheckpoint === id ? { ...cb, descricao: newLabel } : cb));
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
                        onChange={(e) => setTitulo(e.target.value)}
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ style: inputStyle.label }}
                        InputProps={{ style: inputStyle.input }}
                        sx={inputStyle.sx}
                    />

                    <TextField
                        label="Descrição"
                        multiline
                        disabled={usuarioLogado.permissao === 'FUNC'}
                        rows={3}
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ style: inputStyle.label }}
                        InputProps={{ style: inputStyle.input }}
                        sx={inputStyle.sx}
                    />

                    <TextField
                        label="Data de Início"
                        type="date"
                        disabled={usuarioLogado.permissao === 'FUNC'}
                        value={dtInicio}
                        onChange={(e) => setDtInicio(e.target.value)}
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ style: inputStyle.label, shrink: true }}
                        InputProps={{ style: inputStyle.input }}
                        sx={inputStyle.sx}
                    />

                    <TextField
                        label="Data Final"
                        type="date"
                        disabled={usuarioLogado.permissao === 'FUNC'}
                        value={dtFim}
                        onChange={(e) => setDtFim(e.target.value)}
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ style: inputStyle.label, shrink: true }}
                        InputProps={{ style: inputStyle.input }}
                        sx={inputStyle.sx}
                    />

                    <Select
                        value={fkResponsavel}
                        onChange={(e) => setFkResponsavel(e.target.value)}
                        disabled={usuarioLogado.permissao === 'FUNC'}
                        fullWidth
                        displayEmpty
                        sx={{
                            ...inputStyle.sx,
                            color: '#FFF',
                        }}
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

                            <Stack display="flex" flexDirection="column" alignItems="start" overflow={'auto'} width="100%" gap={2} height="16rem" maxHeight="16rem" sx={{
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
                                                value={cb.descricao}
                                                onChange={(e) => handleLabelChange(cb.idCheckpoint, e.target.value)}
                                                variant="standard"
                                                sx={{ input: { color: '#FFF' } }}
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
                                disabled={usuarioLogado.permissao === 'FUNC'}
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

                        {usuarioLogado.idUsuario == task.fkResponsavel ?
                            <Button fullWidth variant='outlined' color={comImpedimento ? 'error' : 'success'} onClick={(e) => {
                                e.stopPropagation(); handleImpedimentoTask()
                            }}>
                                {comImpedimento ? 'Remover Impedimento' : 'Acionar Impedimento'}</Button>
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
