// import { BackChat, ContainerGeral, Scroll, ChatInputContainer, ChatInput, SendButton, Header, HeaderContent } from "./Chat.styles";
// import { LateralMessage, LateralHeader, ItemHeader, LateralList, ContactItem, } from "./LateralChat.styles";
// import { Send, Search, ChatBubbleOutline, ArrowCircleLeftOutlined, MoreVert, AddComment, ExpandMore, ExpandLess } from '@mui/icons-material';
// import { Avatar, Box, InputAdornment, Stack, TextField, Typography } from "@mui/material";
// import { postMensagem } from "../../Utils/cruds/CrudsMensagem";
// import ChatMessage from "../../Atoms/ChatMessage/ChatMessage";
// import { connect } from "../../Utils/WebSocketConnection";
// import { getSalas } from "../../Utils/cruds/CrudsSala";
// import { useNavigate, useParams } from "react-router";
// import { useState, useEffect, useRef } from "react";
// import FormsSala from "../Modal/Forms/FormsSala";
// import { Load } from '../../Utils/Load.jsx';
// import Shader from "../Shader/Shader";
// import Modal from "../Modal/Modal";
// import ModalChatEditar from "../Modais/ModalChat/ModalChatEditar.jsx";
// import ModalChatAdicionar from "../Modais/ModalChat/ModalChatAdicionar.jsx";


// const Chat = ({ toogleLateralBar, color1, color2, color3, animate, telaAtual, usuarios }) => {
//   const [selectedChatId, setSelectedChatId] = useState(1);
//   const [salas, setSalas] = useState([]);
//   const [inputMessage, setInputMessage] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [sala, setSala] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [popoverAnchor, setPopoverAnchor] = useState(null);
//   const [selectedSala, setSelectedSala] = useState(null);

//   const [gruposAbertos, setGruposAbertos] = useState({});

//   const scrollRef = useRef(null);

//   const navigate = useNavigate();

//   const { idEmpresa, nomeEmpresa } = useParams();

//   const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

//   const fetchChats = async () => {
//     setLoading(true);
//     const salas = await getSalas(usuarioLogado.idUsuario);
//     orderBy(salas);

//     connect(salas, (idSala, mensagem) => {
//       setSalas(prevSalas => {
//         const novasSalas = prevSalas.map(s => {
//           if (s.idSala !== Number(idSala)) return s;

//           const existentes = s.mensagens || [];
//           if (existentes.some(m => m.idMensagem === mensagem.idMensagem)) return s;

//           return {
//             ...s,
//             mensagens: [...existentes, { ...mensagem }],
//           };
//         });

//         const ordenadas = [...novasSalas].sort((a, b) => {
//           const ultimoA = a.mensagens[a.mensagens.length - 1];
//           const ultimoB = b.mensagens[b.mensagens.length - 1];

//           if (!ultimoA) return 1;
//           if (!ultimoB) return -1;

//           return new Date(ultimoB.horario) - new Date(ultimoA.horario);
//         });

//         return ordenadas;
//       });

//       if (selectedChatId === Number(idSala)) {
//         setTimeout(() => {
//           scrollRef.current?.scrollTo({
//             top: scrollRef.current.scrollHeight,
//             behavior: "smooth",
//           });
//         }, 100);
//       }
//     });
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchChats();
//     toogleLateralBar(true);
//     telaAtual();
//   }, []);

//   const orderBy = (salas) => {
//     setSalas(
//       salas
//         .map((sala) => ({
//           ...sala, mensagens: sala.mensagens
//         }))
//         .sort((a, b) => {
//           const ultimoA = a.mensagens[a.mensagens.length - 1];
//           const ultimoB = b.mensagens[b.mensagens.length - 1];

//           if (!ultimoA) return 1;
//           if (!ultimoB) return -1;

//           return new Date(ultimoB.horario) - new Date(ultimoA.horario);
//         })
//     );
//   }

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [selectedChatId, salas]);

//   const selectedChat = salas?.find(chat => chat.idSala === selectedChatId);

//   const getSenderInfo = (chat, senderId) => {
//     return chat.participants.find(participant => participant.idUsuario === senderId);
//   };

