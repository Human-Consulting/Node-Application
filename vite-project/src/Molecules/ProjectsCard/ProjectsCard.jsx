import { BodyCard, BoxBody, HeaderCard, Progress, ProgressBar, StatusCircle, Subtitle, Title } from './ProjectsCard.styles';
import { Stack, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Block, Check, MoreVert } from '@mui/icons-material';
import { useWarningValidator } from '../../Utils/useWarning';

function ProjectsCard({ item, toogleModal }) {
  const { nomeEmpresa, idEmpresa } = useParams();
  const navigate = useNavigate();
  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
  const responsavelCard = item?.nomeDiretor || item?.nomeResponsavel || 'Responsável não registrado';



     const {Componente} = useWarningValidator(item?.comImpedimento, item?.dtFim)

     console.log(item, 333)
 

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
            <MoreVert
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
            {/* <Subtitle>{item?.nomeDiretor === null ? "Diretor não registrado." : item?.nomeDiretor !== null ? `Diretor: ${item?.nomeDiretor}` : item?.nomeResponsavel !== null ? `Responsável: ${item.nomeResponsavel}` : item.nomeResponsavel == null ? "Responsável não registrado" : null}</Subtitle> */}
            <Subtitle>{responsavelCard}</Subtitle>
            <Subtitle><b>Orçamento:</b> R${item.orcamento}</Subtitle>
            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <ProgressBar>
                <Progress sx={{ width: `${item.progresso}%` }} />
              </ProgressBar>
              <Subtitle>{item.progresso}%</Subtitle>
            </Stack>
          </BodyCard>
          <StatusCircle  >
            {Componente}
          </StatusCircle>
        </BoxBody>
        :
        <BoxBody onClick={() => toogleModal(null, idEmpresa == 1 ? 'empresa' : 'projeto')} sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <Button
            variant="contained" >
            {idEmpresa == 1 ? "CRIAR EMPRESA" : "CRIAR PROJETO"}
          </Button>
        </BoxBody>}
    </>
  );
}

export default ProjectsCard;
