
import { useParams } from 'react-router'
import { MockSprint } from '../../Mock/MockSprint'
import MiniProjectsCard from '../MiniProjectsCard/MiniProjectsCard'
import TarefaMini from '../TarefaMini/TarefaMini'
import { BackCentral, MidleCarrousel, TituloHeader } from './CentralTask.styles'

const CentralTask = () => {
  const { sprintId } = useParams();

    
  return (
    <BackCentral>
      <TituloHeader>
        Tarefas da sprint {Number(sprintId) + 1}
      </TituloHeader>
        <MidleCarrousel>
        {MockSprint[Number(sprintId)].tarefas.map((item, index) => (
      <TarefaMini indice={index + 1} finalizado={item.finalizado} impedimento={item.impedido} title={item.descricao} progress={item.progresso} subtitle={item.responsavel} status={item.finalizado ? 'ok' : 'other'} key={item.index}/>
    ))}
        </MidleCarrousel>
      

    </BackCentral>
  )
}

export default CentralTask