//   const salasAgrupadas = salas.reduce((acc, sala) => {
//     if (!acc[sala.fkEmpresa]) {
//       acc[sala.fkEmpresa] = {
//         nomeEmpresa: sala.nomeEmpresa || "Outros",
//         salas: []
//       };
//     }
//     acc[sala.fkEmpresa].salas.push(sala);
//     return acc;
//   }, {});

//   const toggleGrupo = (empresaId) => {
//     setGruposAbertos(prev => ({
//       ...prev,
//       [empresaId]: !prev[empresaId]
//     }));
//   };

//   const handleSendMessage = async () => {
//     if (!inputMessage.trim()) return;
//     const now = new Date();
//     const mensagem = {
//       conteudo: inputMessage.trim(),
//       horario: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString().split('.')[0],
//       fkSala: selectedChatId,
//       fkUsuario: usuarioLogado.idUsuario,
//     };

//     const novaMensagem = await postMensagem(mensagem);
//     if (novaMensagem) {
//       setInputMessage("");
//     }
//   };

//   const toogleModal = (sala) => {
//     setSala(sala);
//     setShowModal(!showModal);
//   };

//   function formatarDataMensagem(dataEnvio) {
//     const agora = new Date();
//     const dataMsg = new Date(dataEnvio);

//     const ehHoje =
//       dataMsg.getDate() === agora.getDate() &&
//       dataMsg.getMonth() === agora.getMonth() &&
//       dataMsg.getFullYear() === agora.getFullYear();

//     const ontem = new Date();
//     ontem.setDate(ontem.getDate() - 1);

//     const ehOntem =
//       dataMsg.getDate() === ontem.getDate() &&
//       dataMsg.getMonth() === ontem.getMonth() &&
//       dataMsg.getFullYear() === ontem.getFullYear();

//     if (ehHoje) {
//       return dataMsg.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     } else if (ehOntem) {
//       return "Ontem";
//     } else {
//       return dataMsg.toLocaleDateString();
//     }
//   }

//   const handleOpenProject = async () => {
//     navigate(`/Home/${nomeEmpresa}/${idEmpresa}`)
//   }

//   const handleInputChange = (e) => {
//     setInputMessage(e.target.value);
//     e.target.style.height = 'auto';
//     e.target.style.height = `${e.target.scrollHeight}px`;
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }

//     if (e.ctrlKey && e.key.toLowerCase() === 'b') {
//       e.preventDefault();
//       document.execCommand('insertText', false, '**bold**');
//     }

//     if (e.key === ' ' && e.target.value.endsWith('-')) {
//       const updated = e.target.value.replace(/-$/, '• ');
//       setInputMessage(updated);
//       e.preventDefault();
//     }
//   };


//   const getPreview = (sala) => {

//     const mensagens = sala?.mensagens || [];
//     const ultimaMensagem = mensagens[mensagens.length - 1];
//     if (!ultimaMensagem) return "";

//     if (ultimaMensagem.informativo) {
//       return ultimaMensagem.conteudo;
//     }

//     const ehMinha = ultimaMensagem.idUsuario === usuarioLogado.idUsuario;

//     if (ehMinha) {
//       return `Você: ${ultimaMensagem.conteudo}`;
//     }

//     return `${ultimaMensagem.nome}: ${ultimaMensagem.conteudo}`;
//   };

//   function formatarQuebraDeDia(data) {
//     const agora = new Date();
//     const msg = new Date(data);

//     const ehHoje =
//       msg.getDate() === agora.getDate() &&
//       msg.getMonth() === agora.getMonth() &&
//       msg.getFullYear() === agora.getFullYear();

//     const ontem = new Date();
//     ontem.setDate(ontem.getDate() - 1);

//     const ehOntem =
//       msg.getDate() === ontem.getDate() &&
//       msg.getMonth() === ontem.getMonth() &&
//       msg.getFullYear() === ontem.getFullYear();

//     if (ehHoje) return "Hoje";
//     if (ehOntem) return "Ontem";

//     return msg.toLocaleDateString("pt-BR");
//   }

//   if (loading) return <Load animate={animate} color1={color1} color2={color2} color3={color3} index={0} />;

