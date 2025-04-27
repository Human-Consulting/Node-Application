import { useParams } from "react-router";
import Linha from "../Linha/Linha";
import "./Tabela.css"

const Tabela = ({ usuarios, toogleModal, atualizarUsuarios }) => {
    console.log(usuarios);
    const { idEmpresa } = useParams();

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        {/* <th>Cargo</th> */}
                        <th>Área</th>
                        <th>Permissão</th>
                        {idEmpresa == 1 ? null :
                            <>
                                <th>Tarefas</th>
                                <th>Impedimento</th>
                            </>}
                        <th>Ações</th>
                    </tr>
                </thead>
            </table>

            <div className="table-body-scroll">
                <table>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <Linha
                                key={usuario.idUsuario}
                                usuario={usuario}
                                toogleModal={toogleModal}
                                atualizarUsuarios={atualizarUsuarios}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Tabela;