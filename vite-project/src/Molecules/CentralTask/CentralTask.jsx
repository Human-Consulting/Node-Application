import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getTasks } from '../../Utils/cruds/CrudsTask';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

import { getSprints } from '../../Utils/cruds/CrudsSprint';
import { BackCentral, BodyTarefa, DoneContainer } from './CentralTask.styles';
import HeaderFilter from '../../Atoms/HeaderFilter/HeaderFilter';
import TarefasItem from '../../Atoms/TarefasItem/TarefasItem';
import { Stack, Typography } from '@mui/material';
import Modal from '../Modal/Modal';
import FormsTask from '../Forms/FormsTask';
import FormsSprint from '../Forms/FormsSprint';

const CentralTask = ({ toogleLateralBar, usuarios, atualizarProjetos }) => {
  const { idSprint, idProjeto } = useParams();
  const navigate = useNavigate();

  const [tarefas, setTarefas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [entidade, setEntidade] = useState(null);
  const [id, setId] = useState(null);
  const [acao, setAcao] = useState('');
  const [tarefasAFazerFiltradas, setTarefasAFazerFiltradas] = useState([]);
  const [tarefasEmDevFiltradas, setTarefasEmDevFiltradas] = useState([]);
  const [tarefasConcluidasFiltradas, setTarefasConcluidasFiltradas] = useState([]);

  const atualizarSprints = async () => {
    await getSprints(idSprint);
  };

    const toogleModal = (entidade, post, id) => {
    setAcao(post);
    setEntidade(entidade);
    setShowModal(!showModal);
    setId(id);
  };


    const handleOpenModalPutTask = (task) => {
    toogleModal(task, 'task', null);
  }

  const atualizarTasks = async () => {
    const tarefas = await getTasks(idSprint);
    setTarefas(tarefas);
  };

  useEffect(() => {
    atualizarTasks();
    toogleLateralBar();
  }, []);

  
  const handleOpenProject = async () => {
    navigate(-1)
  }


  useEffect(() => {
    const aFazer = tarefas.filter((t) => t.progresso === 0 );
    const emDev = tarefas.filter((t) => t.progresso > 0 && t.progresso < 100 );
    const concluidas = tarefas.filter((t) => t.progresso === 100);

    setTarefasAFazerFiltradas(aFazer);
    setTarefasEmDevFiltradas(emDev);
    setTarefasConcluidasFiltradas(concluidas);
  }, [tarefas]);

  return (
  <Stack sx={{width: '100%', height: '100%', padding: '1.5rem', gap: '1rem'}}>
 <Typography variant="h3" sx={{ display: 'flex', alignItems: 'center',  fontFamily: "Bebas Neue" }}><ArrowCircleLeftOutlinedIcon sx={{ cursor: 'pointer', fontSize: '45px', marginRight: 1 }} onClick={handleOpenProject}/> - Central de tarefas</Typography>
 <BackCentral>


      <DoneContainer>
        <HeaderFilter
          titulo="A Fazer"
          tarefaData={tarefas.filter((t) => t.progresso === 0 )}
          setTarefasFiltradas={setTarefasAFazerFiltradas}
        />
        <BodyTarefa>
          {tarefasAFazerFiltradas.map((tarefa, index) => (
            <TarefasItem
              key={index}
              toogleModal={handleOpenModalPutTask}
              tarefa={tarefa}
              atualizarProjetos={atualizarProjetos}
              atualizarSprints={atualizarSprints}
            />
          ))}
        </BodyTarefa>
      </DoneContainer>

      <DoneContainer>
        <HeaderFilter
          titulo="Em Desenvolvimento"
          tarefaData={tarefas.filter((t) => t.progresso > 0 && t.progresso < 100 )}
          setTarefasFiltradas={setTarefasEmDevFiltradas}
        />
        <BodyTarefa>
          {tarefasEmDevFiltradas.map((tarefa, index) => (
            <TarefasItem
              key={index}
               toogleModal={handleOpenModalPutTask}
              tarefa={tarefa}
              atualizarProjetos={atualizarProjetos}
              atualizarSprints={atualizarSprints}
            />
          ))}
        </BodyTarefa>
      </DoneContainer>

      {/* Coluna 3 */}
      <DoneContainer>
        <HeaderFilter
          titulo="Concluído"
          tarefaData={tarefas.filter((t) => t.progresso === 100)}
          setTarefasFiltradas={setTarefasConcluidasFiltradas}
        />
        <BodyTarefa>
          {tarefasConcluidasFiltradas.map((tarefa, index) => (
            <TarefasItem
              key={index}
               toogleModal={handleOpenModalPutTask}
              tarefa={tarefa}
              atualizarProjetos={atualizarProjetos}
              atualizarSprints={atualizarSprints}
            />
          ))}
        </BodyTarefa>
      </DoneContainer>
    </BackCentral>
       <Modal showModal={showModal} fechar={toogleModal} acao={entidade == null ? null : acao == "task" ? "aumentar" : null} entidade={entidade}
            form={acao == 'task' ? <FormsTask task={entidade} toogleModal={toogleModal} usuarios={usuarios} idSprint={id} atualizarSprints={atualizarSprints} atualizarProjetos={atualizarProjetos} />
              : <FormsSprint sprint={entidade} toogleModal={toogleModal} fkProjeto={idProjeto} atualizarSprints={atualizarSprints} atualizarProjetos={atualizarProjetos} acao={null} />}
          >
          </Modal>
    </Stack>
   
  );
};

export default CentralTask;
