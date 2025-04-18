import { useState } from "react";
import { postSprint, putSprint } from '../../Utils/cruds/CrudsSprint.jsx';

const FormsSprint = ({ sprint, toogleModal, atualizarSprints, atualizarProjetos, fkProjeto }) => {

    const [descricao, setDescricao] = useState(sprint?.descricao || "");
    const [dtInicio, setDtInicio] = useState(sprint?.dtInicio || "");
    const [dtFim, setDtFim] = useState(sprint?.dtFim || "");

    const handlePostSprint = async () => {
        const newSprint = { fkProjeto, descricao, dtInicio, dtFim };
        await postSprint(newSprint, toogleModal);
        atualizarSprints();
        atualizarProjetos();
    };

    const handlePutSprint = async () => {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

        const modifiedSprint = {
            idEditor: usuarioLogado.idUsuario,
            permissaoEditor: usuarioLogado.permissao,
            descricao,
            dtInicio,
            dtFim
        }
        await putSprint(modifiedSprint, sprint.idSprint, toogleModal);
        atualizarSprints();
        atualizarProjetos();
    }

    return (
        <>
            <h2>{sprint == null ? "Adicionar Sprint" : `Editar Sprint`}</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>
                    Descrição:
                    <textarea autoComplete="off" type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                </label>
                <label>
                    Data de Início:
                    <input autoComplete="off" type="date" value={dtInicio} onChange={(e) => setDtInicio(e.target.value)} />
                </label>
                <label>
                    Date Final:
                    <input autoComplete="off" type="date" value={dtFim} onChange={(e) => setDtFim(e.target.value)} />
                </label>

                {sprint == null ?
                    <button type="button" onClick={handlePostSprint}>Enviar</button>
                    :
                    <button type="button" onClick={handlePutSprint}>Enviar Alterações</button>
                }

            </form>
        </>
    )
}

export default FormsSprint