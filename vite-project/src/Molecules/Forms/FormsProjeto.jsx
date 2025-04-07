import { useState } from "react";
import { postProjeto, putProjeto } from '../../Utils/cruds/CrudsProjeto.jsx';

const FormsProjeto = ({ projeto, toogleModal, atualizarProjetos, usuarios }) => {

    const [descricao, setDescricao] = useState(projeto?.descricao || "");
    const [orcamento, setOrcamento] = useState(projeto?.orcamento || 0.0);
    const [responsavel, setResponsavel] = useState(projeto?.responsavel || '#');

    const handlePostProjeto = async () => {
        const newProjeto = { descricao, orcamento, responsavel };
        await postProjeto(newProjeto, toogleModal);
        atualizarProjetos();
    };

    const handlePutProjeto = async () => {
        const modifiedProjeto = { descricao, orcamento, responsavel }
        await putProjeto(modifiedProjeto, projeto.idProjeto, toogleModal);
        atualizarProjetos();
    }

    return (
        <>
            <h2>{projeto == null ? "Adicionar Projeto" : `Editar Projeto ${projeto.idProjeto}`}</h2>
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
                    <select value={responsavel} onChange={(e) => setResponsavel(e.target.value)}>
                        <option value="#">Selecione o responsável</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.idUsuario} value={usuario.idUsuario}>{usuario.nome}</option>
                        ))}
                    </select>
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