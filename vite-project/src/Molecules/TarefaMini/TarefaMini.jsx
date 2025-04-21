import { BodyCard, BoxBody, Progress, ProgressBar, Subtitle, Title } from './TarefaMini.styles'
import { Button, Stack } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTask, putImpedimento } from './../../Utils/cruds/CrudsTask.jsx';

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
      progresso: tarefa.progresso
    }
    toogleModal(task);
  }

  const handleDeleteTask = async () => {
    await deleteTask(tarefa.idTarefa);
    atualizarProjetos();
    atualizarTasks();
  }

  const handleImpedimentoTask = async () => {
    const body = {
      idEditor: usuarioLogado.idUsuario
    }
    await putImpedimento(tarefa.idTarefa, body);
    atualizarProjetos();
    atualizarTasks();
  }

  const validarPermissaoPut = () => {
    if (usuarioLogado.permissao === 'DIRETOR' ||
      usuarioLogado.permissao.includes('CONSULTOR') ||
      usuarioLogado.permissao === 'GESTOR') return true;
    if (usuarioLogado.idUsuario == tarefa.fkResponsavel) return true;
    return false;
  };

  const validarPermissaoDelete = () => {
    if (usuarioLogado.permissao.includes('CONSULTOR')) return true;
    if (usuarioLogado.permissao == 'DIRETOR' || usuarioLogado.permissao == 'GESTOR') return true;
    return false;
  };

  const temPermissaoPut = validarPermissaoPut();
  const temPermissaoDelete = validarPermissaoDelete();

  return (
    <>
      {tarefa ?
        <BoxBody sx={{ border: `solid ${tarefa.fkResponsavel == usuarioLogado.idUsuario ? '#FFF' : 'transparent'} 1px` }}>
          <Stack sx={{ height: '20%', width: '100%', position: 'absolute', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <DeleteIcon
              onClick={(e) => {
                e.stopPropagation();
                if (temPermissaoDelete) handleDeleteTask();
              }}
              title={temPermissaoDelete ? "Excluir tarefa" : "Você não tem permissão"}
              sx={{
                color: temPermissaoDelete ? '#fff' : '#aaa',
                position: 'absolute',
                right: '40px',
                cursor: temPermissaoDelete ? 'pointer' : 'not-allowed',
                transition: '0.3s',
                opacity: temPermissaoDelete ? 1 : 0.5,
                border: '1px solid transparent',
                borderRadius: '4px',

                '&:hover': {
                  border: temPermissaoDelete ? '1px solid #f0f0f0' : '1px solid transparent'
                }
              }}
            />
            <EditIcon
              onClick={(e) => {
                e.stopPropagation();
                if (temPermissaoPut) handleToogleModal();
              }}
              title={temPermissaoPut ? "Excluir tarefa" : "Você não tem permissão"}
              sx={{
                color: temPermissaoPut ? '#fff' : '#aaa',
                position: 'absolute',
                right: '10px',
                cursor: temPermissaoPut ? 'pointer' : 'not-allowed',
                transition: '0.3s',
                opacity: temPermissaoPut ? 1 : 0.5,
                border: '1px solid transparent',
                borderRadius: '4px',

                '&:hover': {
                  border: temPermissaoPut ? '1px solid #f0f0f0' : '1px solid transparent'
                }
              }}
            />
          </Stack>
          <BodyCard>
            <Stack sx={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'start' }}>
              <Title>Tarefa: {indice}</Title>
            </Stack>
            <Subtitle>{tarefa.nomeResponsavel}</Subtitle>
            <Subtitle>{tarefa.descricao}</Subtitle>

            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <ProgressBar>
                <Progress sx={{ width: `${tarefa.progresso}%` }} />
              </ProgressBar>
              {tarefa.progresso}%
            </Stack>

            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              {tarefa.progresso == 100 ?
                <Button fullWidth variant='outlined' color='info'>Tarefa Finalizada</Button>
                :
                <Button fullWidth variant='outlined' color={tarefa.comImpedimento ? 'error' : 'success'} onClick={(e) => {
                  e.stopPropagation();
                  if (usuarioLogado.idUsuario === tarefa.fkResponsavel) handleImpedimentoTask()
                }}>{tarefa.fkResponsavel == usuarioLogado.idUsuario && tarefa.comImpedimento ? 'Remover Impedimento' : tarefa.fkResponsavel == usuarioLogado.idUsuario && !tarefa.comImpedimento ? 'Acionar Impedimento' : tarefa.comImpedimento ? 'Com Impedimento' : "Sem Impedimento"}</Button>
              }
            </Stack>
          </BodyCard>
        </BoxBody>
        :
        <BoxBody sx={{ justifyContent: 'center' }}>
          <BodyCard sx={{justifyContent: 'center'}}>
              <Button variant='contained' onClick={() => toogleModal(null)}>CRIAR NOVA TAREFA</Button>
          </BodyCard>
        </BoxBody>}
    </>
  )
}

export default TarefaMini
