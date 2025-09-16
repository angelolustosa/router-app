import React, { useState, useEffect } from "react";

export const Navbar = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("usuarioLogado");
    if (savedUser) setUsuario(JSON.parse(savedUser));
  }, []);

  const logout = () => {
    localStorage.removeItem("usuarioLogado");
    setUsuario(null);
    window.location.href = "/"; // redireciona para login
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <a className="navbar-brand" href="/">ROUTER-APP</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav me-auto">
            <a className="nav-link active" aria-current="page" href="/home">Home</a>
            <a className="nav-link" href="/usuarios">Usuários</a>
            <a className="nav-link" href="/cadastro">Cadastro</a>
            <a className="nav-link" href="/contato">Contato</a>
          </div>
          {usuario && (
            <div className="navbar-text d-flex align-items-center">
              <span className="me-2">{usuario.nome}</span>
              <button className="btn btn-sm btn-outline-danger" onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
