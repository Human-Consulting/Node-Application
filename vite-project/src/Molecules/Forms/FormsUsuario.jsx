import { useState } from "react";
import { postUsuario, putUsuario } from '../../Utils/cruds/CrudsUsuario.jsx';
import { useParams } from "react-router";

const FormsUsuario = ({ diretor, usuario, toogleModal, atualizarUsuarios, qtdUsuarios }) => {

    const { idEmpresa } = useParams();
    
    const [nome, setNome] = useState(usuario?.nome || '');
    const [email, setEmail] = useState(usuario?.email || '');
    const [senha, setSenha] = useState(usuario?.senha || '');
    const [cargo, setCargo] = useState(usuario?.cargo || '');
    const [area, setArea] = useState(usuario?.area || '');
    const [permissao, setPermissao] = useState(usuario?.permissao || '#');

    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

    const handlePostUsuario = async () => {

        const newUsuario = { nome, email, senha, cargo, area, permissao, fkEmpresa: idEmpresa };
        await postUsuario(newUsuario, toogleModal);
        atualizarUsuarios();
    };

    const handlePutUsuario = async () => {

        const modifiedUsuario = {
            idEditor: usuarioLogado.idUsuario,
            permissaoEditor: usuarioLogado.permissao,
            idUsuario: usuario.idUsuario,
            nome,
            email,
            senha,
            cargo,
            area,
            permissao
        }
        await putUsuario(modifiedUsuario, usuario.idUsuario, toogleModal);
        atualizarUsuarios();
    }

    return (
        <>
            <h2>{usuario == null ? "Adicionar Usuario" : `Editar Usuario`}</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>
                    Nome:
                    <input autoComplete="off" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                </label>
                <label>
                    Email:
                    <input autoComplete="off" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Senha:
                    <input autoComplete="off" type="text" value={senha} onChange={(e) => setSenha(e.target.value)} />
                </label>
                {usuarioLogado.permissao == 'FUNC' ? null :
                    <>
                        <label>
                            Cargo:
                            <input autoComplete="off" type="text" value={cargo} onChange={(e) => setCargo(e.target.value)} />
                        </label>
                        <label>
                            Área:
                            <input autoComplete="off" type="text" value={area} onChange={(e) => setArea(e.target.value)} />
                        </label>

                        {((usuario == null && usuarioLogado.permissao != 'FUNC') || (usuario != null && usuarioLogado.permissao.includes('DIRETOR', 'CONSULTOR')) || (usuario != null && usuarioLogado.permissao == 'GESTOR' && usuario.permissao.includes('GESTOR', 'FUNC'))) && usuario?.permissao !== 'DIRETOR' ?
                            <label>
                                Permissão:
                                <select value={permissao} onChange={(e) => setPermissao(e.target.value)}>
                                    {idEmpresa == 1 ?
                                        <>
                                            <option value="#">Selecione a permissão</option>
                                            <option value="CONSULTOR_DIRETOR">Diretor</option>
                                            <option value="CONSULTOR">Consultor</option>
                                        </>
                                        :
                                        qtdUsuarios >= 1 && diretor ?
                                            <>
                                                <option value="#">Selecione a permissão</option>
                                                <option value="GESTOR">Gestão</option>
                                                <option value="FUNC">Team Member</option>
                                            </>
                                            : qtdUsuarios >= 1 && !diretor ?
                                                <>
                                                    <option value="#">Selecione a permissão</option>
                                                    <option value="GESTOR">Gestão</option>
                                                    <option value="FUNC">Team Member</option>
                                                    <option value="DIRETOR">Diretor</option>
                                                </>
                                                : 
                                                <>
                                                    <option value="#">Selecione a permissão</option>
                                                    <option value="DIRETOR">Diretor</option>
                                                </>
                                    }

                                </select>
                            </label>
                            : null
                        }
                    </>
                }

                {usuario == null ? (
                    <button type="button" onClick={handlePostUsuario}>Enviar</button>
                ) : (
                    <button type="button" onClick={handlePutUsuario}>Enviar Alterações</button>
                )}

            </form>
        </>
    )
}

export default FormsUsuario