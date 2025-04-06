import React, { useEffect, useState } from 'react'
import { TaskBody } from './Task.styles'
import TaskCard from '../../Atoms/TaskCard/TaskCard'
import Modal from '../Modal/Modal'
import FormsTask from '../Forms/FormsTask'
import { getUsuarios } from '../../utils/cruds/CrudsUsuario'
import { getTasks } from '../../Utils/cruds/CrudsTask'
import { getSprints } from '../../Utils/cruds/CrudsSprint'
import { useParams } from 'react-router'
import FormsSprint from '../Forms/FormsSprint'

const Task = ({ toogleLateralBar }) => {

  const { idProjeto } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [entidade, setEntidade] = useState(null);
  const [acao, setAcao] = useState('');
  const [usuariosList, setUsuariosList] = useState([]);
  const [tasksList, setTasksList] = useState([]);
  const [sprintsList, setSprintsList] = useState([]);

  const buscarUsuarios = async () => {
    const usuarios = await getUsuarios();
    setUsuariosList(usuarios);
  };

  const atualizarSprints = async () => {
    const sprints = await getSprints(idProjeto);
    const sprintsDoProjeto = sprints.filter(sprint => sprint.fkProjeto == idProjeto);
    setSprintsList(sprintsDoProjeto);

  };

  const atualizarTasks = async () => {
    const tasks = await getTasks();
    setTasksList(tasks);

  };

  useEffect(() => {
    buscarUsuarios();
    atualizarTasks();
    atualizarSprints();
    toogleLateralBar();
  }, []);

  const toogleModal = (entidade, post) => {
    setAcao(post);
    setEntidade(entidade);
    
    setShowModal(!showModal);
  };

  return (
    <>
      <TaskBody>
        {sprintsList.map((sprint) => (
          <TaskCard toogleTaskModal={toogleModal} sprint={sprint} tarefas={tasksList} usuarios={usuariosList} />
        ))}
        <TaskCard toogleTaskModal={toogleModal} />
      </TaskBody>

      <Modal showModal={showModal} fechar={toogleModal}
        form={ acao == 'task' ? <FormsTask task={entidade} toogleModal={toogleModal} atualizarTasks={atualizarTasks} usuarios={usuariosList} />
      : <FormsSprint sprint={entidade} toogleModal={toogleModal} atualizarSprints={atualizarSprints} />}
      >
      </Modal>
    </>
  )
}

export default Task
