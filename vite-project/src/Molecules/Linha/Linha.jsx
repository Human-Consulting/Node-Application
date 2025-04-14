import "./Linha.css"
import { deleteUsuario } from "../../Utils/cruds/CrudsUsuario"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const Linha = ({ usuario, toogleModal, atualizarUsuarios }) => {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

    const validarPermissaoPut = () => {
        if (usuarioLogado.permissao === 'DIRETOR' || usuarioLogado.permissao.includes('CONSULTOR')) return true;
        if (usuarioLogado.permissao === 'GESTOR' && usuario.permissao !== 'DIRETOR') return true;
        if (usuarioLogado.idUsuario === usuario.idUsuario) return true;
        return false;
    };

    const validarPermissaoDelete = () => {
        if (usuarioLogado.permissao === 'DIRETOR' || usuarioLogado.permissao.includes('CONSULTOR')) return true;
        if (usuarioLogado.permissao === 'GESTOR' && usuario.permissao !== 'DIRETOR') return true;
        return false;
    };

    const temPermissaoPut = validarPermissaoPut();
    const temPermissaoDelete = validarPermissaoDelete();

    const handleDelete = async () => {
            await deleteUsuario(usuario.idUsuario);
            await atualizarUsuarios();
    };

    const handleEditar = () => {
            toogleModal(usuario);
    };

    return (
        <tr>
            <td>{usuario.nome}</td>
            <td>{usuario.email}</td>
            <td>{usuario.cargo}</td>
            <td>{usuario.area}</td>
            <td>{usuario.permissao}</td>
            <td className="tdActions">
                <button onClick={handleDelete} disabled={!temPermissaoDelete}>
                    <DeleteIcon />
                </button>
                <button onClick={handleEditar} disabled={!temPermissaoPut}>
                    <EditIcon />
                </button>
            </td>
        </tr>
    );
};

export default Linha;