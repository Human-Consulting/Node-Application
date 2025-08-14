import { useState, useEffect, useRef } from "react";
import { Avatar, Box, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { BackChat, ContainerGeral, LateralMessage, Scroll, TextInput, ChatInputContainer, ContactItem, ChatInput, SendButton, Header, ItemHeader } from "./Chat.styles";
import ChatMessage from "../../Atoms/ChatMessage/ChatMessage";
import { Send, People, ChevronLeft, AddComment, Search, ChatBubbleOutline, AttachFile, ArrowCircleLeftOutlined, Settings } from '@mui/icons-material';
import { getSalas } from "../../Utils/cruds/CrudsSala";
import { postMensagem } from "../../Utils/cruds/CrudsMensagem";
import { useNavigate, useParams } from "react-router";
import Shader from "../Shader/Shader";
import ModalUsuariosChat from "../ModalUsuariosChat/ModalUsuariosChat";
import Modal from "../Modal/Modal";
import FormsSala from "../Forms/FormsSala";
import { io } from "socket.io-client";



const Chat = ({ toogleLateralBar, color1, color2, color3, animate, telaAtual, usuarios }) => {
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [salas, setSalas] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [sala, setSala] = useState(null);
  // const socket = io("localhost:3001");
  const socket = new WebSocket("ws://localhost:8080/chat");

  socket.onopen = () => {
    console.log("Conectado ao WebSocket Java");
    socket.send("Olá do front!");
  };

  socket.onmessage = (event) => {
    console.log("Mensagem recebida:", event.data);
  };

  const scrollRef = useRef(null);

  const navigate = useNavigate();

  const { idEmpresa, nomeEmpresa } = useParams();

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

  const fetchChats = async () => {
    const salas = await getSalas(usuarioLogado.idUsuario);
    setSalas(salas);
    console.log(salas);
    salas.forEach(sala => socket.emit("createRoom", { sala }));
  };

  useEffect(() => {
    fetchChats();
    toogleLateralBar(true);
    telaAtual();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selectedChatId, salas]);

  const selectedChat = salas.find(chat => chat.idSala === selectedChatId);

  const getSenderInfo = (chat, senderId) => {
    return chat.participants.find(participant => participant.idUsuario === senderId);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    socket.emit('chat message', ({
      room: selectedChat.nome, // nome da sala
      message: inputMessage.trim(),
      user: usuarioLogado.nome // ou ID
    }));

    setInputMessage("");
  };


  const toogleModal = (sala) => {
    setSala(sala);
    setShowModal(!showModal);
  };

  const handlePopoverCloseUsuario = () => {
    setAnchorUsuario(null);
  };

  function formatarDataMensagem(dataEnvio) {
    const agora = new Date();
    const dataMsg = new Date(dataEnvio);

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

  useEffect(() => {
    // Emitir o evento para entrar na sala, com dados que backend espera
    salas.forEach(sala => {
      socket.emit("joinRoom", { nomeSala: sala.nome, fkSala: sala.idSala }, (resposta) => {
        if (resposta.success) console.log(`Usuário ${usuarioLogado.nome} entrou na sala ${sala.nome}`);
        else console.error('Erro ao entrar:', resposta.error);
      });
    });

    // Escutar mensagens da sala
    socket.on("chat message", (msg) => {
      setSalas(prevSalas => prevSalas.map(s => {
        if (s.idSala === selectedChatId) {
          return {
            ...s,
            mensagens: [...(s.mensagens || []), msg]
          };
        }
        return s;
      }));
    });

    // Sempre que o selectedChat mudar, limpar o listener antigo para não duplicar
    return () => {
      socket.off("chat message");
    };
  });

  return (
    <ContainerGeral>
      <Shader animate={false} color1={color1} color2={color2} color3={color3} index={0} />
      <LateralMessage>
        <Stack sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <ItemHeader sx={{ justifyContent: 'space-between', gap: 0, width: '100%', paddingInline: '1rem' }}>
            <Typography variant="h4" sx={{ fontFamily: "Bebas Neue", padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowCircleLeftOutlined sx={{ cursor: 'pointer', fontSize: '30px' }} onClick={handleOpenProject} /> Chat</Typography>
            <AddComment sx={{
              cursor: 'pointer',
              transition: 'background 0.2s',
              '&:hover': {
                backgroundColor: '#888',
              },
            }} onClick={() => toogleModal(null)} />
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
              paddingInline: '1rem',
              margin: '0 1rem 1rem',
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

        </Stack>
        <Box sx={{ overflowY: 'auto', flex: 1 }}>
          {salas?.map(sala => (
            <ContactItem
              key={sala.idSala}
              active={sala.idSala === selectedChatId}
              onClick={() => setSelectedChatId(sala.idSala)}
            >
              <Avatar src={`data:image/png;base64,${sala.urlImagem}`} />
              <Stack sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
                <Stack sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                  <p style={{ color: '#FFF', fontSize: '14px' }}>{sala.nome}</p>

                  {sala?.mensagens[sala.mensagens.length - 1]?.horario && <p style={{ color: '#DDD', fontSize: '10px' }}>{formatarDataMensagem(sala?.mensagens[sala.mensagens.length - 1]?.horario)}</p>}
                </Stack>

                <p style={{
                  color: '#DDD', fontSize: '12px', textOverflow: 'ellipsis',
                  overflow: 'hidden', maxWidth: '200px'
                }}>{sala?.mensagens[sala.mensagens.length - 1]?.conteudo}</p>
              </Stack>
            </ContactItem>
          ))}
        </Box>
      </LateralMessage>

      <BackChat>
        {selectedChat ? <>
          <Header>
            <ItemHeader >
              <Avatar src={`data:image/png;base64,${selectedChat.urlImagem}`} />
              <Typography variant="h6" sx={{ color: '#fff', fontFamily: "Bebas Neue" }}>
                {selectedChat.nome}
              </Typography>
            </ItemHeader>
            <Settings onClick={() => toogleModal(selectedChat)} sx={{ cursor: 'pointer' }} />
          </Header>

          <Scroll ref={scrollRef}>
            {selectedChat?.mensagens.map(mensagem => {
              const sender = getSenderInfo(selectedChat, mensagem.idUsuario);
              return (
                <ChatMessage
                  key={mensagem.idMensagem}
                  userName={sender?.nome}
                  date={mensagem?.horario}
                  message={mensagem?.conteudo}
                  informativo={mensagem?.informativo}
                  isOwnMessage={mensagem?.idUsuario === usuarioLogado.idUsuario}
                />
              );
            })}
          </Scroll>

          <ChatInputContainer>
            {/* <IconButton sx={{ borderRadius: 0 }} onClick={handleAttachClick}>
              <AttachFile />
            </IconButton> */}

            <ChatInput
              placeholder="Digite uma mensagem"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />

            <SendButton variant="contained" onClick={handleSendMessage}>
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


      <Modal acao="aumentar1" showModal={showModal} fechar={toogleModal}
        form={<FormsSala sala={sala} toogleModal={toogleModal} usuarios={usuarios} atualizarSalas={fetchChats} />}
      >
      </Modal>
    </ContainerGeral>
  );
};

export default Chat;
