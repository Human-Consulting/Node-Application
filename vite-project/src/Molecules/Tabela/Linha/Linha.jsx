import "./Linha.css"
import { deleteUsuario } from "../../../Utils/cruds/CrudsUsuario"
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
            {idEmpresa == 1 ? null :
                <>
                    <td>{usuario.qtdTarefas}</td>
                    <td>{usuario.comImpedimento ? "Sim" : "Não"}</td>
                </>}
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