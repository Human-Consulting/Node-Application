// import { Dialog, DialogContent, DialogActions, Stack, Typography, TextField, Button, Avatar } from "@mui/material";
// import { useState } from "react";
// import ModalAdicionarUsuarios from "./ModalAdicionarUsuarios";
// import { putSala, postSala } from "../../../Utils/cruds/CrudsSala"; 
// import Swal from "sweetalert2";

// const ModalChatAdicionar = ({ open, onClose, fkEmpresa, fkProjeto, usuarioLogado, atualizarSalas }) => {
//     const [nome, setNome] = useState("");
//     const [urlImagem, setUrlImagem] = useState(null);
//     const [participantes, setParticipantes] = useState([]);
//     const [modalUsuariosAberto, setModalUsuariosAberto] = useState(true);

//     const validar = () => {
//         if (!nome.trim()) {
//             Swal.fire({ icon: "warning", text: "Informe um nome para a sala." });
//             return false;
//         }
//         if (participantes.length === 0) {
//             Swal.fire({ icon: "warning", text: "Escolha ao menos 1 participante." });
//             return false;
//         }
//         return true;
//     };

//     const criarSala = async () => {
//         if (!validar()) return;

//         const ids = participantes;

//         await postSala({
//             nome,
//             urlImagem,
//             participantes: ids,
//             idEditor: usuarioLogado.idUsuario,
//             fkEmpresa,
//             fkProjeto
//         });

//         atualizarSalas();
//         limpar();
//         onClose();
//     };

//     const limpar = () => {
//         setNome("");
//         setUrlImagem(null);
//         setParticipantes([]);
//         setModalUsuariosAberto(true);
//     };

//     const aoSelecionarUsuarios = (ids) => {
//         setParticipantes(ids);
//         setModalUsuariosAberto(false);
//     };

//     const handleImagem = (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         const reader = new FileReader();
//         reader.onload = () => setUrlImagem(reader.result.split(",")[1]); 
//         reader.readAsDataURL(file);
//     };

//     return (
//         <>
//             {/* MODAL DE SELEÇÃO DE USUÁRIOS */}
//             <ModalAdicionarUsuarios
//                 open={open && modalUsuariosAberto}
//                 onClose={() => {
//                     if (participantes.length === 0) onClose();
//                     else setModalUsuariosAberto(false);
//                 }}
//                 sala={{ participants: participantes.map(id => ({ idUsuario: id })) }}
//                 onConfirm={aoSelecionarUsuarios}
//             />

//             {/* ETAPA DE CONFIGURAÇÃO DA SALA */}
//             <Dialog open={open && !modalUsuariosAberto} onClose={onClose} fullWidth maxWidth="xs">
//                 <DialogContent sx={{ background: "#22272B" }}>
//                     <Stack gap={3}>

//                         <Typography color="#fff" fontWeight="bold" fontSize={18}>
//                             Criar nova sala
//                         </Typography>

//                         {/* IMAGEM */}
//                         <Stack alignItems="center" gap={1}>
//                             <Avatar
//                                 src={urlImagem ? `data:image/png;base64,${urlImagem}` : null}
//                                 sx={{ width: 90, height: 90 }}
//                             />
//                             <Button variant="outlined" component="label">
//                                 Selecionar imagem
//                                 <input type="file" hidden accept="image/*" onChange={handleImagem} />
//                             </Button>
//                         </Stack>

//                         {/* NOME */}
//                         <TextField
//                             fullWidth
//                             label="Nome da sala"
//                             value={nome}
//                             onChange={(e) => setNome(e.target.value)}
//                             InputProps={{ sx: { color: "#fff" } }}
//                         />

//                         {/* PARTICIPANTES */}
//                         <Stack>
//                             <Typography color="#bbb" fontSize={14}>Participantes selecionados:</Typography>
//                             <Typography color="#fff">{participantes.length} usuário(s)</Typography>
//                         </Stack>

//                     </Stack>
//                 </DialogContent>

//                 <DialogActions sx={{ background: "#1a1e22" }}>
//                     <Button sx={{ color: "#aaa" }} onClick={() => setModalUsuariosAberto(true)}>
//                         Voltar
//                     </Button>
//                     <Button variant="contained" sx={{ bgcolor: "#1976d2" }} onClick={criarSala}>
//                         Criar sala
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </>
//     );
// };

// export default ModalChatAdicionar;
