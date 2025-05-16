import { useState } from "react";
import { deleteProjeto, postProjeto, putProjeto } from '../../Utils/cruds/CrudsProjeto.jsx';
import { Box, Button, TextField, Typography, Stack, MenuItem, Grow, Select } from '@mui/material';
import { inputStyle } from "./Forms.styles.jsx";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const FormsProjeto = ({ projeto, toogleModal, atualizarProjetos, usuarios, fkEmpresa }) => {

    console.log(projeto);

    const [descricao, setDescricao] = useState(projeto?.descricao || "");
    const [orcamento, setOrcamento] = useState(projeto?.orcamento || "");
    const [fkResponsavel, setResponsavel] = useState(projeto?.responsavel.idUsuario || '0');
    const [urlImagem, setUrlImagem] = useState('');

    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

    const handleFileUpload = (file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            setUrlImagem(base64String);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handlePostProjeto = async () => {
        const newProjeto = { fkEmpresa, descricao, orcamento, fkResponsavel, urlImagem, idEditor: usuarioLogado.idUsuario, permissaoEditor: usuarioLogado.permissao };
        await postProjeto(newProjeto, toogleModal);
        atualizarProjetos();
    };

    const handleDeleteProjeto = async () => {
        toogleModal();
        const bodyDelete = {idEditor: usuarioLogado.idUsuario, permissaoEditor: usuarioLogado.permissao}
        await deleteProjeto(projeto.idProjeto, bodyDelete);
        await atualizarProjetos();
    }

    const handlePutProjeto = async () => {

        const modifiedProjeto = {
            idEditor: usuarioLogado.idUsuario,
            permissaoEditor: usuarioLogado.permissao,
            descricao,
            orcamento,
            fkResponsavel,
            urlImagem
        }
        await putProjeto(modifiedProjeto, projeto.idProjeto, toogleModal);
        await atualizarProjetos();
    }

    return (
        <Box component="form" onSubmit={(e) => e.preventDefault()} display="flex" flexDirection="column" gap={2}>
            <Typography variant="h5" textAlign="center" mb={2}>
                {projeto == null ? "Adicionar Projeto" : "Visualizar Projeto"}
            </Typography>

            <TextField
                label="Descrição"
                multiline
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
                label="Orçamento"
                type="number"
                disabled={!usuarioLogado.permissao.includes('CONSULTOR')}
                value={orcamento}
                onChange={(e) => setOrcamento(e.target.value)}
                fullWidth
                variant="outlined"
                InputLabelProps={{ style: inputStyle.label }}
                InputProps={{ style: inputStyle.input }}
                sx={inputStyle.sx}
            />

            <Select
                select
                label="Responsável"
                value={fkResponsavel}
                onChange={(e) => setResponsavel(e.target.value)}
                fullWidth
                variant="outlined"
                InputLabelProps={{ style: inputStyle.label }}
                InputProps={{ style: inputStyle.input }}
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
                <MenuItem value="0">Selecione o responsável</MenuItem>
                {usuarios.map((usuario) => (
                    <MenuItem key={usuario.idUsuario} value={usuario.idUsuario}>
                        {usuario.nome}
                    </MenuItem>
                ))}
            </Select>

            <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{ ...inputStyle.sx, py: 1.5 }}
            >
                {projeto == null ? 'Selecionar' : 'Modificar'} Imagem
                <AttachFileIcon />
                <input
                    type="file"
                    hidden
                    onChange={(e) => handleFileUpload(e.target.files[0])}
                />
            </Button>

            <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
                {projeto == null ? (
                    <Button variant="contained" color="primary" onClick={handlePostProjeto} endIcon={<SendIcon />} sx={{ flex: 1 }}>
                        Adicionar
                    </Button>
                ) : (
                    <>
                        {!usuarioLogado.permissao.includes("CONSULTOR") ? null :
                            <Button variant="contained" color="error" onClick={handleDeleteProjeto} >
                                <DeleteIcon />
                            </Button>
                        }
                        <Button variant="contained" color="primary" onClick={handlePutProjeto} endIcon={<SendIcon />} sx={{ flex: 1 }}>
                            Salvar Alterações
                        </Button>
                    </>
                )}
            </Stack>
        </Box>
    )
}

export default FormsProjeto