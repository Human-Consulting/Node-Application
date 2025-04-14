
import { useParams } from 'react-router'
import TarefaMini from '../TarefaMini/TarefaMini'
import { BackCentral, MidleCarrousel, TituloHeader } from './CentralTask.styles'
import { useEffect, useState } from 'react'
import { getTasks } from '../../Utils/cruds/CrudsTask'

const CentralTask = ({ toogleLateralBar, usuarios, idEmpresa, atualizarProjetos }) => {

  const { idSprint } = useParams();

  const [showModal, setShowModal] = useState(false);
    const [task, setTask] = useState(null);
    const [entregas, setEntregas] = useState([]);
    
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
        Tarefas da sprint {Number(idSprint)}
      </TituloHeader>
        <MidleCarrousel>
        {entregas.map((entrega, index) => (
      <TarefaMini idSprint={entrega.idSprint} indice={index + 1} entrega={entrega} key={entrega.index} toogleModal={toogleModal} atualizarProjetos={atualizarProjetos} />
    ))}
        </MidleCarrousel>
      

    </BackCentral>
  )
}

export default CentralTask
