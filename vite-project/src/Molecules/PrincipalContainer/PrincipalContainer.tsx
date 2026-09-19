import { HeaderContent, MidleCarrousel, PrincipalContainerStyled, TituloHeader, CardsList } from './PrincipalContainer.styles'
import ProjectsCard, { ProjectsCardItem } from '../ProjectsCard/ProjectsCard'
import { MouseEvent, useEffect, useState } from 'react';
import ModalTarefas from '../Modais/ModalTarefas/ModalTarefas'
import { useNavigate, useParams } from 'react-router';
import { Stack, TextField, Button, Badge, Avatar, Tooltip, Pagination } from '@mui/material'
import { ArrowCircleLeftOutlined, Construction, ColorLens, Search, CalendarMonth } from '@mui/icons-material';
import ModalCores from '../Modais/ModalCores/ModalCores';
import Shader from '../Shader/Shader';
import { getNome } from '../../Utils/getInfos';
import ModalEmpresa from '../Mudal2/ModalEmpresa.jsx';
import ModalProjeto from '../Mudal2/ModalProjeto.jsx';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Projeto } from '../../Utils/cruds/CrudsProjeto';
import { Empresa } from '../../Utils/cruds/CrudsEmpresa';
import { Usuario } from '../../Utils/cruds/CrudsUsuario';

interface UsuarioLogadoExtras {
  permissao?: string;
  qtdTarefas?: number;
  comImpedimento?: boolean;
  tarefasVinculadas?: unknown[];
}

interface PrincipalContainerProps {
  toogleLateralBar: () => void;
  atualizarProjetos: (page?: number, nome?: string | null) => void | Promise<unknown>;
  atualizarEmpresas: (page?: number, nome?: string | null) => void | Promise<unknown>;
  projetos: Projeto[];
  pagesProjetos: number;
  empresas: Empresa[];
  pagesEmpresas: number;
  usuarios?: Usuario[];
  telaAtual: () => void;
}

