import { useState } from "react";
import { postProjeto, putProjeto } from '../../Utils/cruds/CrudsProjeto.jsx';

const FormsProjeto = ({ projeto, toogleModal, atualizarProjetos, usuarios, fkEmpresa }) => {
    console.log(projeto);
    
    const [descricao, setDescricao] = useState(projeto?.descricao || "");
    const [orcamento, setOrcamento] = useState(projeto?.orcamento || 0.0);
    const [fkResponsavel, setResponsavel] = useState(projeto?.idResponsavel || '0');

    const handlePostProjeto = async () => {
        const newProjeto = { fkEmpresa, descricao, orcamento, fkResponsavel };
        await postProjeto(newProjeto, toogleModal);
        atualizarProjetos();
    };

    const handlePutProjeto = async () => {
        const modifiedProjeto = { descricao, orcamento, fkResponsavel }
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
                    <select value={fkResponsavel} onChange={(e) => setResponsavel(e.target.value)}>
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