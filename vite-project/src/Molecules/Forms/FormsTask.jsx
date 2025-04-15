import { useState } from "react";
import { postTask, putTask } from '../../Utils/cruds/CrudsTask.jsx';

const FormsTask = ({ task, toogleModal, atualizarSprints, atualizarProjetos, atualizarTasks, usuarios, idSprint }) => {

    const [descricao, setDescricao] = useState(task?.descricao || "");
    const [dtInicio, setDtInicio] = useState(task?.dtInicio || "");
    const [dtFim, setDtFim] = useState(task?.dtFim || "");
    const [fkResponsavel, setFkResponsavel] = useState(task?.fkResponsavel || '#');
    const [progresso, setProgresso] = useState(task?.progresso || '');

    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

    const handlePostTask = async () => {
        const newTask = { "fkSprint": idSprint, descricao, dtInicio, dtFim, fkResponsavel, progresso };
        await postTask(newTask, toogleModal);
        atualizarSprints();
        atualizarProjetos();
        atualizarTasks();
    };

    const handlePutTask = async () => {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

        const modifiedTask = {
            idEditor: usuarioLogado.idUsuario,
            permissaoEditor: usuarioLogado.permissao,
            descricao,
            dtInicio,
            dtFim,
            fkResponsavel,
            progresso
        }
        await putTask(modifiedTask, task.idEntrega, toogleModal);
        atualizarSprints();
        atualizarProjetos();
        atualizarTasks();
    }

    return (
        <>
            <h2>{task == null ? "Adicionar Entrega" : usuarioLogado.permissao != 'FUNC' ? `Editar Entrega` : 'Editar Progresso'}</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                {usuarioLogado.permissao != 'FUNC' ?
                    <>
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

                        <label>
                            Responsável:
                            <select value={fkResponsavel} onChange={(e) => setFkResponsavel(e.target.value)}>
                                <option value="#">Selecione o responsável</option>
                                {usuarios.map((usuario) => (
                                    <option key={usuario.idUsuario} value={usuario.idUsuario}>{usuario.nome}</option>
                                ))}
                            </select>
                        </label>
                    </>
                    : null}

                {task == null ? (
                    <>

                        <button type="button" onClick={handlePostTask}>Enviar</button>
                    </>
                ) : (
                    <>
                        <label>
                            Progresso:
                            <input autoComplete="off" type="number" value={progresso} onChange={(e) => setProgresso(e.target.value)} />
                        </label>
                        <button type="button" onClick={handlePutTask}>Enviar Alterações</button>
                    </>
                )}

            </form>
        </>
    )
}

export default FormsTask