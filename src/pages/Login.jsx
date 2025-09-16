import { useNavigate } from "react-router-dom";
import './Login.css'
import { InputField } from "../components/input/InputField";
import { useState } from "react";

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: 'angelo@teste.com',
    senha: ''
  });

  const handleSenha = e => {
    setFormData({ ...formData, senha: e.target.value });
  };

  const loginSubmit = e => {
    e.preventDefault();
    const { email, senha } = formData;
    if (email === 'angelo@teste.com' && senha === '123') {
      const usuarioMock = { nome: "Angelo Lustosa", email };
      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioMock));
      navigate("/home");
    } else {
      alert("Usuário ou senha incorreto!");
    }
  };

  return (
    <main className="form-signin w-100 m-auto">
      <img className="mb-4" src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
      <form onSubmit={loginSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <InputField
          id='email'
          label='Email'
          type='email'
          placeholder="name@example.com"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
        />

        <InputField
          id='senha'
          label='Senha'
          type='password'
          placeholder="senha"
          value={formData.senha}
          onChange={handleSenha}
        />

        <div className="form-check text-start my-3">
          <input className="form-check-input" type="checkbox" value="remember-me" id="checkDefault" />
          <label className="form-check-label" htmlFor="checkDefault">
            Remember me
          </label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
        <p className="mt-5 mb-3 text-body-secondary">© 2017–2025</p>
      </form>
    </main>
  );
};
