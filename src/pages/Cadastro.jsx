import { useState, useCallback, useRef } from 'react'
//import { formatTelefone } from '../components/ultil/Util';
import { InputField } from '../components/input/InputField';

export const Cadastro = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({});

  const [jsonResult, setJsonResult] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };


  const fetchEnderecoByCep = async (e) => {
    console.log('buscar na api cep')
    const cep = e.target.value;

    if (cep.length === 8) {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()

      console.log('dados api cep', data)

      setFormData({
        ...formData,
        rua: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.estado
      })
    }

  }






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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Recupera usuários existentes
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Adiciona novo
    usuarios.push(formData);

    // Salva no localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuário cadastrado com sucesso!");

    formRef.current.reset();
  };

  return (
    <>
      {console.log(formData)}
      <div className="container mt-5">
        <div className="card shadow-lg">
          <div className="card-header text-center">
            <h4 className="mb-0">Cadastro de Usuário</h4>
          </div>
          <div className="card-body">
            <form className="row g-3">

              {/* Dados pessoais */}
              <h5>Dados Pessoais</h5>

              <InputField
                md={6}
                id='nome'
                label='Nome'
                type='text'
                value={formData.senha}
                onChange={handleChange}
                required
              />

              <InputField
                md={6}
                id='email'
                label='Email'
                type='text'
                value={formData.email}
                onChange={handleChange}
                required
              />

              <InputField
                md={4}
                id='telefone'
                label='Telefone'
                type='text'
                value={formData.email}
                onChange={handleChange}
                required
              />

              <hr />

              {/* Endereço */}
              <h5 className="mt-4">Endereço</h5>

              <InputField
                md={4}
                id='cep'
                label='CEP'
                type='text'
                value={formData.cep}
                onChange={handleChange}
                onBlur={fetchEnderecoByCep}
                required
              />

              <InputField
                md={8}
                id='rua'
                label='Rua'
                type='text'
                value={formData.rua}
                onChange={handleChange}
                required
              />

              <InputField
                md={6}
                id='bairro'
                label='Bairro'
                value={formData.bairro}
                onChange={handleChange}
                required
              />

              <InputField
                md={6}
                id='cidade'
                label='Cidade'
                value={formData.cidade}
                onChange={handleChange}
                required
              />

              <InputField
                md={2}
                id='estado'
                label='Estado'
                value={formData.estado}
                onChange={handleChange}
                required
              />

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
