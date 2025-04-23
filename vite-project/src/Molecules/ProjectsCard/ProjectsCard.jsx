import { BodyCard, BoxBody, HeaderCard, Progress, ProgressBar, StatusCircle, Subtitle, Title } from './ProjectsCard.styles';
import { Stack, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteProjeto } from './../../Utils/cruds/CrudsProjeto.jsx';
import { deleteEmpresa } from './../../Utils/cruds/CrudsEmpresa.jsx';
import CheckIcon from '@mui/icons-material/Check';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

function ProjectsCard({ item, toogleModal, atualizarProjetos, atualizarEmpresas }) {
  const { nomeEmpresa, idEmpresa } = useParams();
  const navigate = useNavigate();
  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

  let statusColor = '#08D13D';
  if (item) {
    if (item.progresso == 100) {
      statusColor = '#2196f3';
    }
    else if (item.comImpedimento == 0) {
      statusColor = '#08D13D';
    } else if (item.comImpedimento == 1 && item.progresso > 50) {
      statusColor = '#CED108';
    } else {
      statusColor = '#FF0707';
    }
  }

  const renderIconeStatusProjeto = () => {
    if (item.progresso == 100) return (<CheckIcon sx={{ fontSize: '22px' }} />);
    if (item.comImpedimento) return (<PriorityHighIcon sx={{ fontSize: '22px' }} />);

    return (<CheckIcon sx={{ fontSize: '25px' }} />);
  };

  const handleOpenProject = async () => {
    idEmpresa == 1 ? navigate(`/Home/${item.nome}/${Number(item.idEmpresa)}`)
      : navigate(`/Home/${nomeEmpresa}/${Number(idEmpresa)}/Roadmap/${item.descricao}/${Number(item.idProjeto)}`);
      //? Utilizar? 
      // : navigate(`/Home/${nomeEmpresa}/${Number(idEmpresa)}/next-step/${item.descricao}/${Number(item.idProjeto)}`);
  }

  const handleDelete = async () => {
    if (idEmpresa == 1) {
      await deleteEmpresa(item.idEmpresa);
      await atualizarEmpresas();
    } else {
      await deleteProjeto(item.idProjeto);
      await atualizarProjetos();
    }
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
      {item ?
        <BoxBody onClick={handleOpenProject} sx={{ border: `solid ${usuarioLogado.projetosVinculados.includes(item.idProjeto) ? 'white' : 'transparent'} 1px` }}>
          <HeaderCard sx={{
            backgroundImage: `url(data:image/png;base64,${item.urlImagem})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }} />
          <BodyCard>
              <Title>{item?.nomeResponsavel || item.diretor}</Title>
              <DeleteIcon
                onClick={(e) => {
                  e.stopPropagation();
                  if (temPermissaoDelete) handleDelete();
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
                  if (temPermissaoPut) toogleModal(item, idEmpresa == 1 ? 'empresa' : 'projeto');
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
            <Subtitle>Orçamento: R${item.orcamento}</Subtitle>
            <Subtitle>{item?.descricao || item.nome}</Subtitle>
            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <ProgressBar>
                <Progress sx={{ width: `${item.progresso}%` }} />
              </ProgressBar>
              <Subtitle>{item.progresso}%</Subtitle>
            </Stack>
          </BodyCard>
          <StatusCircle sx={{ border: `5px solid ${statusColor}` }}>
            {renderIconeStatusProjeto()}
          </StatusCircle>
        </BoxBody>
        :
        <BoxBody onClick={() => toogleModal(null, idEmpresa == 1 ? 'empresa' : 'projeto')} sx={{ alignItems: 'center' }}>
          <Button
            variant="contained" sx={{ position: 'absolute', top: '50%', zIndex: '40' }}>
            {idEmpresa == 1 ? "CRIAR NOVA EMPRESA" : "CRIAR NOVO PROJETO"}
          </Button>
          <BodyCard>
          </BodyCard>
        </BoxBody>}
    </>
  );
}

export default ProjectsCard;
