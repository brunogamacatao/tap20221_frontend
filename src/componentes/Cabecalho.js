import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../contextos/AppContext";
import Avatar from "./Avatar";
import SeLogado from "./seguranca/SeLogado";
import SeNaoLogado from "./seguranca/SeNaoLogado";
import TemRole from "./seguranca/TemRole";

const Cabecalho = () => {
  const navigate = useNavigate();
  const { sessaoService } = useContext(AppContext);

  const logout = (e) => {
    e.preventDefault();
    sessaoService.logout();
    navigate("/");
  };

  return (
    <header>
      <h1>Cabeçalho da Aplicação</h1>
      <SeLogado>
        <Avatar/>
      </SeLogado>
      <nav>
        <Link to="/">Início</Link>
        <SeNaoLogado>
          <Link to="/login">Login</Link>
        </SeNaoLogado>
        <Link to="/produtos">Lista de Produtos</Link>
        <SeLogado>
          <TemRole role="administrador">
            <Link to="/novo_produto">Cadastrar Produto</Link>
          </TemRole>
          <a href="#" onClick={(e) => logout(e)}>Sair</a>
        </SeLogado>
      </nav>
    </header>
  );
};

export default Cabecalho;