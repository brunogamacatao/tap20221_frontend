import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import AppContext from '../contextos/AppContext';

const formularioVazio = () => {
  return {email: '', senha: ''};
};

const FormLogin = () => {
  const {state} = useLocation();
  const navigate = useNavigate();
  const { sessaoService } = useContext(AppContext);
  const [form, setForm] = useState(formularioVazio());

  const setValor = (evento) => {
    setForm({...form, [evento.target.name]: evento.target.value});
  };

  const fazerLogin = async (evt) => {
    evt.preventDefault();
    try {
      await sessaoService.login(form);
      setForm(formularioVazio());
      navigate(state?.from ?? "/");
    } catch (erro) {
      alert(erro);
    }
  };

  return (
    <form onSubmit={(e) => fazerLogin(e)} className="formulario">
      <p><label>Email:</label> <input type="text" name="email" value={form.email} onChange={setValor}/></p>
      <p><label>Senha:</label> <input type="password" name="senha" value={form.senha} onChange={setValor}/></p>
      <p><button>Login</button></p>
    </form>
  );
};

export default FormLogin;