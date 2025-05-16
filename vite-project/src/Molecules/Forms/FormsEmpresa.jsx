import { useState } from "react";
import { postEmpresa, putEmpresa, deleteEmpresa } from '../../Utils/cruds/CrudsEmpresa.jsx';
import { Box, Button, TextField, Typography, Stack } from '@mui/material';
import { inputStyle } from "./Forms.styles.jsx";
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';

const FormsEmpresa = ({ empresa, toogleModal, atualizarEmpresas, usuarios, fkEmpresa }) => {

    const [cnpj, setCnpj] = useState(empresa?.cnpj || "");
    const [nome, setNome] = useState(empresa?.nome || "");
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

    const handlePostEmpresa = async () => {
        const newEmpresa = { cnpj, nome, urlImagem, idEditor: usuarioLogado.idUsuario, permissaoEditor: usuarioLogado.permissao };
        await postEmpresa(newEmpresa);
        atualizarEmpresas();
        toogleModal();
    };

    const handleDeleteEmpresa = async () => {
        toogleModal();
        const bodyDelete = {idEditor: usuarioLogado.idUsuario, permissaoEditor: usuarioLogado.permissao}
        await deleteEmpresa(empresa.idEmpresa, bodyDelete);
        await atualizarEmpresas();
    }

    const handlePutEmpresa = async () => {

        const modifiedEmpresa = {
            idEditor: usuarioLogado.idUsuario,
            permissaoEditor: usuarioLogado.permissao,
            cnpj,
            nome,
            urlImagem
        }
        toogleModal();
        await putEmpresa(modifiedEmpresa, empresa.idEmpresa);
        await atualizarEmpresas();
    }

    return (
        <Box component="form" onSubmit={(e) => e.preventDefault()} display="flex" flexDirection="column" gap={2}>
            <Typography variant="h5" textAlign="center" mb={2}>
                {empresa == null ? "Adicionar Empresa" : "Visualizar Empresa"}
            </Typography>

            <TextField
                label="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                fullWidth
                variant="outlined"
                InputLabelProps={{ style: inputStyle.label }}
                InputProps={{ style: inputStyle.input }}
                sx={inputStyle.sx}
            />

            <TextField
                label="CNPJ"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                fullWidth
                variant="outlined"
                InputLabelProps={{ style: inputStyle.label }}
                InputProps={{ style: inputStyle.input }}
                sx={inputStyle.sx}
            />

            <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{ ...inputStyle.sx, py: 1.5 }}
            >
                {empresa == null ? 'Selecionar' : 'Modificar'} Imagem
                <AttachFileIcon />
                <input
                    type="file"
                    hidden
                    onChange={(e) => handleFileUpload(e.target.files[0])}
                />
            </Button>

            <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
                {empresa == null ? (
                    <Button variant="contained" color="primary" onClick={handlePostEmpresa} endIcon={<SendIcon />} sx={{ flex: 1 }}>
                        Adicionar
                    </Button>
                ) : (
                    <>
                        <Button variant="contained" color="error" onClick={handleDeleteEmpresa}>
                            <DeleteIcon />
                        </Button>
                        <Button variant="contained" color="primary" onClick={handlePutEmpresa} endIcon={<SendIcon />} sx={{ flex: 1 }}>
                            Salvar Alterações
                        </Button>
                    </>
                )}
            </Stack>
        </Box>
    )
}

export default FormsEmpresa