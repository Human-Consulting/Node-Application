import { BodyCard, BoxBody, Progress, ProgressBar, Subtitle, Title } from './TarefaMini.styles'
import { Button, Stack } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CheckIcon from '@mui/icons-material/Check';

function TarefaMini({ indice, tarefa, toogleModal, atualizarProjetos, atualizarTasks }) {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

  const handleToogleModal = () => {
    const task = {
      idEditor: usuarioLogado.idUsuario,
      idTarefa: tarefa.idTarefa,
      descricao: tarefa.descricao,
      dtInicio: tarefa.dtInicio,
      dtFim: tarefa.dtFim,
      fkResponsavel: tarefa.fkResponsavel,
      progresso: tarefa.progresso,
      comImpedimento: tarefa.comImpedimento,
    }
    toogleModal(task);
  }

  const renderIconeStatusTarefa = () => {

    if (tarefa.progresso == 100) {
      return (
        <CheckIcon sx={{ border: 'solid #2196f3 3px', borderRadius: '50%', fontSize: '25px' }} />
      )
    }

    if (tarefa.comImpedimento && tarefa.progresso < 50) {
      return (
        <PriorityHighIcon sx={{ border: 'solid #F44336 3px', borderRadius: '50%', fontSize: '25px' }} />
      );
    }

    if (tarefa.comImpedimento) {
      return (
        <PriorityHighIcon sx={{ border: 'solid orange 3px', borderRadius: '50%', fontSize: '25px' }} />
      );
    }

    return null;

  };

  return (
    <>
      {tarefa ?
        <BoxBody sx={{ border: `solid ${tarefa.fkResponsavel == usuarioLogado.idUsuario ? '#FFF' : 'transparent'} 2px` }}>
          <BodyCard>
            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'start' }}>
              <Title>Tarefa: {indice}</Title>
              <Stack sx={{ flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                {renderIconeStatusTarefa()}
                <MoreVertIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToogleModal();
                  }}
                  sx={{
                    color: '#FFF',
                    cursor: 'pointer',
                    transition: '0.3s',
                    border: '1px solid transparent',
                    borderRadius: '4px',
                    '&:hover': {
                      border: '1px solid #f0f0f0'
                    }
                  }}
                />
              </Stack>
            </Stack>
            <Subtitle>{tarefa.nomeResponsavel}</Subtitle>
            <Subtitle>{tarefa.descricao}</Subtitle>
            <Subtitle>Data limite em {tarefa.dtFim}</Subtitle>

            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <ProgressBar>
                <Progress sx={{ width: `${tarefa.progresso}%` }} />
              </ProgressBar>
              {tarefa.progresso}%
            </Stack>
          </BodyCard>
        </BoxBody>
        :
        <BoxBody sx={{ justifyContent: 'center' }}>
          <Button variant='contained' onClick={() => toogleModal(null)}>CRIAR NOVA TAREFA</Button>
        </BoxBody>}
    </>
  )
}

export default TarefaMini
