import { useState } from "react";
import { postSprint, putSprint, deleteSprint } from '../../../Utils/cruds/CrudsSprint.jsx';
import { Box, Button, TextField, Typography, Stack } from '@mui/material';
import { inputStyle } from "./Forms.styles.jsx";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

const FormsSprint = ({ sprint, toogleModal, atualizarSprints, atualizarProjetos, fkProjeto }) => {

    const [titulo, setTitulo] = useState(sprint?.titulo || "");
    const [descricao, setDescricao] = useState(sprint?.descricao || "");
    const [dtInicio, setDtInicio] = useState(sprint?.dtInicio || "");
    const [dtFim, setDtFim] = useState(sprint?.dtFim || "");

    const [erros, setErros] = useState({});

    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

    const validarCampos = () => {
        const novosErros = {};

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
        const newSprint = { titulo, descricao, dtInicio, dtFim, fkProjeto, idEditor: usuarioLogado.idUsuario, permissaoEditor: usuarioLogado.permissao };
        const response = await postSprint(newSprint);
        if (response) {
            atualizarSprints();
            atualizarProjetos();
            toogleModal();
        }
    };

    const handleDeleteSprint = async () => {
        const bodyDelete = { idEditor: usuarioLogado.idUsuario, permissaoEditor: usuarioLogado.permissao };
        const response = await deleteSprint(sprint.idSprint, bodyDelete);
        if (response) {
            await atualizarSprints();
            await atualizarProjetos();
            toogleModal();
        }
    }

    const handlePutSprint = async () => {
        if (!validarCampos()) return;
        setErros({});
        const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

        const modifiedSprint = {
            idEditor: usuarioLogado.idUsuario,
            permissaoEditor: usuarioLogado.permissao,
            titulo,
            descricao,
            dtInicio,
            dtFim
        }
        const response = await putSprint(modifiedSprint, sprint.idSprint);
        if (response) {
            atualizarSprints();
            atualizarProjetos();
            toogleModal();
        }
    }

    const removerErro = (campo) => {
        setErros((prevErros) => {
            const { [campo]: _, ...resto } = prevErros;
            return resto;
        });
    };

    return (
        <Box component="form" onSubmit={(e) => e.preventDefault()} display="flex" flexDirection="column" gap={2}>
            <Typography variant="h5" textAlign="center" mb={2}>
                {sprint == null ? "Adicionar Sprint" : "Visualizar Sprint"}
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
                disabled={usuarioLogado.permissao === "FUNC"}
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
                rows={3}
                value={descricao}
                onChange={(e) => {
                    removerErro("descricao")
                    setDescricao(e.target.value)
                }}
                fullWidth
                disabled={usuarioLogado.permissao === "FUNC"}
                variant="outlined"
                InputLabelProps={{ style: inputStyle.label }}
                InputProps={{ style: inputStyle.input }}
                sx={inputStyle.sx}
                error={!!erros.descricao}
                helperText={erros.descricao}
            />
            <TextField
                label="Data de Início"
                type="date"
                value={dtInicio}
                onChange={(e) => {
                    removerErro("dtInicio")
                    setDtInicio(e.target.value)
                }}
                disabled={usuarioLogado.permissao === "FUNC"}
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true, style: inputStyle.label }}
                InputProps={{ style: inputStyle.input }}
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
                disabled={usuarioLogado.permissao === "FUNC"}
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true, style: inputStyle.label }}
                InputProps={{ style: inputStyle.input }}
                sx={inputStyle.sx}
                error={!!erros.dtFim}
                helperText={erros.dtFim}
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