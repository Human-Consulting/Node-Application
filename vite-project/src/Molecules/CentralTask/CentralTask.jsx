
import { useParams } from 'react-router'
import TarefaMini from '../TarefaMini/TarefaMini'
import { BackCentral, MidleCarrousel, TituloHeader } from './CentralTask.styles'
import { useEffect, useState } from 'react'
import { getUsuarios } from '../../utils/cruds/CrudsUsuario'
import { getSprints } from '../../Utils/cruds/CrudsSprint'
import { getTasks } from '../../Utils/cruds/CrudsTask'

const CentralTask = ({ toogleLateralBar }) => {

  const { sprintId } = useParams();

  const [showModal, setShowModal] = useState(false);
    const [task, setTask] = useState(null);
    const [id, setId] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [sprints, setSprints] = useState([]);
  
    const buscarUsuarios = async () => {
      const usuarios = await getUsuarios();
      setUsuarios(usuarios);     
    };
  
    const atualizarSprints = async () => {
      const sprints = await getSprints(idProjeto);
      const sprintsDoProjeto = sprints.filter(sprint => sprint.fkProjeto == idProjeto);
      setSprints(sprintsDoProjeto);
      
    };
    
    const atualizarTasks = async () => {
      const tasks = await getTasks();
      setTasks(tasks);
      
    };
  
    useEffect(() => {
      buscarUsuarios();
      atualizarTasks();
      atualizarSprints();
      toogleLateralBar();
    }, []);
  
    const toogleModal = (task, newId) => {
      setId(newId)
      setTask(task);
      setShowModal(!showModal);
    };

    
  return (
    <BackCentral>
      <TituloHeader>
        Tarefas da sprint {Number(sprintId)}
      </TituloHeader>
        <MidleCarrousel>
        {tasks.filter(task => task.fkSprint == sprintId).map((task, index) => (
      <TarefaMini indice={task.idSprint} finalizado={task.finalizado} impedimento={task.impedido} title={task.descricao} progress={task.progresso} subtitle={usuarios.filter(usuario => usuario.idUsuario = task.fkResponsavel)[0].nome} status={task.finalizado ? 'ok' : 'other'} key={task.index}/>
    ))}
        </MidleCarrousel>
      

    </BackCentral>
  )
}

export default CentralTask
