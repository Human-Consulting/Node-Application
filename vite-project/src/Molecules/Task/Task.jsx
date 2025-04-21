import React, { useEffect, useState } from 'react'
import { TaskBody, SprintBody } from './Task.styles'
import TaskCard from '../../Atoms/TaskCard/TaskCard'
import Modal from '../Modal/Modal'
import FormsTask from '../Forms/FormsTask'
import { getSprints } from '../../Utils/cruds/CrudsSprint'
import { useNavigate, useParams } from 'react-router'
import FormsSprint from '../Forms/FormsSprint'
import { Stack, Typography, Button } from '@mui/material'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

const Task = ({ toogleLateralBar, atualizarProjetos, usuarios, showTitle }) => {

  const { idProjeto, idEmpresa, nomeEmpresa, descricaoProjeto } = useParams();
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
    navigate(`/Home/${nomeEmpresa}/${idEmpresa}/Dash/${descricaoProjeto}/${Number(idProjeto)}`)
  }

  useEffect(() => {
    atualizarSprints();
    toogleLateralBar();
  }, [idProjeto]);

  const toogleModal = (entidade, post, id) => {
    setAcao(post);
    setEntidade(entidade);
    setShowModal(!showModal);
    setId(id);
  };

  return (
    <>
      <TaskBody>
        {showTitle ?
            <Typography variant="h3" mt={3} mb={2} sx={{ display: 'flex', alignItems: 'center', position: 'relative', fontFamily: "Bebas Neue" }}><ArrowCircleLeftOutlinedIcon sx={{ cursor: 'pointer', fontSize: '45px', marginRight: 1 }} onClick={handleOpenProject} />{descricaoProjeto} - Roadmap <Button variant='contained' sx={{ cursor: 'pointer', position: 'absolute', right: 0 }} onClick={handleOpenDash}>Ir para Dashboard</Button></Typography>
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

      <Modal showModal={showModal} fechar={toogleModal}
        form={acao == 'task' ? <FormsTask task={entidade} toogleModal={toogleModal} usuarios={usuarios} idSprint={id} atualizarSprints={atualizarSprints} atualizarProjetos={atualizarProjetos} />
          : <FormsSprint sprint={entidade} toogleModal={toogleModal} fkProjeto={idProjeto} atualizarSprints={atualizarSprints} atualizarProjetos={atualizarProjetos} />}
      >
      </Modal>
    </>
  )
}

export default Task