const PrincipalContainer = ({ toogleLateralBar, atualizarProjetos, atualizarEmpresas, projetos, pagesProjetos, empresas, pagesEmpresas, telaAtual }: PrincipalContainerProps) => {

  const navigate = useNavigate();

  const { nomeEmpresa, idEmpresa } = useParams();

  const [projeto, setProjeto] = useState<ProjectsCardItem | null>(null);
  const [empresa, setEmpresa] = useState<ProjectsCardItem | null>(null);
  const [acao, setAcao] = useState('');
  const [listaFiltrada, setListaFiltrada] = useState<ProjectsCardItem[]>([]);

  const [popoverProjetoEmpresaAnchor, setPopoverProjetoEmpresaAnchor] = useState<Element | boolean | null>(null);

  const [totalPages] = useState((nomeEmpresa == 'Empresas' ? pagesEmpresas : pagesProjetos) || 0);

  const [page, setPage] = useState(0);

  const { usuario } = useAuth();
  const usuarioLogado = usuario as (typeof usuario & UsuarioLogadoExtras);
  const { color1, setColor1, color2, setColor2, color3, setColor3, animate, setAnimate } = useTheme();

  useEffect(() => {
    if (!usuarioLogado?.permissao?.includes("CONSULTOR") && (nomeEmpresa != usuarioLogado?.nomeEmpresa)) {
      navigate(-1);
    }
  }, [usuarioLogado, nomeEmpresa, navigate]);

  const filtrar = async (texto: string) => {
    if (texto !== '') {
      const textoLower = texto.toLowerCase();

      if (nomeEmpresa != "Empresas") await atualizarProjetos(0, textoLower);
      else await atualizarEmpresas(0, textoLower);

    } else {
      if (nomeEmpresa != "Empresas") await atualizarProjetos(0);
      else await atualizarEmpresas(0);
    }
  }

  useEffect(() => {
    toogleLateralBar();
    telaAtual();
    setListaFiltrada(nomeEmpresa == "Empresas" && empresas.length > 0 ? empresas : projetos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projetos, empresas, idEmpresa, nomeEmpresa, pagesEmpresas, pagesProjetos]);

  useEffect(() => {
    if (nomeEmpresa == 'Empresas') atualizarEmpresas(page);
    else atualizarProjetos(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const toogleModal = (entidade: ProjectsCardItem | null, acao: 'empresa' | 'projeto') => {
    setAcao(acao);
    setEmpresa(entidade);
    setProjeto(entidade);
    // setShowModal(!showModal);
    setPopoverProjetoEmpresaAnchor(!popoverProjetoEmpresaAnchor);
  };

  const handleOpenEmpresas = () => {
    navigate(`/Home/Empresas/${Number(1)}`);
  }

  const [anchorTarefa, setAnchorTarefa] = useState<Element | null>(null);
  const [anchorCores, setAnchorCores] = useState<Element | null>(null);

  const handleBadgeClickTarefa = (event: MouseEvent<Element>) => {
    setAnchorTarefa(event.currentTarget);
  };

  const handleBadgeClickCores = (event: MouseEvent<Element>) => {
    setAnchorCores(event.currentTarget);
  };

  const handlePopoverCloseTarefa = () => {
    setAnchorTarefa(null);
  };

  const handlePopoverCloseCores = () => {
    setAnchorCores(null);
  };

  const openPopoverTarefas = Boolean(anchorTarefa);
  const openPopoverCores = Boolean(anchorCores);

  console.log(listaFiltrada);

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
              color: "white",
              backgroundColor: "#1A1E22",
              cursor: "pointer",
              position: "relative",
              backgroundPosition: "center",
              transition: "0.52s ease",
              "&:hover": {
                backgroundImage: `url(data:image/png;base64,${empresas[0]?.urlImagem || (projetos[0] as Projeto & { urlImagemEmpresa?: string })?.urlImagemEmpresa})`,
                backgroundSize: "cover",
                color: "transparent",
              },
            }}
          >
            {getNome(usuarioLogado?.nome)}
          </Avatar>

          <TextField
            onChange={(e) => filtrar(e.target.value)}
            label=
            {nomeEmpresa == "Empresas" ?
              <Stack sx={{ flexDirection: 'row', gap: 0.5 }}> <Search /> Pesquisar por uma empresa...</Stack>
              :
              <Stack sx={{ flexDirection: 'row', gap: 0.5 }}><Search /> Pesquisar um projeto da <Stack style={{ color: '#90caf9' }}>{nomeEmpresa}</Stack></Stack>
            }

            size="small"
            sx={{ flex: 1, borderRadius: '10px', backgroundColor: '#1A1E22' }}
            autoComplete="off"
            InputLabelProps={{
              sx: {
                color: "white",
                '&.Mui-focused': {
                  color: 'white',
                }
              }
            }}
            InputProps={{
              sx: {
                color: "white",
                '& .MuiOutlinedInput-notchedOutline': {
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#fff'
                }
              }
            }} />
          {usuarioLogado?.permissao?.includes('CONSULTOR') ?
            nomeEmpresa == "Empresas" ?
              <Button onClick={() => toogleModal(null, 'empresa')}
                variant="contained">
                CRIAR EMPRESA
              </Button>
              :
              <Button onClick={() => toogleModal(null, 'projeto')}
                variant="contained">
                CRIAR PROJETO
              </Button>
            : null
          }
          <Tooltip title="Tarefas abertas em seu nome.">
            <Badge onClick={handleBadgeClickTarefa}
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '1.25rem',
                  height: '26px',
                  width: '26px',
                  cursor: 'pointer'
                }
              }} badgeContent={usuarioLogado?.qtdTarefas} color={usuarioLogado?.comImpedimento ? "error" : "primary"}>
              <CalendarMonth sx={{ fontSize: 32, cursor: 'pointer' }} />
            </Badge>
          </Tooltip>
          <Tooltip title="Editar cor de fundo.">
            <ColorLens onClick={handleBadgeClickCores}
              sx={{
                height: '40px',
                width: '40px',
                cursor: 'pointer'
              }} />
          </Tooltip>
        </Stack>
        <TituloHeader>{nomeEmpresa != "Empresas" && usuarioLogado?.permissao?.includes('CONSULTOR') ?
          <ArrowCircleLeftOutlined sx={{ cursor: 'pointer', fontSize: '45px', marginRight: 1 }} onClick={handleOpenEmpresas} /> : null}
          {nomeEmpresa == "Empresas" ? "MINHAS EMPRESAS" : "MEUS PROJETOS"}
        </TituloHeader>
      </HeaderContent>
      <MidleCarrousel>
        {listaFiltrada?.length > 0 ?
          <CardsList>
            {listaFiltrada.map(item => (
              <ProjectsCard
                key={item.idProjeto ?? item.idEmpresa}
                item={item}
                toogleModal={toogleModal}
              />
            ))}
            {/* {usuarioLogado?.permissao?.includes('CONSULTOR') ?
              <ProjectsCard toogleModal={toogleModal} ></ProjectsCard>
              : null} */}
            {/* //? Deixar com ou só o botão no */}
          </CardsList>
          : (
            <Stack sx={{ justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
              <Construction sx={{ fontSize: '5rem' }} />
              Nenhum projeto encontrado!
            </Stack>
          )}

        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ marginTop: '2rem' }}>
          <Pagination
            count={totalPages}
            page={page + 1}
            onChange={(e, value) => setPage(value - 1)}
            color="primary"
            siblingCount={5}
            boundaryCount={5}
            sx={{ "& .MuiPaginationItem-root": { color: "#fff" } }}
          />
        </Stack>
      </MidleCarrousel>

      {acao == 'empresa' ?
        <ModalEmpresa
          open={Boolean(popoverProjetoEmpresaAnchor)}
          anchorEl={popoverProjetoEmpresaAnchor}
          onClose={() => setPopoverProjetoEmpresaAnchor(null)}
          empresa={empresa}
          toogleModal={toogleModal}
          atualizarEmpresas={atualizarEmpresas}
        >
        </ModalEmpresa>

        :

        <ModalProjeto
          open={Boolean(popoverProjetoEmpresaAnchor)}
          anchorEl={popoverProjetoEmpresaAnchor}
          onClose={() => setPopoverProjetoEmpresaAnchor(null)}
          projeto={projeto}
          toogleModal={toogleModal}
          atualizarProjetos={atualizarProjetos}
          fkEmpresa={idEmpresa}
        >
        </ModalProjeto>
      }

      <ModalTarefas
        tarefas={usuarioLogado?.tarefasVinculadas as never[] | undefined}
        open={openPopoverTarefas}
        anchorEl={anchorTarefa}
        onClose={handlePopoverCloseTarefa}
      />
      <ModalCores
        open={openPopoverCores}
        anchorEl={anchorCores}
        onClose={handlePopoverCloseCores}
      />
    </PrincipalContainerStyled>

  )
}

export default PrincipalContainer;
