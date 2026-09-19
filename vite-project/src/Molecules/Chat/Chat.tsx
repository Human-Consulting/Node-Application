import { BackChat, ContainerGeral, Scroll, ChatInputContainer, ChatInput, SendButton, Header, HeaderContent } from "./Chat.styles";
import { LateralMessage, LateralHeader, ItemHeader, LateralList, ContactItem, } from "./LateralChat.styles";
import { Send, Search, ChatBubbleOutline, ArrowCircleLeftOutlined, MoreVert, AddComment, ExpandMore, ExpandLess } from '@mui/icons-material';
import { Avatar, Box, ButtonBase, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postMensagem, MensagemPayload, Mensagem } from "../../Utils/cruds/CrudsMensagem";
import ChatMessage from "../../Atoms/ChatMessage/ChatMessage";
import { connect, disconnect } from "../../Utils/WebSocketConnection";
import { getSalas, Sala } from "../../Utils/cruds/CrudsSala";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect, useRef, useMemo } from "react";
import { Load } from '../../Utils/Load';
import Shader from "../Shader/Shader";
import Modal from "../Modal/Modal";
import ModalChatEditar from "../Modais/ModalChat/ModalChatEditar";
import ModalChatAdicionar from "../Modais/ModalChat/ModalChatAdicionar";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Usuario } from "../../Utils/cruds/CrudsUsuario";

interface UsuarioLogadoExtras {
  permissao?: string;
}

interface ChatMensagem extends Mensagem {
  idUsuario?: number | string;
  fkUsuario?: number | string;
  nome?: string;
  horario?: string;
  informativo?: boolean;
}

interface ChatParticipant {
  idUsuario?: number | string;
  nome?: string;
  [key: string]: unknown;
}

interface ChatSala extends Sala {
  urlImagem?: string;
  fkEmpresa?: number | string;
  nomeEmpresa?: string;
  mensagens?: ChatMensagem[];
  participants?: ChatParticipant[];
}

interface ChatProps {
  toogleLateralBar: (value?: boolean) => void;
  telaAtual: () => void;
  usuarios?: Usuario[];
}

