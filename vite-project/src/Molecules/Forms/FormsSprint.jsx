import { useState } from "react";
import { postSprint, putSprint, deleteSprint } from '../../Utils/cruds/CrudsSprint.jsx';
import { Box, Button, TextField, Typography, Stack } from '@mui/material';
import { inputStyle } from "./Forms.styles.jsx";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

const FormsSprint = ({ sprint, toogleModal, atualizarSprints, atualizarProjetos, fkProjeto }) => {

    const [descricao, setDescricao] = useState(sprint?.descricao || "");
    const [dtInicio, setDtInicio] = useState(sprint?.dtInicio || "");
    const [dtFim, setDtFim] = useState(sprint?.dtFim || "");

    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

    const handlePostSprint = async () => {
        const newSprint = { descricao, dtInicio, dtFim, fkProjeto, idEditor: usuarioLogado.idUsuario, permissaoEditor: usuarioLogado.permissao };
        await postSprint(newSprint);
        atualizarSprints();
        atualizarProjetos();
        toogleModal();
    };

    const handleDeleteSprint = async () => {
        toogleModal();
        const bodyDelete = {idEditor: usuarioLogado.idUsuario, permissaoEditor: usuarioLogado.permissao};
        await deleteSprint(sprint.idSprint, bodyDelete);
        await atualizarSprints();
        await atualizarProjetos();
    }

    const handlePutSprint = async () => {
        toogleModal();
        const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

        const modifiedSprint = {
            idEditor: usuarioLogado.idUsuario,
            permissaoEditor: usuarioLogado.permissao,
            descricao,
            dtInicio,
            dtFim
        }
        await putSprint(modifiedSprint, sprint.idSprint);
        atualizarSprints();
        atualizarProjetos();
    }

    return (
        <Box component="form" onSubmit={(e) => e.preventDefault()} display="flex" flexDirection="column" gap={2}>
            <Typography variant="h5" textAlign="center" mb={2}>
                {sprint == null ? "Adicionar Sprint" : "Visualizar Sprint"}
            </Typography>

            <TextField
                label="Descrição"
                multiline
                rows={3}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                fullWidth
                disabled={usuarioLogado.permissao === "FUNC"}
                variant="outlined"
                InputLabelProps={{ style: inputStyle.label }}
                InputProps={{ style: inputStyle.input }}
                sx={inputStyle.sx}
            />
            <TextField
                label="Data de Início"
                type="date"
                value={dtInicio}
                disabled={usuarioLogado.permissao === "FUNC"}
                onChange={(e) => setDtInicio(e.target.value)}
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true, style: inputStyle.label }}
                InputProps={{ style: inputStyle.input }}
                sx={inputStyle.sx}
            />
            <TextField
                label="Data Final"
                type="date"
                value={dtFim}
                disabled={usuarioLogado.permissao === "FUNC"}
                onChange={(e) => setDtFim(e.target.value)}
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true, style: inputStyle.label }}
                InputProps={{ style: inputStyle.input }}
                sx={inputStyle.sx}
            />
            <Stack direction="row" spacing={2} justifyContent="center">
                {sprint == null ? (
                    <Button variant="contained" color="primary" onClick={handlePostSprint}>
                        Adicionar
                    </Button>
                ) : usuarioLogado.permissao == 'FUNC' ? null :
                    <>
                        <Button variant="contained" color="error" onClick={handleDeleteSprint}>
                            <DeleteIcon />
                        </Button>
                        < Button variant="contained" color="primary" onClick={handlePutSprint} endIcon={<SendIcon />} sx={{ flex: 1 }}>
                            Salvar Alterações
                        </Button>
                    </>
                }
            </Stack>
        </Box >
    )
}

export default FormsSprint