import "./Linha.css"
import { deleteUsuario } from "../../Utils/cruds/CrudsUsuario"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from "react-router";


const Linha = ({ usuario, toogleModal, atualizarUsuarios }) => {
    const { idEmpresa } = useParams();
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
            <td>{usuario.area}</td>
            <td>{usuario.permissao == 'FUNC' ? "TEAM MEMBER" : usuario.permissao}</td>
            {idEmpresa == 1 ? null :
                <>
                    <td>{usuario.qtdTarefas}</td>
                    <td>{usuario.comImpedimento ? "Sim" : "Não"}</td>
                </>}
            <td className="tdActions">
                <button onClick={handleDelete} disabled={!temPermissaoDelete}>
                    <DeleteIcon sx={{ color: '#00ffff' }} />
                </button>
                <button onClick={handleEditar} disabled={!temPermissaoPut}>
                    <EditIcon color="primary" />
                </button>
            </td>
        </tr>
    );
};

export default Linha;