//   return (
//     <ContainerGeral>
//       <Shader animate={false} color1={color1} color2={color2} color3={color3} index={0} />
//       <LateralMessage>
//         <LateralHeader>
//           <ItemHeader>
//             <Typography variant="h4" sx={{ fontFamily: "Bebas Neue", display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowCircleLeftOutlined sx={{ cursor: 'pointer', fontSize: '30px' }} onClick={handleOpenProject} /> Chat</Typography>
//             <AddComment sx={{
//               cursor: 'pointer',
//               transition: 'background 0.2s',
//               fontSize: '30px',
//               fontSize: '20px',
//               '&:hover': {
//                 backgroundColor: '#888',
//               },
//               // }} onClick={() => toogleModal(null)} />
//             }} onClick={(e) => {
//               setSelectedSala(null);
//               setPopoverAnchor(e.currentTarget);
//             }} />

//           </ItemHeader>
//           <TextField
//             onChange={(e) => filtrarSalas(e.target.value)}
//             placeholder="Buscar sala..."
//             size="small"
//             autoComplete="off"
//             variant="outlined"
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Search />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{
//               width: '100%',
//               input: { color: 'white' },
//               '& .MuiOutlinedInput-root': {
//                 '& fieldset': {
//                   borderColor: '#555',
//                 },
//                 '&:hover fieldset': {
//                   borderColor: '#777',
//                 },
//                 '&.Mui-focused fieldset': {
//                   borderColor: '#fff',
//                 },
//               },
//               '& label': {
//                 color: 'white',
//               }
//             }}
//           />

//         </LateralHeader>

//         <LateralList>
//           {usuarioLogado.permissao.includes("CONSULTOR") ? (

//             Object.entries(salasAgrupadas).map(([idEmpresa, grupo]) => (
//               <div key={idEmpresa}>
//                 <div
//                   style={{
//                     padding: "10px",
//                     cursor: "pointer",
//                     // background: "#1f1f1f",
//                     borderBottom: "1px solid #333",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     color: "#fff"
//                   }}
//                   onClick={() => toggleGrupo(idEmpresa)}
//                 >
//                   <span>{grupo.nomeEmpresa}</span>
//                   <span>{gruposAbertos[idEmpresa] ? <ExpandLess /> : <ExpandMore />}</span>
//                 </div>

//                 {gruposAbertos[idEmpresa] && (
//                   <div>
//                     {grupo.salas.map(sala => (
//                       <ContactItem
//                         key={sala.idSala}
//                         active={sala.idSala === selectedChatId}
//                         onClick={() => setSelectedChatId(sala.idSala)}
//                       >
//                         <Avatar src={`data:image/png;base64,${sala.urlImagem}`} />
//                         <Stack sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, minWidth: 0 }}>
//                           <Stack sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', minWidth: 0, maxWidth: '100%' }}>
//                             <p style={{ color: '#FFF', fontSize: '14px', minWidth: 0 }}>{sala.nome}</p>

//                             {sala?.mensagens[sala.mensagens.length - 1]?.horario && (
//                               <p style={{ color: '#DDD', fontSize: '10px' }}>
//                                 {formatarDataMensagem(sala?.mensagens[sala.mensagens.length - 1]?.horario)}
//                               </p>
//                             )}
//                           </Stack>
//                           <p style={{
//                             color: '#DDD', fontSize: '12px', textOverflow: 'ellipsis',
//                             overflow: 'hidden', maxWidth: '90%', whiteSpace: 'nowrap'
//                           }}>
//                             {getPreview(sala)}
//                           </p>
//                         </Stack>
//                       </ContactItem>
//                     ))}
//                   </div>
//                 )}

//               </div>
//             ))

//           ) : (
//             salas?.map(sala => (
//               <ContactItem
//                 key={sala.idSala}
//                 active={sala.idSala === selectedChatId}
//                 onClick={() => setSelectedChatId(sala.idSala)}
//               >
//                 <Avatar src={`data:image/png;base64,${sala.urlImagem}`} />
//                 <Stack sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, minWidth: 0 }}>
//                   <Stack sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', flex: 1, minWidth: 0 }}>
//                     <p style={{ color: '#FFF', fontSize: '14px' }}>{sala.nome}</p>
//                     {sala?.mensagens[sala.mensagens.length - 1]?.horario &&
//                       <p style={{ color: '#DDD', fontSize: '10px' }}>{formatarDataMensagem(sala?.mensagens[sala.mensagens.length - 1]?.horario)}</p>}
//                   </Stack>
//                   <p style={{ color: '#DDD', fontSize: '12px', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '100%', whiteSpace: 'nowrap', minWidth: 0 }}>{!sala?.mensagens[sala.mensagens.length - 1]?.informativo && sala?.mensagens.length > 0 && sala?.mensagens[sala.mensagens.length - 1]?.nome + ": "} {sala?.mensagens[sala.mensagens.length - 1]?.conteudo}</p>
//                 </Stack>
//               </ContactItem>
//             ))

//           )}
//         </LateralList>
//       </LateralMessage>

//       <BackChat>
//         {selectedChat ? <>
//           <Header>
//             <HeaderContent>
//               <Avatar src={`data:image/png;base64,${selectedChat.urlImagem}`} />
//               <Typography variant="h6" sx={{ color: '#fff', fontFamily: "Bebas Neue" }}>
//                 {selectedChat.nome}
//               </Typography>
//             </HeaderContent>
//             {/* <MoreVert onClick={() => toogleModal(selectedChat)} sx={{ cursor: 'pointer' }} /> */}
//             <MoreVert onClick={(e) => {
//               setSelectedSala(selectedChat);
//               setPopoverAnchor(e.currentTarget)
//             }} sx={{ cursor: 'pointer' }} />
//           </Header>

//           <Scroll ref={scrollRef}>
//             {selectedChat?.mensagens.map((mensagem, index) => {
//               const sender = getSenderInfo(selectedChat, mensagem.idUsuario);
//               const msgAtualData = new Date(mensagem.horario).toDateString();
//               const msgAnteriorData =
//                 index > 0
//                   ? new Date(selectedChat.mensagens[index - 1].horario).toDateString()
//                   : null;

//               const mudouDeDia = msgAtualData !== msgAnteriorData;

//               return (
//                 <div key={mensagem.idMensagem}>
//                   {/* Quebra de dia */}
//                   {mudouDeDia && (
//                     <ChatMessage
//                       informativo={true}
//                       message={formatarQuebraDeDia(mensagem.horario)}
//                     />
//                   )}

//                   {/* Mensagem normal */}
//                   <ChatMessage
//                     userName={sender?.nome}
//                     date={mensagem?.horario}
//                     message={mensagem?.conteudo}
//                     informativo={mensagem?.informativo}
//                     isOwnMessage={mensagem?.idUsuario === usuarioLogado.idUsuario}
//                   />
//                 </div>
//               );
//             })}
//           </Scroll>


//           <ChatInputContainer>
//             <ChatInput
//               placeholder="Digite uma mensagem..."
//               value={inputMessage}
//               onChange={handleInputChange}
//               onKeyDown={handleKeyDown}
//             />
//             <SendButton onClick={handleSendMessage}>
//               <Send />
//             </SendButton>
//           </ChatInputContainer>

//         </> :
//           <>
//             <Box
//               sx={{
//                 height: '100%',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 flexDirection: 'column',
//                 gap: 2,
//                 zIndex: 20,
//               }}
//             >
//               <Stack sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 flexDirection: 'column',
//                 background: "linear-gradient(180deg, #151515 0%, #0d0d0d 100%)",
//                 padding: '1rem',
//                 borderRadius: '15px'

//               }}>
//                 <ChatBubbleOutline sx={{ fontSize: 64 }} />
//                 <Typography variant="h6" sx={{ fontFamily: 'Bebas Neue', textAlign: 'center' }}>
//                   Selecione um chat na lateral<br />para começar a conversar
//                 </Typography>
//               </Stack>
//             </Box>
//           </>}
//       </BackChat>

//       <ModalChatAdicionar
//         open={Boolean(popoverAnchor)}
//         anchorEl={popoverAnchor}
//         onClose={() => setPopoverAnchor(null)}
//         sala={selectedSala}
//         atualizarSalas={fetchChats}
//       />
      
//       <ModalChatEditar
//         open={Boolean(popoverAnchor)}
//         anchorEl={popoverAnchor}
//         onClose={() => setPopoverAnchor(null)}
//         sala={selectedSala}
//         atualizarSalas={fetchChats}
//       />


//       <Modal acao="aumentar1" showModal={showModal} fechar={toogleModal}
//         form={<FormsSala sala={sala} toogleModal={toogleModal} usuarios={usuarios} atualizarSalas={fetchChats} />}
//       >
//       </Modal>
//     </ContainerGeral>
//   );
// };

// export default Chat;
