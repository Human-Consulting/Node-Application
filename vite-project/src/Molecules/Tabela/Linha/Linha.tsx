import "./Linha.css"
import { deleteUsuario, Usuario } from "../../../Utils/cruds/CrudsUsuario"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from "../../../context/AuthContext";


interface LinhaProps {
    usuario: Usuario;
    toogleModal: (usuario: Usuario) => void;
    atualizarUsuarios: (page?: number, nome?: string | null) => Promise<unknown>;
}

const Linha = ({ usuario, toogleModal, atualizarUsuarios }: LinhaProps) => {
    const { usuario: usuarioLogado } = useAuth();

    const validarPermissaoPut = () => {
        if (usuarioLogado?.permissao === 'DIRETOR' || usuarioLogado?.permissao?.includes('CONSULTOR')) return true;
        if (usuarioLogado?.permissao === 'GESTOR' && usuario.permissao !== 'DIRETOR') return true;
        if (usuarioLogado?.idUsuario === usuario.idUsuario) return true;
        return false;
    };

    const validarPermissaoDelete = () => {
        if (usuarioLogado?.permissao === 'DIRETOR' || usuarioLogado?.permissao?.includes('CONSULTOR')) return true;
        if (usuarioLogado?.permissao === 'GESTOR' && usuario.permissao !== 'DIRETOR') return true;
        return false;
    };

    const temPermissaoPut = validarPermissaoPut();
    const temPermissaoDelete = validarPermissaoDelete();

    const handleDelete = async () => {
        if (usuario.idUsuario == null || usuarioLogado?.idUsuario == null) return;
        const bodyDelete = { idEditor: usuarioLogado.idUsuario, permissaoEditor: usuarioLogado.permissao };
        await deleteUsuario(usuario.idUsuario, bodyDelete);
        await atualizarUsuarios();
    };

    const handleEditar = () => {
        toogleModal(usuario);
    };

    return (
        <tr>
            <td>{usuario.nome}</td>
            <td>{usuario.email}</td>
            <td>{usuario.area}</td>
            <td>{usuario.cargo}</td>
            {/* <td>{usuario.qtdTarefas}</td> */}
            {/* <td>{usuario.comImpedimento ? "Sim" : "Não"}</td> */}
            <td className="tdActions">
                <button onClick={handleEditar} disabled={!temPermissaoPut}>
                    <EditIcon />
                </button>
                <button onClick={handleDelete} disabled={!temPermissaoDelete}>
                    <DeleteIcon />
                </button>
            </td>
        </tr>
    );
};

export default Linha;
