import { TaskBody } from './Task.styles'
import TaskCard from '../../Atoms/TaskCard/TaskCard'
import { MockSprint } from '../../Mock/MockSprint'

const Task = () => {
  return (
    <TaskBody>
       {MockSprint.map((item, index) => (
      <TaskCard maximo={item.tarefas.length} index={index} titulo={item.titulo} key={item.numero_sprint} progresso={item.porcentagem}totalEntregas={item.total_entregas} descricaoSprint={item.descricao} tarefas={item.tarefas} dataFim={item.data_fim} dataInicio={item.data_inicio} numeroSprint={item.numero_sprint} />
    ))}

    </TaskBody>
  )
}

export default Task
