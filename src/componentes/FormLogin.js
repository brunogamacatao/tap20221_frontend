import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import AppContext from '../contextos/AppContext';

const formularioVazio = () => {
  return {email: '', senha: ''};
};

const FormLogin = () => {
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
      navigate("/");
    } catch (erro) {
      alert(erro);
    }
  };

  return (
    <form onSubmit={(e) => fazerLogin(e)}>
      <p>Email: <input type="text" name="email" value={form.email} onChange={setValor}/></p>
      <p>Senha: <input type="password" name="senha" value={form.senha} onChange={setValor}/></p>
      <p><button>Login</button></p>
    </form>
  );
};

export default FormLogin;