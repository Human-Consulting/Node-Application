import { BodyCard, BoxBody, HeaderCard, Progress, ProgressBar, StatusCircle, Subtitle, Title } from './ProjectsCard.styles';
import { Stack, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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
      : navigate(`/Home/${nomeEmpresa}/${Number(idEmpresa)}/Roadmap/${item.titulo}/${Number(item.idProjeto)}`);
    //? Utilizar? 
    // : navigate(`/Home/${nomeEmpresa}/${Number(idEmpresa)}/next-step/${item.descricao}/${Number(item.idProjeto)}`);
  }

  return (
    <>
      {item ?
        <BoxBody onClick={handleOpenProject} sx={{ border: `solid ${usuarioLogado.projetosVinculados.includes(item.idProjeto) ? 'white' : 'transparent'} 2px` }}>
          <HeaderCard sx={{
            backgroundImage: `url(data:image/png;base64,${item.urlImagem})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }} />
          <BodyCard>
            <Title>{item?.titulo || item.nome}</Title>
            <MoreVertIcon
              onClick={(e) => {
                e.stopPropagation();
                toogleModal(item, idEmpresa == 1 ? 'empresa' : 'projeto');
              }}
              sx={{
                color: '#FFF',
                position: 'absolute',
                right: '10px',
                cursor: 'pointer',
                transition: '0.3s',
                border: '1px solid transparent',
                borderRadius: '4px',

                '&:hover': {
                  border: '1px solid #f0f0f0'
                }
              }}
            />
            <Subtitle>{item?.responsavel?.nome != null && item?.nomeDiretor == null ? `Responsável: ${item.responsavel.nome}` : item.nomeDiretor == null ? "Diretor não registrado" : `Diretor: ${item.nomeDiretor}`}</Subtitle>
            <Subtitle><b>Orçamento:</b> R${item.orcamento}</Subtitle>
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
        <BoxBody onClick={() => toogleModal(null, idEmpresa == 1 ? 'empresa' : 'projeto')} sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <Button
            variant="contained" >
            {idEmpresa == 1 ? "CRIAR NOVA EMPRESA" : "CRIAR NOVO PROJETO"}
          </Button>
        </BoxBody>}
    </>
  );
}

export default ProjectsCard;
