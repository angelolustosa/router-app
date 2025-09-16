import { useState, useCallback, useRef } from 'react'
import { formatTelefone } from '../components/ultil/Util';

export const Cadastro = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cep: '',
    rua: '',
    bairro: '',
    cidade: '',
    estado: ''
  });

  const [jsonResult, setJsonResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const fetchEndereco = useCallback(async () => {
    if (formData.cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${formData.cep}/json/`);
        const data = await response.json();

        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            rua: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf
          }));
        } else {
          alert("CEP não encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  }, [formData.cep]);

  /*  const handleSubmit = (e) => {
     e.preventDefault();
     console.log("Form Data:", formData);
     setJsonResult(formData);
   }; */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Recupera usuários existentes
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Adiciona novo
    usuarios.push(formData);

    // Salva no localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuário cadastrado com sucesso!");

    // Limpa form
    /* setFormData({
      nome: "",
      email: "",
      telefone: "",
      cep: "",
      rua: "",
      bairro: "",
      cidade: "",
      estado: "",
    }); */
    formRef.current.reset();
  };

  return (
    <>
      <div className="container mt-5">
        <div className="card shadow-lg">
          <div className="card-header text-center">
            <h4 className="mb-0">Fale concosco</h4>
          </div>
          <div className="card-body">
            <form ref={formRef} onSubmit={handleSubmit} className="row g-3">

              {/* Dados pessoais */}
              <h5>Dados Pessoais</h5>
              <div className="col-md-6">
                <label className="form-label">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label">Telefone</label>
                <input
                  type="text"
                  className="form-control"
                  name="telefone"
                  value={formData.telefone}
                  //onChange={handleChange}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      telefone: formatTelefone(e.target.value) // aplica máscara
                    })
                  }
                  required
                />
              </div>

              <hr />

              {/* Endereço */}
              <h5 className="mt-4">Endereço</h5>
              <div className="col-md-4">
                <label className="form-label">CEP</label>
                <input
                  type="text"
                  className="form-control"
                  name="cep"
                  value={formData.cep}
                  onChange={handleChange}
                  onBlur={fetchEndereco}
                  required
                />
              </div>

              <div className="col-md-8">
                <label className="form-label">Rua</label>
                <input
                  type="text"
                  className="form-control"
                  name="rua"
                  value={formData.rua}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Bairro</label>
                <input
                  type="text"
                  className="form-control"
                  name="bairro"
                  value={formData.bairro}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Cidade</label>
                <input
                  type="text"
                  className="form-control"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-2">
                <label className="form-label">Estado</label>
                <input
                  type="text"
                  className="form-control"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-success w-100">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* JSON de retorno */}
        {jsonResult && (
          <div className="card mt-4">
            <div className="card-header bg-secondary text-white">
              <h5 className="mb-0">JSON Gerado</h5>
            </div>
            <div className="card-body">
              <pre>{JSON.stringify(jsonResult, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
