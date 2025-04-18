import { BodyCard, BoxBody, HeaderCard, Progress, ProgressBar, StatusCircle, Subtitle, Title } from './ProjectsCard.styles';
import { Stack, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteProjeto } from './../../Utils/cruds/CrudsProjeto.jsx';
import CheckIcon from '@mui/icons-material/Check';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

function ProjectsCard({ projeto, toogleProjetoModal, atualizarProjetos }) {
  const { nomeEmpresa, idEmpresa } = useParams();
  const navigate = useNavigate();
  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

  let statusColor = '#08D13D';
  if (projeto) {
    if (projeto.progresso == 100) {
      statusColor = '#2196f3';
    }
    else if (projeto.comImpedimento == 0) {
      statusColor = '#08D13D';
    } else if (projeto.comImpedimento == 1 && projeto.progresso > 50) {
      statusColor = '#CED108';
    } else {
      statusColor = '#FF0707';
    }
  }

  const renderIconeStatusProjeto = () => {
    if (projeto.progresso == 100) return (<CheckIcon sx={{ fontSize: '22px' }} />);
    if (projeto.comImpedimento) return (<PriorityHighIcon sx={{ fontSize: '22px' }} />);

    return (<CheckIcon sx={{ fontSize: '25px' }} />);
  };

  const handleOpenProject = () => {
    navigate(`/Home/${nomeEmpresa}/${idEmpresa}/Roadmap/${Number(projeto.idProjeto)}`);
  }

  const handleOpenModalPostProjeto = () => {
    toogleProjetoModal(null);
  }

  const handleOpenModalPutProjeto = () => {
    toogleProjetoModal(projeto);
  }

  const handleDeleteProjeto = async () => {
    await deleteProjeto(projeto.idProjeto);
    await atualizarProjetos();
  }

  const validarPermissaoPut = () => {
    if (usuarioLogado.permissao === 'DIRETOR' ||
      usuarioLogado.permissao.includes('CONSULTOR') ||
      usuarioLogado.permissao === 'GESTOR') return true;
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
      {projeto ?
        <BoxBody onClick={handleOpenProject}>
          <HeaderCard sx={{
            backgroundImage: `url(data:image/png;base64,${projeto.urlImagem})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }} />
          <BodyCard>
            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Title>{projeto.nomeResponsavel}</Title>
              <DeleteIcon
                onClick={(e) => {
                  e.stopPropagation();
                  if (temPermissaoDelete) handleDeleteProjeto();
                }}
                title={temPermissaoDelete ? "Excluir projeto" : "Você não tem permissão"}
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
                  if (temPermissaoPut) handleOpenModalPutProjeto();
                }}
                title={temPermissaoPut ? "Excluir projeto" : "Você não tem permissão"}
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
            <Subtitle>Orçamento: R${projeto.orcamento}</Subtitle>
            <Subtitle>{projeto.descricao}</Subtitle>
            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <ProgressBar>
                <Progress sx={{ width: `${projeto.progresso}%` }} />
              </ProgressBar>
              <Subtitle>{projeto.progresso}%</Subtitle>
            </Stack>
          </BodyCard>
          <StatusCircle sx={{ border: `5px solid ${statusColor}` }}>
            {renderIconeStatusProjeto()}
          </StatusCircle>
        </BoxBody>
        :
        <BoxBody onClick={handleOpenModalPostProjeto} sx={{ alignItems: 'center' }}>
          <Button
            variant="contained" sx={{ position: 'absolute', top: '50%', zIndex: '50' }}>
            CRIAR NOVO PROJETO
          </Button>
          <BodyCard>
          </BodyCard>
        </BoxBody>}
    </>
  );
}

export default ProjectsCard;
