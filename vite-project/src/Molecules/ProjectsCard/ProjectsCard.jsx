import { BodyCard, BoxBody, HeaderCard, Progress, ProgressBar, StatusCircle, Subtitle, Title } from './ProjectsCard.styles';
import { Stack, Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Block, Check, MoreVert } from '@mui/icons-material';
import { useWarningValidator } from '../../Utils/useWarning';

function ProjectsCard({ item, toogleModal }) {
  const { nomeEmpresa, idEmpresa } = useParams();
  const navigate = useNavigate();
  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
  const responsavelCard = item?.responsavel?.nome || 'Responsável não registrado';

  const handleOpenProject = async () => {
    nomeEmpresa == "Empresas" ? navigate(`/Home/${item.nome}/${Number(item.idEmpresa)}`)
      : navigate(`/Home/${nomeEmpresa}/${Number(idEmpresa)}/Roadmap/${item.titulo}/${Number(item.idProjeto)}`);
  }

  return (
    <>
      {item ?
        <BoxBody onClick={handleOpenProject} inclui={usuarioLogado.projetosVinculados.includes(item.idProjeto)} finalizado={item.progresso == 100}>
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
                toogleModal(item, nomeEmpresa == 'Empresas' ? 'empresa' : 'projeto');
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
            <Subtitle>{responsavelCard}</Subtitle>
           <Subtitle>
  <Typography component="span" fontWeight={700}>
    Orçamento:
  </Typography>{" "}
  {item.orcamento ? `R$${item.orcamento}` : 'N/A'}
</Subtitle>

            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <ProgressBar>
                <Progress sx={{ width: `${item.progresso}%` }} />
              </ProgressBar>
              <Subtitle>{item.progresso}%</Subtitle>
            </Stack>
          </BodyCard>
          <StatusCircle>
            {useWarningValidator(item)}
          </StatusCircle>
        </BoxBody>
        :
        <BoxBody onClick={() => toogleModal(null, nomeEmpresa == "Empresas" ? 'empresa' : 'projeto')} sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <Button
            variant="contained" >
            {nomeEmpresa == "Empresas" ? "CRIAR EMPRESA" : "CRIAR PROJETO"}
          </Button>
        </BoxBody>}
    </>
  );
}

export default ProjectsCard;
