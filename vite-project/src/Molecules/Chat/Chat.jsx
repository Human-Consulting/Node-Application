import { useState, useEffect, useRef } from "react";
import { Avatar, Box, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import {
  BackChat, ContainerGeral, LateralMessage, Scroll, ChatInputContainer,
  ContactItem, ChatInput, SendButton, Header, ItemHeader
} from "./Chat.styles";
import ChatMessage from "../../Atoms/ChatMessage/ChatMessage";
import { Send, AddComment, Search, ChatBubbleOutline, ArrowCircleLeftOutlined, Settings } from '@mui/icons-material';
import { getSalas } from "../../Utils/cruds/CrudsSala";
import { useNavigate, useParams } from "react-router";
import Shader from "../Shader/Shader";
import Modal from "../Modal/Modal";
import FormsSala from "../Forms/FormsSala";

import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const Chat = ({ toogleLateralBar, color1, color2, color3, telaAtual, usuarios }) => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [salas, setSalas] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [sala, setSala] = useState(null);

  const [connected, setConnected] = useState(false);

  const stompClientRef = useRef(null);
  const scrollRef = useRef(null);

  const navigate = useNavigate();
  const { idEmpresa, nomeEmpresa } = useParams();
  const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

  // const socket = new SockJS("http://localhost:8080/ws-chat");
  // const client = new Client({
  //   webSocketFactory: () => socket,
  //   reconnectDelay: 5000,
  //   debug: (str) => console.log("STOMP DEBUG:", str),
  //   onConnect: () => {
  //     console.log("STOMP Conectado ✅");
  //     client.subscribe("/topic/teste", msg => {
  //       console.log("Mensagem recebida:", msg.body);
  //     });
  //     setConnected(true);
  //   },
  //   onStompError: (frame) => {
  //     console.error("Erro STOMP:", frame);
  //   }
  // });
  // client.activate();
  // stompClientRef.current = client;

  const socket = new SockJS("http://localhost:8080/ws-chat");
  const client = new Client({
    webSocketFactory: () => socket,
    debug: (str) => console.log("STOMP DEBUG:", str),
    reconnectDelay: 5000,
    onConnect: () => console.log("STOMP Conectado! ✅"),
    onStompError: (frame) => console.error("Erro STOMP:", frame),
  });

  client.activate();



  // useEffect(() => {
  //   // const socket = new SockJS("http://localhost:8080/ws-chat");
  //   const socket = new SockJS("http://localhost:8080/ws-chat");
  //   const stompClient = new Client({
  //     webSocketFactory: () => socket,
  //     reconnectDelay: 5000,
  //     onConnect: () => {
  //       console.log("Conectado ao STOMP");
  //       setConnected(true);

  //       // aqui você pode assinar as salas já carregadas
  //       salas.forEach(s => {
  //         stompClient.subscribe(`/topic/${s.idSala}`, (message) => {
  //           const msg = JSON.parse(message.body);
  //           console.log("Mensagem recebida: ", msg);
  //           setSalas(prev =>
  //             prev.map(sala =>
  //               sala.idSala === s.idSala
  //                 ? { ...sala, mensagens: [...(sala.mensagens || []), msg] }
  //                 : sala
  //             )
  //           );
  //         });
  //       });
  //     },
  //   });

  //   stompClient.activate();
  //   stompClientRef.current = stompClient;

  //   return () => stompClient.deactivate();
  // }, []); // <<< vazio, conecta só uma vez


  // Buscar salas do usuário
  const fetchChats = async () => {
    const salas = await getSalas(usuarioLogado.idUsuario);
    setSalas(salas);
    if (salas.length > 0 && !selectedChatId) {
      setSelectedChatId(salas[0].idSala);
    }
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

  useEffect(() => {
    if (connected && stompClientRef.current) {
      salas.forEach(s => {
        stompClientRef.current.subscribe(`/topic/${s.idSala}`, (message) => {
          const msg = JSON.parse(message.body);
          console.log("Mensagem recebida: ", msg);
          setSalas(prev =>
            prev.map(sala =>
              sala.idSala === s.idSala
                ? { ...sala, mensagens: [...(sala.mensagens || []), msg] }
                : sala
            )
          );
        });
      });
    }
  }, [connected, salas]);

  const selectedChat = salas.find(chat => chat.idSala === selectedChatId);

  const handleSendMessage = () => {
    if (!connected || !stompClientRef.current || !stompClientRef.current.connected) {
      console.warn("Tentando enviar sem conexão!");
      return;
    }

    if (!inputMessage.trim() || !selectedChat) return;

    const now = new Date();
    const mensagem = {
      conteudo: inputMessage.trim(),
      horario: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString().split('.')[0],
      fkSala: selectedChatId,
      fkUsuario: usuarioLogado.idUsuario,
    };

    stompClientRef.current.publish({
      destination: `/app/chat/${mensagem.fkSala}`,
      body: JSON.stringify(mensagem),
    });

    setInputMessage("");
  };


  const formatarDataMensagem = (dataEnvio) => {
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

    if (ehHoje) return dataMsg.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    if (ehOntem) return "Ontem";
    return dataMsg.toLocaleDateString();
  };

  const handleOpenProject = () => navigate(`/Home/${nomeEmpresa}/${idEmpresa}`);
  const toogleModal = (sala) => { setSala(sala); setShowModal(!showModal); };

  return (
    <ContainerGeral>
      <Shader animate={false} color1={color1} color2={color2} color3={color3} index={0} />
      <LateralMessage>
        <Stack>
          <ItemHeader sx={{ justifyContent: "space-between", width: "100%", paddingInline: "1rem" }}>
            <Typography variant="h4" sx={{ fontFamily: "Bebas Neue", padding: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <ArrowCircleLeftOutlined sx={{ cursor: "pointer", fontSize: "30px" }} onClick={handleOpenProject} /> Chat
            </Typography>
            <AddComment sx={{ cursor: "pointer" }} onClick={() => toogleModal(null)} />
          </ItemHeader>
          <TextField
            placeholder="Buscar sala..."
            size="small"
            autoComplete="off"
            variant="outlined"
            InputProps={{
              startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
            }}
            sx={{ width: "100%", paddingInline: "1rem", marginBottom: "1rem" }}
          />
        </Stack>
        <Box sx={{ overflowY: "auto", flex: 1 }}>
          {salas?.map(sala => (
            <ContactItem
              key={sala.idSala}
              active={sala.idSala === selectedChatId}
              onClick={() => setSelectedChatId(sala.idSala)}
            >
              <Avatar src={`data:image/png;base64,${sala.urlImagem}`} />
              <Stack sx={{ flex: 1 }}>
                <Stack sx={{ display: "flex", justifyContent: "space-between" }}>
                  <p style={{ color: "#FFF", fontSize: "14px" }}>{sala.nome}</p>
                  {sala?.mensagens?.length > 0 && (
                    <p style={{ color: "#DDD", fontSize: "10px" }}>
                      {formatarDataMensagem(sala.mensagens[sala.mensagens.length - 1]?.horario)}
                    </p>
                  )}
                </Stack>
                <p style={{ color: "#DDD", fontSize: "12px", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {sala?.mensagens?.[sala.mensagens.length - 1]?.conteudo}
                </p>
              </Stack>
            </ContactItem>
          ))}
        </Box>
      </LateralMessage>

      <BackChat>
        {selectedChat ? (
          <>
            <Header>
              <ItemHeader>
                <Avatar src={`data:image/png;base64,${selectedChat.urlImagem}`} />
                <Typography variant="h6" sx={{ color: "#fff", fontFamily: "Bebas Neue" }}>
                  {selectedChat.nome}
                </Typography>
              </ItemHeader>
              <Settings onClick={() => toogleModal(selectedChat)} sx={{ cursor: "pointer" }} />
            </Header>

            <Scroll ref={scrollRef}>
              {selectedChat?.mensagens?.map(mensagem => (
                <ChatMessage
                  key={mensagem.idMensagem || Math.random()}
                  userName={mensagem.nome}
                  date={mensagem.horario}
                  message={mensagem.conteudo}
                  informativo={mensagem.informativo}
                  isOwnMessage={mensagem.idUsuario === usuarioLogado.idUsuario}
                />
              ))}
            </Scroll>

            <ChatInputContainer>
              <ChatInput
                placeholder="Digite uma mensagem"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <SendButton variant="contained" onClick={handleSendMessage}><Send /></SendButton>
            </ChatInputContainer>
          </>
        ) : (
          <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Stack sx={{ textAlign: "center", background: "#151515", padding: "1rem", borderRadius: "15px" }}>
              <ChatBubbleOutline sx={{ fontSize: 64 }} />
              <Typography variant="h6" sx={{ fontFamily: "Bebas Neue" }}>
                Selecione um chat na lateral<br />para começar a conversar
              </Typography>
            </Stack>
          </Box>
        )}
      </BackChat>

      <Modal
        acao="aumentar1"
        showModal={showModal}
        fechar={toogleModal}
        form={<FormsSala sala={sala} toogleModal={toogleModal} usuarios={usuarios} atualizarSalas={fetchChats} />}
      />
    </ContainerGeral>
  );
};

export default Chat;