const Chat = ({ toogleLateralBar, telaAtual, usuarios }: ChatProps) => {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [sala, setSala] = useState<ChatSala | null>(null);

  const [popoverAdicionarAnchor, setPopoverAdicionarAnchor] = useState<HTMLElement | null>(null);
  const [popoverEditarAnchor, setPopoverEditarAnchor] = useState<HTMLElement | null>(null);
  const [selectedSala, setSelectedSala] = useState<ChatSala | null>(null);

  const [gruposAbertos, setGruposAbertos] = useState<Record<string, boolean>>({});

  const scrollRef = useRef<HTMLDivElement>(null);
  // Keep the latest selectedChatId available to the WebSocket handler below
  // without needing to recreate the subscription every time it changes.
  const selectedChatIdRef = useRef(selectedChatId);

  const navigate = useNavigate();

  const { idEmpresa, nomeEmpresa } = useParams();

  const { usuario } = useAuth();
  const usuarioLogado = usuario as (typeof usuario & UsuarioLogadoExtras);
  const { color1, color2, color3, animate } = useTheme();
  const queryClient = useQueryClient();

  useEffect(() => {
    selectedChatIdRef.current = selectedChatId;
  }, [selectedChatId]);

  const salasQueryKey = ['salas', usuarioLogado?.idUsuario];

  const salasQuery = useQuery<ChatSala[]>({
    queryKey: salasQueryKey,
    queryFn: () => getSalas(usuarioLogado?.idUsuario as number) as Promise<ChatSala[]>,
    enabled: !!usuarioLogado?.idUsuario,
  });

  const ordenarSalas = (lista: ChatSala[] | undefined): ChatSala[] => {
    return [...(lista || [])]
      .map((sala) => ({
        ...sala,
        mensagens: [...(sala.mensagens || [])]
      }))
      .sort((a, b) => {
        const ultimoA = a.mensagens[a.mensagens.length - 1];
        const ultimoB = b.mensagens[b.mensagens.length - 1];

        if (!ultimoA) return 1;
        if (!ultimoB) return -1;

        return new Date(ultimoB.horario ?? '').getTime() - new Date(ultimoA.horario ?? '').getTime();
      });
  };

  // Memoized so this only produces a new array reference when the underlying
  // query data actually changes - keeps the scroll-to-bottom effect below
  // (which depends on `salas`) from firing on every unrelated re-render.
  const salas = useMemo(() => ordenarSalas(salasQuery.data), [salasQuery.data]);
  const loading = salasQuery.isPending;

  // Passed down to ModalChatAdicionar/ModalChatEditar as `atualizarSalas`,
  // called after a sala is created/edited to refresh the list.
  const fetchChats = async () => {
    return queryClient.invalidateQueries({ queryKey: salasQueryKey });
  };

  useEffect(() => {
    toogleLateralBar(true);
    telaAtual();

    return () => disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // (Re)subscribes to every sala's WebSocket room whenever the sala list
  // changes (initial load, or after a new sala is created). connect() only
  // subscribes to rooms it isn't already subscribed to, so this is safe to
  // call repeatedly. Incoming messages are merged straight into the React
  // Query cache instead of local state.
  useEffect(() => {
    if (!salasQuery.data) return;

    connect(salasQuery.data, (idSala: number, mensagem: unknown) => {
      const novaMensagem = mensagem as ChatMensagem;
      queryClient.setQueryData<ChatSala[]>(salasQueryKey, (prevSalas) => {
        if (!prevSalas) return prevSalas;

        return prevSalas.map(s => {
          if (s.idSala !== Number(idSala)) return s;

          const existentes = s.mensagens || [];
          if (existentes.some(m => m.idMensagem === novaMensagem.idMensagem)) return s;

          return {
            ...s,
            mensagens: [...existentes, { ...novaMensagem }],
          };
        });
      });

      if (selectedChatIdRef.current === Number(idSala)) {
        setTimeout(() => {
          scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
          });
        }, 100);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salasQuery.data]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selectedChatId, salas]);

  const selectedChat = salas?.find(chat => chat.idSala === selectedChatId);

  const getSenderInfo = (chat: ChatSala, senderId?: number | string) => {
    return chat.participants?.find(participant => participant.idUsuario === senderId);
  };

  interface SalasAgrupadasEntry {
    nomeEmpresa: string;
    salas: ChatSala[];
  }

  const salasAgrupadas = salas.reduce<Record<string, SalasAgrupadasEntry>>((acc, sala) => {
    const chave = String(sala.fkEmpresa);
    if (!acc[chave]) {
      acc[chave] = {
        nomeEmpresa: sala.nomeEmpresa || "Outros",
        salas: []
      };
    }
    acc[chave].salas.push(sala);
    return acc;
  }, {});

  const toggleGrupo = (empresaId: string) => {
    setGruposAbertos(prev => ({
      ...prev,
      [empresaId]: !prev[empresaId]
    }));
  };

  const enviarMensagemMutation = useMutation<Mensagem | false | null, Error, MensagemPayload>({
    mutationFn: postMensagem,
  });

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    const now = new Date();
    const mensagem: MensagemPayload = {
      conteudo: inputMessage.trim(),
      horario: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString().split('.')[0],
      fkSala: selectedChatId as number,
      fkUsuario: usuarioLogado?.idUsuario,
    };

    // The sent message arrives back for everyone (including the sender)
    // through the WebSocket subscription above, which updates the cache -
    // no need to invalidate/refetch here.
    const novaMensagem = await enviarMensagemMutation.mutateAsync(mensagem);
    if (novaMensagem) {
      setInputMessage("");
    }
  };

  const toogleModal = (sala: ChatSala | null) => {
    setSala(sala);
    setShowModal(!showModal);
  };

  function formatarDataMensagem(dataEnvio?: string) {
    const agora = new Date();
    const dataMsg = new Date(dataEnvio ?? '');

    const ehHoje =
      dataMsg.getDate() === agora.getDate() &&
      dataMsg.getMonth() === agora.getMonth() &&
      dataMsg.getFullYear() === agora.getFullYear();

    const ontem = new Date();
    ontem.setDate(ontem.getDate() - 1);

    const ehOntem =
      dataMsg.getDate() === ontem.getDate() &&
      dataMsg.getMonth() === ontem.getMonth() &&
      dataMsg.getFullYear() === ontem.getFullYear();

    if (ehHoje) {
      return dataMsg.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (ehOntem) {
      return "Ontem";
    } else {
      return dataMsg.toLocaleDateString();
    }
  }

  const handleOpenProject = async () => {
    navigate(`/Home/${nomeEmpresa}/${idEmpresa}`)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // NOTE: `filtrarSalas` was referenced by the search TextField below in the
  // original implementation without ever being defined (a pre-existing bug -
  // the search box never actually filtered anything). Declared here as a
  // no-op stub so the reference resolves; behavior (no filtering) is
  // unchanged from before.
  const filtrarSalas = (query: string) => { void query; };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }

    if (e.ctrlKey && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      document.execCommand('insertText', false, '**bold**');
    }

    if (e.key === ' ' && (e.target as HTMLInputElement).value.endsWith('-')) {
      const updated = (e.target as HTMLInputElement).value.replace(/-$/, '• ');
      setInputMessage(updated);
      e.preventDefault();
    }
  };


  const getPreview = (sala: ChatSala) => {

    const mensagens = sala?.mensagens || [];
    const ultimaMensagem = mensagens[mensagens.length - 1];
    if (!ultimaMensagem) return "";

    if (ultimaMensagem.informativo) {
      return ultimaMensagem.conteudo;
    }

    const ehMinha = ultimaMensagem.idUsuario === usuarioLogado?.idUsuario;

    if (ehMinha) {
      return `Você: ${ultimaMensagem.conteudo}`;
    }

    return `${ultimaMensagem.nome}: ${ultimaMensagem.conteudo}`;
  };

  function formatarQuebraDeDia(data?: string) {
    const agora = new Date();
    const msg = new Date(data ?? '');

    const ehHoje =
      msg.getDate() === agora.getDate() &&
      msg.getMonth() === agora.getMonth() &&
      msg.getFullYear() === agora.getFullYear();

    const ontem = new Date();
    ontem.setDate(ontem.getDate() - 1);

    const ehOntem =
      msg.getDate() === ontem.getDate() &&
      msg.getMonth() === ontem.getMonth() &&
      msg.getFullYear() === ontem.getFullYear();

    if (ehHoje) return "Hoje";
    if (ehOntem) return "Ontem";

    return msg.toLocaleDateString("pt-BR");
  }

  if (loading) return <Load />;

  return (
    <ContainerGeral>
      <Shader animate={false} color1={color1} color2={color2} color3={color3} index={0} />
      <LateralMessage>
        <LateralHeader>
          <ItemHeader>
            <Typography variant="h4" sx={{ fontFamily: "Bebas Neue", display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <IconButton onClick={handleOpenProject} sx={{ padding: 0 }}>
                <ArrowCircleLeftOutlined sx={{ cursor: 'pointer', fontSize: '30px' }} />
              </IconButton>
              Chat
            </Typography>
            <IconButton
              onClick={(e) => {
                setSelectedSala(null);
                setPopoverAdicionarAnchor(e.currentTarget);
              }}
              sx={{
                padding: 0,
                transition: 'background 0.2s',
                '&:hover': {
                  backgroundColor: '#888',
                },
              }}
            >
              <AddComment sx={{ cursor: 'pointer', fontSize: '20px' }} />
            </IconButton>

          </ItemHeader>
          <TextField
            onChange={(e) => filtrarSalas(e.target.value)}
            placeholder="Buscar sala..."
            size="small"
            autoComplete="off"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{
              width: '100%',
              input: { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#555',
                },
                '&:hover fieldset': {
                  borderColor: '#777',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#fff',
                },
              },
              '& label': {
                color: 'white',
              }
            }}
          />

        </LateralHeader>

        <LateralList>
          {usuarioLogado?.permissao?.includes("CONSULTOR") ? (

            Object.entries(salasAgrupadas).map(([idEmpresa, grupo]) => (
              <div key={idEmpresa}>
                <ButtonBase
                  sx={{
                    padding: "10px",
                    cursor: "pointer",
                    borderBottom: "1px solid #333",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "#fff",
                    width: "100%",
                    textAlign: "left",
                  }}
                  onClick={() => toggleGrupo(idEmpresa)}
                >
                  <span>{grupo.nomeEmpresa}</span>
                  <span>{gruposAbertos[idEmpresa] ? <ExpandLess /> : <ExpandMore />}</span>
                </ButtonBase>

                {gruposAbertos[idEmpresa] && (
                  <div>
                    {grupo.salas.map(sala => (
                      <ContactItem
                        component={ButtonBase}
                        key={sala.idSala}
                        active={sala.idSala === selectedChatId}
                        onClick={() => setSelectedChatId(sala.idSala ?? null)}
                      >
                        <Avatar src={`data:image/png;base64,${sala.urlImagem}`} />
                        <Stack sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, minWidth: 0 }}>
                          <Stack sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', minWidth: 0, maxWidth: '100%' }}>
                            <p style={{ color: '#FFF', fontSize: '14px', minWidth: 0 }}>{sala.nome}</p>

                            {sala?.mensagens?.[sala.mensagens.length - 1]?.horario && (
                              <p style={{ color: '#DDD', fontSize: '10px' }}>
                                {formatarDataMensagem(sala?.mensagens?.[sala.mensagens.length - 1]?.horario)}
                              </p>
                            )}
                          </Stack>
                          <p style={{
                            color: '#DDD', fontSize: '12px', textOverflow: 'ellipsis',
                            overflow: 'hidden', maxWidth: '90%', whiteSpace: 'nowrap'
                          }}>
                            {getPreview(sala)}
                          </p>
                        </Stack>
                      </ContactItem>
                    ))}
                  </div>
                )}

              </div>
            ))

          ) : (
            salas?.map(sala => (
              <ContactItem
                component={ButtonBase}
                key={sala.idSala}
                active={sala.idSala === selectedChatId}
                onClick={() => setSelectedChatId(sala.idSala ?? null)}
              >
                <Avatar src={`data:image/png;base64,${sala.urlImagem}`} />
                <Stack sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, minWidth: 0 }}>
                  <Stack sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', flex: 1, minWidth: 0 }}>
                    <p style={{ color: '#FFF', fontSize: '14px' }}>{sala.nome}</p>
                    {sala?.mensagens?.[sala.mensagens.length - 1]?.horario &&
                      <p style={{ color: '#DDD', fontSize: '10px' }}>{formatarDataMensagem(sala?.mensagens?.[sala.mensagens.length - 1]?.horario)}</p>}
                  </Stack>
                  <p style={{ color: '#DDD', fontSize: '12px', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '100%', whiteSpace: 'nowrap', minWidth: 0 }}>{!sala?.mensagens?.[sala.mensagens.length - 1]?.informativo && (sala?.mensagens?.length ?? 0) > 0 && sala?.mensagens?.[sala.mensagens.length - 1]?.nome + ": "} {sala?.mensagens?.[sala.mensagens.length - 1]?.conteudo}</p>
                </Stack>
              </ContactItem>
            ))

          )}
        </LateralList>
      </LateralMessage>

      <BackChat>
        {selectedChat ? <>
          <Header>
            <HeaderContent>
              <Avatar src={`data:image/png;base64,${selectedChat.urlImagem}`} />
              <Typography variant="h6" sx={{ color: '#fff', fontFamily: "Bebas Neue" }}>
                {selectedChat.nome}
              </Typography>
            </HeaderContent>
            <IconButton
              onClick={(e) => {
                setSelectedSala(selectedChat);
                setPopoverEditarAnchor(e.currentTarget)
              }}
              sx={{ padding: 0 }}
            >
              <MoreVert sx={{ cursor: 'pointer' }} />
            </IconButton>
          </Header>

          <Scroll ref={scrollRef}>
            {selectedChat?.mensagens?.map((mensagem, index) => {
              console.log("🪲", selectedChat);
              const sender = getSenderInfo(selectedChat, mensagem.idUsuario);
              const msgAtualData = new Date(mensagem.horario ?? '').toDateString();
              const msgAnteriorData =
                index > 0
                  ? new Date(selectedChat.mensagens?.[index - 1]?.horario ?? '').toDateString()
                  : null;

              const mudouDeDia = msgAtualData !== msgAnteriorData;

              return (
                <div key={mensagem.idMensagem}>
                  {mudouDeDia && (
                    <ChatMessage
                      informativo={true}
                      message={formatarQuebraDeDia(mensagem.horario)}
                    />
                  )}

                  <ChatMessage
                    userName={sender?.nome}
                    date={mensagem?.horario}
                    message={mensagem?.conteudo}
                    informativo={mensagem?.informativo}
                    isOwnMessage={mensagem?.idUsuario === usuarioLogado?.idUsuario}
                  />
                </div>
              );
            })}
          </Scroll>


          <ChatInputContainer>
            <ChatInput
              placeholder="Digite uma mensagem..."
              value={inputMessage}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <SendButton onClick={handleSendMessage}>
              <Send />
            </SendButton>
          </ChatInputContainer>

        </> :
          <>
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 2,
                zIndex: 20,
              }}
            >
              <Stack sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                background: "linear-gradient(180deg, #151515 0%, #0d0d0d 100%)",
                padding: '1rem',
                borderRadius: '15px'

              }}>
                <ChatBubbleOutline sx={{ fontSize: 64 }} />
                <Typography variant="h6" sx={{ fontFamily: 'Bebas Neue', textAlign: 'center' }}>
                  Selecione um chat na lateral<br />para começar a conversar
                </Typography>
              </Stack>
            </Box>
          </>}
      </BackChat>

      <ModalChatAdicionar
        open={Boolean(popoverAdicionarAnchor)}
        onClose={() => setPopoverAdicionarAnchor(null)}
        fkEmpresa={undefined}
        fkProjeto={undefined}
        atualizarSalas={fetchChats}
      />

      <ModalChatEditar
        open={Boolean(popoverEditarAnchor)}
        anchorEl={popoverEditarAnchor}
        onClose={() => setPopoverEditarAnchor(null)}
        sala={selectedSala}
        atualizarSalas={fetchChats}
      />


      {/* <Modal acao="aumentar1" showModal={showModal} fechar={toogleModal}
        form={<FormsSala sala={sala} toogleModal={toogleModal} usuarios={usuarios} atualizarSalas={fetchChats} />}
      >
      </Modal> */}
    </ContainerGeral>
  );
};

export default Chat;
