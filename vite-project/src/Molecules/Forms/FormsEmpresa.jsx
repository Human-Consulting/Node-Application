import { useState } from "react";
import { postEmpresa, putEmpresa } from '../../Utils/cruds/CrudsEmpresa.jsx';

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
        const newEmpresa = { cnpj, nome, urlImagem };
        await postEmpresa(newEmpresa, toogleModal);
        atualizarEmpresas();
    };

    const handlePutEmpresa = async () => {

        const modifiedEmpresa = {
            idEditor: usuarioLogado.idUsuario,
            permissaoEditor: usuarioLogado.permissao,
            cnpj,
            nome,
            urlImagem
        }
        await putEmpresa(modifiedEmpresa, empresa.idEmpresa, toogleModal);
        await atualizarEmpresas();
    }

    return (
        <>
            <h2>{empresa == null ? "Adicionar Empresa" : `Editar Empresa`}</h2>
            <form onSubmit={(e) => e.preventDefault()}>

                <label>
                    Nome:
                    <input value={nome} onChange={(e) => setNome(e.target.value)} />
                </label>

                <label>
                    CNPJ:
                    <input autoComplete="off" type="text" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
                </label>


                <label>
                    Imagem:
                    <input type="file" onChange={(e) => handleFileUpload(e.target.files[0])} />
                </label>

                {empresa == null ? (
                    <button type="button" onClick={handlePostEmpresa}>Enviar</button>
                ) : (
                    <button type="button" onClick={handlePutEmpresa}>Enviar Alterações</button>
                )}

            </form>
        </>
    )
}

export default FormsEmpresa