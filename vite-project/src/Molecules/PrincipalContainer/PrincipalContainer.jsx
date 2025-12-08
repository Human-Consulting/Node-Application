import { HeaderContent, MidleCarrousel, PrincipalContainerStyled, TituloHeader, CardsList } from './PrincipalContainer.styles'
import ProjectsCard from '../ProjectsCard/ProjectsCard'
import { useEffect, useState } from 'react';
import ModalTarefas from '../Modais/ModalTarefas/ModalTarefas.jsx'
import { useNavigate, useParams } from 'react-router';
import { Stack, TextField, Button, Badge, Avatar, Tooltip, Pagination, useTheme, Typography } from '@mui/material'
import { ArrowCircleLeftOutlined, Construction, ColorLens, Search, CalendarMonth } from '@mui/icons-material';
import ModalCores from '../Modais/ModalCores/ModalCores.jsx';
import Shader from '../Shader/Shader.jsx';
import { getNome } from '../../Utils/getInfos';
import ModalEmpresa from '../Mudal2/ModalEmpresa.jsx';
import ModalProjeto from '../Mudal2/ModalProjeto.jsx';

const PrincipalContainer = ({
  color1, setColor1,
  color2, setColor2,
  color3, setColor3,
  animate, setAnimate,
  toogleLateralBar,
  atualizarProjetos,
  atualizarEmpresas,
  projetos,
  pagesProjetos,
  empresas,
  pagesEmpresas,
  usuarios,
  telaAtual
}) => {

  const navigate = useNavigate();
  const theme = useTheme();

  const { nomeEmpresa, idEmpresa } = useParams();

  const [projeto, setProjeto] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [acao, setAcao] = useState('');
  const [listaFiltrada, setListaFiltrada] = useState([]);

  const [popoverProjetoEmpresaAnchor, setPopoverProjetoEmpresaAnchor] = useState(null);

  const [totalPages, setTotalPages] = useState(
    (nomeEmpresa === 'Empresas' ? pagesEmpresas : pagesProjetos) || 0
  );

  const [page, setPage] = useState(0);

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario')) || {};

if (
  !usuarioLogado?.permissao?.includes?.("CONSULTOR") && 
  nomeEmpresa !== usuarioLogado?.nomeEmpresa
) {
  navigate(-1);
}


  const filtrar = async (texto) => {
    if (texto !== '') {
      const textoLower = texto.toLowerCase();

      if (nomeEmpresa !== "Empresas") await atualizarProjetos(0, textoLower);
      else await atualizarEmpresas(0, textoLower);

    } else {
      if (nomeEmpresa !== "Empresas") await atualizarProjetos(0);
      else await atualizarEmpresas(0);
    }
  }

  useEffect(() => {
    toogleLateralBar();
    telaAtual();
    setListaFiltrada(nomeEmpresa === "Empresas" && empresas.length > 0 ? empresas : projetos);
  }, [projetos, empresas, idEmpresa, nomeEmpresa, pagesEmpresas, pagesProjetos]);

  useEffect(() => {
    nomeEmpresa === 'Empresas' ? atualizarEmpresas(page) : atualizarProjetos(page);
  }, [page]);

  const toogleModal = (entidade, acao) => {
    setAcao(acao);
    setEmpresa(entidade);
    setProjeto(entidade);
    setPopoverProjetoEmpresaAnchor(!popoverProjetoEmpresaAnchor);
  };

  const handleOpenEmpresas = () => {
    navigate(`/Home/Empresas/${Number(1)}`);
  }

  const [anchorTarefa, setAnchorTarefa] = useState(null);
  const [anchorCores, setAnchorCores] = useState(null);

  const handleBadgeClickTarefa = (event) => setAnchorTarefa(event.currentTarget);
  const handleBadgeClickCores = (event) => setAnchorCores(event.currentTarget);

  const handlePopoverCloseTarefa = () => setAnchorTarefa(null);
  const handlePopoverCloseCores = () => setAnchorCores(null);

  const openPopoverTarefas = Boolean(anchorTarefa);
  const openPopoverCores = Boolean(anchorCores);

  return (
    <PrincipalContainerStyled>
      <HeaderContent>
        <Shader animate={animate} color1={color1} color2={color2} color3={color3} index={1} />

        <Stack sx={{ flexDirection: 'row', width: '100%', gap: '1rem', position: 'relative', zIndex: '6', alignItems: 'center' }}>

          <Avatar
            sx={{
              width: 56,
              height: 56,
              fontWeight: "bold",
              fontSize: "0.9rem",
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.background.paper,
              cursor: "pointer",
              transition: "0.3s ease",
              "&:hover": {
                backgroundImage: `url(data:image/png;base64,${empresas[0]?.urlImagem || projetos[0]?.urlImagemEmpresa})`,
                backgroundSize: "cover",
                color: "transparent",
              },
            }}
          >
            {getNome(usuarioLogado.nome)}
          </Avatar>

          <TextField
            onChange={(e) => filtrar(e.target.value)}
            label={
              nomeEmpresa === "Empresas" ?
              <Stack sx={{ flexDirection: 'row', gap: 0.5, alignItems: 'center' }}>
  <Search />
  <Typography>
    Pesquisar por uma empresa...
  </Typography>
</Stack>
:
<Stack sx={{ flexDirection: 'row', gap: 0.5, alignItems: 'center' }}>
  <Search />
  <Typography>
    Pesquisar um projeto da
  </Typography>
  <Typography sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
    {nomeEmpresa}
  </Typography>
</Stack>

            }
            size="small"
            autoComplete="off"
            sx={{
              flex: 1,
              borderRadius: '10px',
              backgroundColor: theme.palette.background.paper
            }}
            InputLabelProps={{
              sx: {
                color: theme.palette.text.secondary,
                '&.Mui-focused': {
                  color: theme.palette.primary.main,
                }
              }
            }}
            InputProps={{
              sx: {
                color: theme.palette.text.primary,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.divider
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main
                }
              }
            }}
          />

         {usuarioLogado?.permissao?.includes?.('CONSULTOR') && (
            nomeEmpresa === "Empresas" ?
              <Button onClick={() => toogleModal(null, 'empresa')} variant="contained">
                CRIAR EMPRESA
              </Button>
              :
              <Button onClick={() => toogleModal(null, 'projeto')} variant="contained">
                CRIAR PROJETO
              </Button>
          )}

          <Tooltip title="Tarefas abertas em seu nome.">
            <Badge
              onClick={handleBadgeClickTarefa}
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '1.25rem',
                  height: '26px',
                  width: '26px',
                  cursor: 'pointer'
                }
              }}
              badgeContent={usuarioLogado.qtdTarefas}
              color={usuarioLogado.comImpedimento ? "error" : "primary"}
            >
              <CalendarMonth sx={{ fontSize: 32, cursor: 'pointer' }} />
            </Badge>
          </Tooltip>

          <Tooltip title="Editar cor de fundo.">
            <ColorLens
              onClick={handleBadgeClickCores}
              sx={{ height: '40px', width: '40px', cursor: 'pointer' }}
            />
          </Tooltip>

        </Stack>

        <TituloHeader>
          {nomeEmpresa !== "Empresas" && usuarioLogado?.permissao?.includes('CONSULTOR') &&
            <ArrowCircleLeftOutlined
              sx={{ cursor: 'pointer', fontSize: '45px', marginRight: 1 }}
              onClick={handleOpenEmpresas}
            />
          }
          {nomeEmpresa === "Empresas" ? "MINHAS EMPRESAS" : "MEUS PROJETOS"}
        </TituloHeader>
      </HeaderContent>

      <MidleCarrousel>
        {listaFiltrada?.length > 0 ? (
          <CardsList>
            {listaFiltrada.map(item => (
              <ProjectsCard key={item.id} item={item} toogleModal={toogleModal} />
            ))}
          </CardsList>
        ) : (
          <Stack sx={{ justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
            <Construction sx={{ fontSize: '5rem' }} />
            <Typography>
            Nenhum projeto encontrado!
            </Typography>
          </Stack>
        )}

        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ marginTop: '2rem' }}>
          <Pagination
            count={totalPages}
            page={page + 1}
            onChange={(e, value) => setPage(value - 1)}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                color: theme.palette.text.primary
              }
            }}
          />
        </Stack>
      </MidleCarrousel>

      {acao === 'empresa' ? (
        <ModalEmpresa
          open={Boolean(popoverProjetoEmpresaAnchor)}
          anchorEl={popoverProjetoEmpresaAnchor}
          onClose={() => setPopoverProjetoEmpresaAnchor(null)}
          empresa={empresa}
          toogleModal={toogleModal}
          atualizarEmpresas={atualizarEmpresas}
        />
      ) : (
        <ModalProjeto
          open={Boolean(popoverProjetoEmpresaAnchor)}
          anchorEl={popoverProjetoEmpresaAnchor}
          onClose={() => setPopoverProjetoEmpresaAnchor(null)}
          projeto={projeto}
          toogleModal={toogleModal}
          atualizarProjetos={atualizarProjetos}
          fkEmpresa={idEmpresa}
        />
      )}

      <ModalTarefas
        tarefas={usuarioLogado.tarefasVinculadas}
        open={openPopoverTarefas}
        anchorEl={anchorTarefa}
        onClose={handlePopoverCloseTarefa}
      />

      <ModalCores
        color1={color1}
        setColor1={setColor1}
        color2={color2}
        setColor2={setColor2}
        color3={color3}
        setColor3={setColor3}
        animate={animate}
        setAnimate={setAnimate}
        open={openPopoverCores}
        anchorEl={anchorCores}
        onClose={handlePopoverCloseCores}
      />

    </PrincipalContainerStyled>
  )
}

export default PrincipalContainer;
