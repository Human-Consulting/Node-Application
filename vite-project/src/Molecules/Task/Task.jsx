import React, { useEffect, useState } from 'react'
import { TaskBody } from './Task.styles'
import TaskCard from '../../Atoms/TaskCard/TaskCard'
import Modal from '../Modal/Modal'
import FormsTask from '../Forms/FormsTask'
import { getUsuarios } from '../../Utils/cruds/CrudsUsuario'
import { getSprints } from '../../Utils/cruds/CrudsSprint'
import { useParams } from 'react-router'
import FormsSprint from '../Forms/FormsSprint'

const Task = ({ toogleLateralBar, idEmpresa }) => {

  const { idProjeto } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [entidade, setEntidade] = useState(null);
  const [id, setId] = useState(null);
  const [acao, setAcao] = useState('');
  const [usuariosList, setUsuariosList] = useState([]);
  const [sprintsList, setSprintsList] = useState([]);

  const buscarUsuarios = async () => {
    const usuarios = await getUsuarios(idEmpresa);
    setUsuariosList(usuarios);
    
  };

  const atualizarSprints = async () => {
    const sprints = await getSprints(idProjeto);
    setSprintsList(sprints);

  };

  useEffect(() => {
    buscarUsuarios();
    atualizarSprints();
    toogleLateralBar();
  }, []);

  const toogleModal = (entidade, post, id) => {
    setAcao(post);
    setEntidade(entidade);
    setShowModal(!showModal);
    setId(id);
  };

  return (
    <>
      <TaskBody>
        {sprintsList.map((sprint, index) => (
          <TaskCard toogleTaskModal={toogleModal} sprint={sprint} index={index + 1} />
        ))}
        <TaskCard toogleTaskModal={toogleModal} />
      </TaskBody>

      <Modal showModal={showModal} fechar={toogleModal}
        form={ acao == 'task' ? <FormsTask task={entidade} toogleModal={toogleModal} usuarios={usuariosList} idSprint={id} />
      : <FormsSprint sprint={entidade} toogleModal={toogleModal} fkProjeto={idProjeto} />}
      >
      </Modal>
    </>
  )
}

export default Task
