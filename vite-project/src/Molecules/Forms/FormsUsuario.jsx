import { useState } from "react";
import { postUsuario, putUsuario } from '../../Utils/cruds/CrudsUsuario.jsx';

const FormsUsuario = ({ usuario, toogleModal, atualizarUsuarios }) => {

    const [nome, setNome] = useState(usuario?.nome || '');
    const [email, setEmail] = useState(usuario?.email || '');
    const [senha, setSenha] = useState(usuario?.senha || '');
    const [cargo, setCargo] = useState(usuario?.cargo || '');
    const [area, setArea] = useState(usuario?.area || '');

    const handlePostUsuario = async () => {
        const newUsuario = { nome, email, senha };
        await postUsuario(newUsuario, toogleModal);
        atualizarUsuarios();
    };

    const handlePutUsuario = async () => {
        const modifiedUsuario = { nome, email, senha }
        await putUsuario(modifiedUsuario, usuario.idUsuario, toogleModal);
        atualizarUsuarios();
    }

    return (
        <>
            <h2>{usuario == null ? "Adicionar Usuario" : `Editar Usuario`}</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>
                    Nome:
                    <textarea autoComplete="off" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                </label>
                <label>
                    Email:
                    <input autoComplete="off" type="number" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Senha:
                    <input autoComplete="off" type="number" value={senha} onChange={(e) => setSenha(e.target.value)} />
                </label>
                <label>
                    Cargo:
                    <input autoComplete="off" type="number" value={cargo} onChange={(e) => setCargo(e.target.value)} />
                </label>
                <label>
                    Área:
                    <input autoComplete="off" type="number" value={area} onChange={(e) => setArea(e.target.value)} />
                </label>

                {Usuario == null ? (
                    <button type="button" onClick={handlePostUsuario}>Enviar</button>
                ) : (
                    <button type="button" onClick={handlePutUsuario}>Enviar Alterações</button>
                )}

            </form>
        </>
    )
}

export default FormsUsuario