import { useEffect, useState } from 'react';
import { TaskBody, SprintBody } from './Task.styles';
import TaskCard from '../../Atoms/TaskCard/TaskCard';
import Modal from '../Modal/Modal';
import FormsTask from '../Forms/FormsTask';
import { getSprints } from '../../Utils/cruds/CrudsSprint';
import { useNavigate, useParams } from 'react-router';
import FormsSprint from '../Forms/FormsSprint';
import { Stack, Typography, Button } from '@mui/material';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import Shader from '../Shader/Shader';

const Task = ({ toogleLateralBar, atualizarProjetos, usuarios, showTitle, color1, color2, color3, animate, telaAtual }) => {

  const { idProjeto, idEmpresa, nomeEmpresa, tituloProjeto } = useParams();
  const navigate = useNavigate();

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

  const handleOpenProject = async () => {
    navigate(`/Home/${nomeEmpresa}/${idEmpresa}`)
  }

  const handleOpenDash = async () => {
    navigate(`/Home/${nomeEmpresa}/${idEmpresa}/Dash/${tituloProjeto}/${Number(idProjeto)}`)
  }

  useEffect(() => {
    atualizarSprints();
    toogleLateralBar();
    telaAtual();
  }, [idProjeto]);

  const toogleModal = (entidade, post, id) => {
    setAcao(post);
    setEntidade(entidade);
    setShowModal(!showModal);
    setId(id);
  };

  return (
    <>
      <Shader animate={animate} color1={color1} color2={color2} color3={color3} index={0} />
      <TaskBody>
        {showTitle ?
          <Typography variant="h3" mt={3} sx={{ display: 'flex', alignItems: 'center', position: 'fixed', fontFamily: "Bebas Neue" }}><ArrowCircleLeftOutlinedIcon sx={{ cursor: 'pointer', fontSize: '45px', marginRight: 1 }} onClick={handleOpenProject} />{tituloProjeto} - Roadmap <Button variant='contained' sx={{ cursor: 'pointer', position: 'fixed', right: '2%' }} onClick={handleOpenDash}>Ir para Dashboard</Button></Typography>
          : <Stack sx={{ marginTop: '1.5rem' }} />}
        <SprintBody>

          {sprintsList.map((sprint, index) => (
            <TaskCard toogleTaskModal={toogleModal} sprint={sprint} index={index + 1} atualizarSprints={atualizarSprints} atualizarProjetos={atualizarProjetos} idEmpresa={idEmpresa} />
          ))}
          {usuarioLogado.permissao != 'FUNC' ?
            <TaskCard toogleTaskModal={toogleModal} />
            : null}
        </SprintBody>
      </TaskBody>

      <Modal showModal={showModal} fechar={toogleModal} acao={entidade == null ? null : acao == "task" ? "aumentar" : null} entidade={entidade}
        form={acao == 'task' ? <FormsTask task={entidade} toogleModal={toogleModal} usuarios={usuarios} idSprint={id} atualizarSprints={atualizarSprints} atualizarProjetos={atualizarProjetos} />
          : <FormsSprint sprint={entidade} toogleModal={toogleModal} fkProjeto={idProjeto} atualizarSprints={atualizarSprints} atualizarProjetos={atualizarProjetos} acao={null} />}
      >
      </Modal>
    </>
  )
}

export default Task
