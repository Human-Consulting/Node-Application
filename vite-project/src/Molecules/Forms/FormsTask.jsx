import { useState } from "react";
import { postTask, putTask } from '../../Utils/cruds/CrudsTask.jsx';

const FormsTask = ({ task, toogleModal, atualizarTasks, usuarios }) => {

    const [descricao, setDescricao] = useState(task?.descricao || "");
    const [dtInicio, setDtInicio] = useState(task?.dtInicio || "");
    const [dtFim, setDtFim] = useState(task?.dtFim || "");
    const [responsavel, setResponsavel] = useState(task?.responsavel || '#');
    const [progresso, setProgresso] = useState(task?.progresso || '0');

    const handlePostTask = async () => {
        const newTask = { descricao, dtInicio, dtFim, responsavel, progresso };
        await postTask(newTask, toogleModal);
        atualizarTasks();
    };

    const handlePutTask = async () => {
        const modifiedTask = { descricao, dtInicio, dtFim, responsavel, progresso }
        await putTask(modifiedTask, task.idSprint, toogleModal);
        atualizarTasks();
    }

    return (
        <>
            <h2>{task == null ? "Adicionar Task" : `Editar Task ${task.idSprint}`}</h2>
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

                {task == null ? (
                    <>
                        <label>
                            Responsável:
                            <select value={responsavel} onChange={(e) => setResponsavel(e.target.value)}>
                                <option value="#">Selecione o responsável</option>
                                {usuarios.map((usuario) => (
                                    <option key={usuario.idUsuario} value={usuario.idUsuario}>{usuario.nome}</option>
                                ))}
                            </select>
                        </label>

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