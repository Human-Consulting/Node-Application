import { TarefaBody, ProgressBar, Progress } from './TarefasItem.style'
import { Avatar, Stack } from '@mui/material'
import { Block, Check, MoreVert } from '@mui/icons-material';
import { useEffect } from 'react';
import { useWarningValidator } from '../../Utils/useWarning';

const TarefasItem = ({ tarefa, toogleModal, index }) => {

  function getRandomColor(number) {
    if (number % 3 !== 1) {
      return '#22272B';  
    } else {
      return '#1D1D1D';  
    }
  }


  function extractLetters(str) {
    const isValidSpacing = /^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/.test(str);

    if (str.includes(' ') && isValidSpacing) {
        return str
            .split(' ')
            .filter(word => word.length > 0)
            .map(word => word[0])
            .join('');
    } else if (str.length >= 2 && isValidSpacing) {
        return str.slice(0, 2);
    } else if (str.length === 1) {
        return str;
    }
    return '';
}
  useEffect(() => {
console.log(tarefa)
  }, [])
  console.log(tarefa)

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

  const handleToogleModal = () => {
    const task = {
      idEditor: usuarioLogado.idUsuario,
      idTarefa: tarefa.idTarefa,
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      dtInicio: tarefa.dtInicio,
      dtFim: tarefa.dtFim,
      fkResponsavel: tarefa.responsavel.idUsuario,
      comentario: tarefa.comentario,
      comImpedimento: tarefa.comImpedimento,
      checkpoints: tarefa.checkpoints,
      progresso: tarefa.progresso
    }
    toogleModal(task);
  }
  
const {componente} = useWarningValidator(tarefa?.comImpedimento, tarefa?.dtFim);



  return (
    <TarefaBody sx={{ backgroundColor: getRandomColor(index), border: `solid ${tarefa.responsavel.idUsuario == usuarioLogado.idUsuario ? '#FFF' : 'transparent'} 3px` }}>
      <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Avatar sx={{
        backgroundColor: '#070707',
        fontSize: '14px',
        position: 'relative',
        '&:hover::after': {
          content: `"${tarefa?.responsavel?.nome || 'Default Name'}"`, 
          display: 'flex',
          backgroundColor: '#000000',
          color: 'white',
          fontSize: '10px', 
          padding: '5px',
          position: 'absolute',
          top: '0px',
          bottom: '0px',
          left: '50%',
          transform: 'translateX(-50%)',  
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          textAlign: 'center',
          borderRadius: '4px',
          minWidth: '50px', 
          maxWidth: '50px',  
          whiteSpace: 'normal',  
          wordBreak: 'break-word', 
          overflowWrap: 'break-word', 
          lineHeight: '1.2',          },
      }}>
       { extractLetters((tarefa?.responsavel?.nome).toUpperCase())}
        </Avatar>
        <Stack sx={{ flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
          {componente}
          <MoreVert
            onClick={(e) => {
              e.stopPropagation();
              handleToogleModal();
            }}  title={tarefa.responsavel.name}
            sx={{
              transition: '0.3s',
              border: '1px solid transparent',
              borderRadius: '4px',
              cursor: 'pointer',
              '&:hover': {
                border: '1px solid #f0f0f0'
              }
            }}
          />
        </Stack>
      </Stack>
      <span style={{textOverflow: 'ellipsis',whiteSpace: 'nowrap',overflow: 'hidden' }}>TituloS: {tarefa.titulo}</span>

      <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <ProgressBar>
          <Progress sx={{ width: `${tarefa.progresso}%` }} />
        </ProgressBar>
        {tarefa.progresso}%
      </Stack>
    </TarefaBody>
  )
}

export default TarefasItem
