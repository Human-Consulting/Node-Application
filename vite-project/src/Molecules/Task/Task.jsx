import React, { useEffect, useState } from 'react'
import { TaskBody } from './Task.styles'
import TaskCard from '../../Atoms/TaskCard/TaskCard'
import Modal from '../Modal/Modal'
import FormsTask from '../Forms/FormsTask'
import { getSprints } from '../../Utils/cruds/CrudsSprint'
import { useParams } from 'react-router'
import FormsSprint from '../Forms/FormsSprint'

const Task = ({ toogleLateralBar, idEmpresa, atualizarProjetos, usuarios }) => {

  const { idProjeto } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [entidade, setEntidade] = useState(null);
  const [id, setId] = useState(null);
  const [acao, setAcao] = useState('');
  const [sprintsList, setSprintsList] = useState([]);

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

  const atualizarSprints = async () => {
    const sprints = await getSprints(idProjeto);
    setSprintsList(sprints);

  };

  useEffect(() => {
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
          <TaskCard toogleTaskModal={toogleModal} sprint={sprint} index={index + 1} atualizarSprints={atualizarSprints} atualizarProjetos={atualizarProjetos} idEmpresa={idEmpresa} />
        ))}
        {usuarioLogado.permissao != 'FUNC' ?
          <TaskCard toogleTaskModal={toogleModal} />
          : null}
      </TaskBody>

      <Modal showModal={showModal} fechar={toogleModal}
        form={acao == 'task' ? <FormsTask task={entidade} toogleModal={toogleModal} usuarios={usuarios} idSprint={id} atualizarSprints={atualizarSprints} atualizarProjetos={atualizarProjetos} />
          : <FormsSprint sprint={entidade} toogleModal={toogleModal} fkProjeto={idProjeto} atualizarSprints={atualizarSprints} atualizarProjetos={atualizarProjetos} />}
      >
      </Modal>
    </>
  )
}

export default Task
