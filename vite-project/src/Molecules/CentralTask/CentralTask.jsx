
import { useParams } from 'react-router'
import TarefaMini from '../TarefaMini/TarefaMini'
import { BackCentral, MidleCarrousel, TituloHeader } from './CentralTask.styles'
import { useEffect, useState } from 'react'
import { getTasks } from '../../Utils/cruds/CrudsTask'
import Modal from '../Modal/Modal'
import FormsTask from '../Forms/FormsTask'
import { getSprints } from '../../Utils/cruds/CrudsSprint'

const CentralTask = ({ toogleLateralBar, usuarios, idEmpresa, atualizarProjetos }) => {

  const { idSprint } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState(null);
  const [entregas, setEntregas] = useState([]);

  const atualizarSprints = async () => {
    const sprints = await getSprints(idSprint);
    setSprints(sprints);
  };

  const atualizarTasks = async () => {
    const entregas = await getTasks(idSprint);
    setEntregas(entregas);
  };

  useEffect(() => {
    atualizarTasks();
    toogleLateralBar();
  }, []);

  const toogleModal = (task) => {
    setTask(task);
    setShowModal(!showModal);
  };


  return (
    <BackCentral>
      <TituloHeader>
        Tarefas da sprint
      </TituloHeader>
      <MidleCarrousel>
        {entregas.map((entrega, index) => (
          <TarefaMini idSprint={entrega.idSprint} indice={index + 1} entrega={entrega} key={entrega.index} toogleModal={toogleModal} atualizarProjetos={atualizarProjetos} atualizarTasks={atualizarTasks} />
        ))}
      </MidleCarrousel>

      <Modal showModal={showModal} fechar={toogleModal}
        form=<FormsTask task={task} toogleModal={toogleModal} atualizarSprints={atualizarSprints} usuarios={usuarios} idSprint={idSprint} atualizarProjetos={atualizarProjetos} atualizarTasks={atualizarTasks} />
      >
      </Modal>

    </BackCentral>
  )
}

export default CentralTask
