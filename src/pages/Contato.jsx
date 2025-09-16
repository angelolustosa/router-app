import React, { useState, useRef, useCallback } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Contato = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });

  const nomeRef = useRef(null);

  // Foco automático no campo Nome
  React.useEffect(() => {
    nomeRef.current.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // Mostrar toast de sucesso
      toast.success(`Obrigado, ${formData.nome}! Sua mensagem foi enviada.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });

      // Limpar formulário
      setFormData({
        nome: "",
        email: "",
        mensagem: "",
      });

      // Foco no campo Nome novamente
      nomeRef.current.focus();
    },
    [formData]
  );

  return (
    <>
      <div className="container mt-5">
        <h3>Contato</h3>
        <div className="card p-4 shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nome</label>
              <input
                type="text"
                name="nome"
                className="form-control"
                value={formData.nome}
                onChange={handleChange}
                ref={nomeRef}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Mensagem</label>
              <textarea
                name="mensagem"
                className="form-control"
                rows="4"
                value={formData.mensagem}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Enviar
            </button>
          </form>
        </div>
      </div>

      {/* Toast container global */}
      <ToastContainer />

    </>
  );
};
