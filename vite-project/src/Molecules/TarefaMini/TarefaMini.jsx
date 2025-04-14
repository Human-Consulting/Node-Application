import { BodyCard, BoxBody, Progress, ProgressBar, Subtitle, Title } from './TarefaMini.styles'
import { Button, Stack } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTask, putImpedimento } from './../../Utils/cruds/CrudsTask.jsx';

function TarefaMini({ indice, entrega, toogleModal, atualizarProjetos }) {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

  const handleToogleModal = () => {
    const task = {
      idEditor: usuarioLogado.idUsuario,
      idEntrega: entrega.idEntrega,
      descricao: entrega.descricao,
      dtInicio: entrega.dtInicio,
      dtFim: entrega.dtFim,
      fkResponsavel: entrega.fkResponsavel,
      progresso: entrega.progresso
    }
    toogleModal(task);
  }

  const handleDeleteTask = async () => {
    await deleteTask(entrega.idEntrega);
    atualizarProjetos();
    atualizarSprints();
  }

  const handleImpedimentoTask = async () => {
    const body = {
      idEditor: usuarioLogado.idUsuario
    }
    await putImpedimento(entrega.idEntrega, body);
    atualizarProjetos();
    atualizarSprints();
  }

  const validarPermissaoPut = () => {
    if (usuarioLogado.permissao === 'DIRETOR' ||
      usuarioLogado.permissao.includes('CONSULTOR') ||
      usuarioLogado.permissao === 'GESTOR') return true;
    if (usuarioLogado.idUsuario == entrega.fkResponsavel) return true;
    return false;
  };

  const validarPermissaoDelete = () => {
    if (usuarioLogado.permissao.includes('CONSULTOR')) return true;
    return false;
  };

  const temPermissaoPut = validarPermissaoPut();
  const temPermissaoDelete = validarPermissaoDelete();

  return (
    <>
      <BoxBody>

        <BodyCard>
          <Stack sx={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'start' }}>
            <Title>Tarefa: {indice}</Title>
            <Title>{entrega.nomeResponsavel}</Title>
          </Stack>
          <Subtitle>Responsavel: {entrega.descricao}</Subtitle>
          <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <ProgressBar>
              <Progress sx={{ width: `${entrega.progresso}%` }} />
            </ProgressBar>
            {entrega.progresso}%
          </Stack>
          <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            {entrega.progresso == 100 ?
              <Button fullWidth variant='outlined' color='info'>Tarefa Finalizada</Button>
              :
              <Button fullWidth variant='outlined' color={entrega.comImpedimento ? 'error' : 'success'} onClick={(e) => {
                e.stopPropagation();
                if (usuarioLogado.idUsuario === entrega.fkResponsavel) handleImpedimentoTask()
              }}>{entrega.comImpedimento ? 'Com Impedimento' : 'Sem Impedimento'}</Button>
            }
          </Stack>
        </BodyCard>
      </BoxBody>
    </>
  )
}

export default TarefaMini
