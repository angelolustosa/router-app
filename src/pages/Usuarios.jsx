import React, { useState, useEffect } from "react";

export const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [usuariosPorPagina] = useState(5); // quantidade por página

    useEffect(() => {
        let saved = localStorage.getItem("usuarios");

        const bairros = ["Centro", "Aldeota", "Meireles", "Montese", "Parangaba"];
        const cidades = ["Fortaleza", "Caucaia", "Maracanaú", "Sobral"];
        const sexos = ["Masculino", "Feminino", "Outro"];
        const tipos = ["Admin", "Comum", "Moderador"];

        if (!saved) {
            // Criar 20 usuários fake
            const mockUsuarios = Array.from({ length: 50 }, (_, i) => ({
                nome: `Usuário ${i + 1}`,
                email: `usuario${i + 1}@teste.com`,
                telefone: `(85) 9${String(Math.floor(Math.random() * 90000000) + 10000000)}`,
                cep: `${60000 + Math.floor(Math.random() * 1000)}-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`,
                rua: `Rua ${i + 1}`,
                bairro: bairros[Math.floor(Math.random() * bairros.length)],
                cidade: cidades[Math.floor(Math.random() * cidades.length)],
                idade: Math.floor(Math.random() * 60) + 18, // idade entre 18 e 77
                sexo: sexos[Math.floor(Math.random() * sexos.length)],
                tipo: tipos[Math.floor(Math.random() * tipos.length)],
            }));

            localStorage.setItem("usuarios", JSON.stringify(mockUsuarios));
            saved = JSON.stringify(mockUsuarios);
        }

        setUsuarios(JSON.parse(saved));
    }, []);

    // Calcular índices
    const indexUltimo = paginaAtual * usuariosPorPagina;
    const indexPrimeiro = indexUltimo - usuariosPorPagina;
    const usuariosPagina = usuarios.slice(indexPrimeiro, indexUltimo);

    // Total de páginas
    const totalPaginas = Math.ceil(usuarios.length / usuariosPorPagina);

    return (
        <div className="container mt-4">
            <h3 className="mb-3">Lista de Usuários</h3>

            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>CEP</th>
                        <th>Rua</th>
                        <th>Bairro</th>
                    </tr>
                </thead>
                <tbody>
                    {usuariosPagina.length > 0 ? (
                        usuariosPagina.map((u, i) => (
                            <tr key={i}>
                                <td>{u.nome}</td>
                                <td>{u.email}</td>
                                <td>{u.telefone}</td>
                                <td>{u.cep}</td>
                                <td>{u.rua}</td>
                                <td>{u.bairro}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center text-muted">
                                Nenhum usuário cadastrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Paginação */}
            <nav>
                <ul className="pagination justify-content-center">
                    {Array.from({ length: totalPaginas }, (_, i) => (
                        <li
                            key={i}
                            className={`page-item ${paginaAtual === i + 1 ? "active" : ""}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => setPaginaAtual(i + 1)}
                            >
                                {i + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};
