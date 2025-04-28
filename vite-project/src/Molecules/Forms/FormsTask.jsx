import { useState } from "react";
import { postTask, putTask, deleteTask, putImpedimento } from '../../Utils/cruds/CrudsTask.jsx';
import { Stack, Button, TextField, Select, MenuItem, Typography, Box, Grow } from '@mui/material';
import { inputStyle } from "./Forms.styles.jsx";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

const FormsTask = ({ task, toogleModal, atualizarSprints, atualizarProjetos, usuarios, setUsuarios, idSprint }) => {
    const [descricao, setDescricao] = useState(task?.descricao || "");
    const [dtInicio, setDtInicio] = useState(task?.dtInicio || "");
    const [dtFim, setDtFim] = useState(task?.dtFim || "");
    const [fkResponsavel, setFkResponsavel] = useState(task?.fkResponsavel || '#');
    const [progresso, setProgresso] = useState(task?.progresso || 0);
    const [comImpedimento, setComImpedimento] = useState(task?.comImpedimento);

    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

    const handlePostTask = async () => {
        const newTask = { fkSprint: idSprint, descricao, dtInicio, dtFim, fkResponsavel, progresso };
        await postTask(newTask);
        toogleModal();
        atualizarSprints();
        atualizarProjetos();
    };

    const handleImpedimentoTask = async () => {
        const body = {
            idEditor: usuarioLogado.idUsuario
        }
        await putImpedimento(task.idTarefa, body);
        setComImpedimento(!comImpedimento);
        atualizarProjetos();
        atualizarSprints();
    }

    const handlePutTask = async () => {
        const modifiedTask = {
            idEditor: usuarioLogado.idUsuario,
            permissaoEditor: usuarioLogado.permissao,
            descricao,
            dtInicio,
            dtFim,
            fkResponsavel,
            progresso
        };
        await putTask(modifiedTask, task.idTarefa);
        toogleModal();
        atualizarSprints();
        atualizarProjetos();
    };

    const handleDeleteTask = async () => {
        toogleModal();
        await deleteTask(task.idTarefa);
        atualizarProjetos();
        atualizarSprints();
        
    };

    return (
        <Box component="form" onSubmit={(e) => e.preventDefault()} display="flex" flexDirection="column" gap={2}>
            <Typography variant="h5" textAlign="center" mb={2}>
                {task == null ? "Adicionar Tarefa" : `Visualizar Tarefa`}
            </Typography>

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
                <Button variant="contained" color="primary" onClick={handlePostTask}>
                    Enviar
                </Button>
            ) : (
                <>
                    <TextField
                        label="Progresso (%)"
                        type="number"
                        value={progresso}
                        onChange={(e) => setProgresso(e.target.value)}
                        fullWidth
                        disabled={usuarioLogado.idUsuario !== task.fkResponsavel}
                        variant="outlined"
                        InputLabelProps={{ style: inputStyle.label }}
                        InputProps={{ style: inputStyle.input }}
                        sx={inputStyle.sx}
                    />
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
                </>
            )}
        </Box>
    );
};

export default FormsTask;
