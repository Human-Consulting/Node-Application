import { useState } from "react";
import { postProjeto, putProjeto } from '../../Utils/cruds/CrudsProjeto.jsx';

const FormsProjeto = ({ projeto, toogleModal, atualizarProjetos, usuarios, fkEmpresa }) => {

    const [descricao, setDescricao] = useState(projeto?.descricao || "");
    const [orcamento, setOrcamento] = useState(projeto?.orcamento || "");
    const [fkResponsavel, setResponsavel] = useState(projeto?.idResponsavel || '0');
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
        const newProjeto = { fkEmpresa, descricao, orcamento, fkResponsavel, urlImagem };
        await postProjeto(newProjeto, toogleModal);
        atualizarProjetos();
    };

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
        <>
            <h2>{projeto == null ? "Adicionar Projeto" : `Editar Projeto`}</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>
                    Descrição:
                    <textarea autoComplete="off" type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                </label>

                <label>
                    Orçamento:
                    <input autoComplete="off" type="number" value={orcamento} onChange={(e) => setOrcamento(e.target.value)} />
                </label>

                <label>
                    Responsável:
                    <select value={fkResponsavel} onChange={(e) => setResponsavel(e.target.value)}>
                        <option value="#">Selecione o responsável</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.idUsuario} value={usuario.idUsuario}>{usuario.nome}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Imagem:
                    <input type="file" onChange={(e) => handleFileUpload(e.target.files[0])} />
                </label>

                {projeto == null ? (
                    <button type="button" onClick={handlePostProjeto}>Enviar</button>
                ) : (
                    <button type="button" onClick={handlePutProjeto}>Enviar Alterações</button>
                )}

            </form>
        </>
    )
}

export default FormsProjeto