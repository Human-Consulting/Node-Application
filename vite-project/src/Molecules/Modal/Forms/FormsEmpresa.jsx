import Swal from "sweetalert2";
import { useState } from "react";
import { postEmpresa, putEmpresa, deleteEmpresa } from '../../../Utils/cruds/CrudsEmpresa.jsx';
import { Box, Button, TextField, Typography, Stack } from '@mui/material';
import { inputStyle } from "./Forms.styles.jsx";
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router";


const FormsEmpresa = ({ empresa, toogleModal, atualizarEmpresas }) => {

    const navigate = useNavigate();

    const formatarCNPJ = (valor) => {
        valor = valor.replace(/\D/g, "");

        if (valor.length <= 14) {
            valor = valor.replace(/^(\d{2})(\d)/, "$1.$2");
            valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
            valor = valor.replace(/\.(\d{3})(\d)/, ".$1/$2");
            valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
        }

        return valor;
    };

    const [cnpj, setCnpj] = useState(empresa?.cnpj ? formatarCNPJ(empresa?.cnpj) : "");
    const [nome, setNome] = useState(empresa?.nome || "");
    const [urlImagem, setUrlImagem] = useState('');
    const [fileName, setFileName] = useState('');

    const [erros, setErros] = useState({});

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

    const validarCampos = () => {
        const novosErros = {};

        if (!nome.trim()) novosErros.nome = "Nome é obrigatório";
        if (!cnpj.trim()) novosErros.cnpj = "Cnpj é obrigatório";
        else if (!validarCNPJ(cnpj.replace(/\D/g, ""))) novosErros.cnpj = "CNPJ inválido";

        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    };

    const handlePostEmpresa = async () => {
        if (!validarCampos()) return;
        setErros({});
        const newEmpresa = { nome, cnpj: cnpj.replace(/\D/g, ""), urlImagem, idEditor: usuarioLogado.idUsuario, permissaoEditor: usuarioLogado.permissao };
        const novaEmpresa = await postEmpresa(newEmpresa);
        atualizarEmpresas();
        toogleModal();
        await Swal.fire({
            icon: "success",
            position: "center",
            backdrop: false,
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            text: "Adicione um diretor para adicionar projetos!",
            customClass: {
                popup: "swalAlerta",
            }
        });
        navigate(`/Home/${novaEmpresa.nome}/${novaEmpresa.idEmpresa}/Usuarios`);
    };

    const handleDeleteEmpresa = async () => {
        toogleModal();
        const bodyDelete = { idEditor: usuarioLogado.idUsuario, permissaoEditor: usuarioLogado.permissao }
        await deleteEmpresa(empresa.idEmpresa, bodyDelete);
        await atualizarEmpresas();
    }

    const handlePutEmpresa = async () => {
        if (!validarCampos()) return;
        setErros({});
        const modifiedEmpresa = {
            idEditor: usuarioLogado.idUsuario,
            permissaoEditor: usuarioLogado.permissao,
            cnpj: cnpj.replace(/\D/g, ""),
            nome,
            urlImagem
        }
        const response = await putEmpresa(modifiedEmpresa, empresa.idEmpresa);
        if (response) {
            toogleModal();
            await atualizarEmpresas();
        }
    }

    const removerErro = (campo) => {
        setErros((prevErros) => {
            const { [campo]: _, ...resto } = prevErros;
            return resto;
        });
    };

    function validarCNPJ(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj.length !== 14) return false;

        if (/^(\d)\1+$/.test(cnpj)) return false;

        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) pos = 9;
        }

        let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado !== parseInt(digitos.charAt(0))) return false;

        tamanho++;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) pos = 9;
        }

        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        return resultado === parseInt(digitos.charAt(1));
    }


    return (
        <Box component="form" onSubmit={(e) => e.preventDefault()} display="flex" flexDirection="column" gap={2}>
            <Typography variant="h5" textAlign="center" mb={2}>
                {empresa == null ? "Adicionar Empresa" : "Visualizar Empresa"}
            </Typography>

            <TextField
                label="Nome"
                value={nome}
                onChange={(e) => {
                    removerErro(nome)
                    setNome(e.target.value)
                }}
                fullWidth
                variant="outlined"
                InputLabelProps={{ style: inputStyle.label }}
                InputProps={{ style: inputStyle.input }}
                sx={inputStyle.sx}
                error={!!erros.nome}
                helperText={erros.nome}
            />

            <TextField
                label="CNPJ"
                value={cnpj}
                onChange={(e) => {
                    const apenasNumeros = e.target.value.replace(/\D/g, "");
                    if (apenasNumeros.length <= 14) {
                        removerErro('cnpj');
                        setCnpj(formatarCNPJ(apenasNumeros));
                    }
                }}
                fullWidth
                variant="outlined"
                InputLabelProps={{ style: inputStyle.label }}
                InputProps={{ style: inputStyle.input, maxLength: 18 }}
                sx={inputStyle.sx}
                error={!!erros.cnpj}
                helperText={erros.cnpj}
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
                    onChange={(e) => {
                        handleFileUpload(e.target.files[0]);
                        setFileName(e.target.files[0].name);
                    }}
                />
                {fileName && (fileName)}
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