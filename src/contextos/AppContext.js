import React, {useState, useEffect} from 'react';
import api from '../backend';

const AppContext = React.createContext();

export const AppProvider = ({children}) => {
  // funções de produto
  const [produtos, setProdutos] = useState([]);

  const carregarProdutos = async() => {
    let { data } = await api.get('/produtos');
    setProdutos(data);
  };

  const excluirProduto = async (p) => {
    await api.delete(`/produtos/${p._id}`);
  };

  const cadastrarProduto = async (form) => {
    await api.post('/produtos', form);
  };

  // funções de sessão
  const [ logado, setLogado ] = useState(false);
  const [ role, setRole ] = useState(null);
  const [ usuario, setUsuario ] = useState({});

  const login = async (form) => {
    try {
      let dados = await api.post('/login', form);
      let token = dados.data.token;
      setRole(dados.data.role);
      setUsuario(dados.data.usuario);
      setLogado(true);

      sessionStorage.setItem('TOKEN', token);
      sessionStorage.setItem('ROLE', role);
      sessionStorage.setItem('USUARIO', JSON.stringify(dados.data.usuario));
    } catch (erro) {
      let dados = erro.response.data;
      logout();
      throw dados.erro;
    }
  };

  const logout = () => {
    sessionStorage.removeItem('TOKEN');
    sessionStorage.removeItem('ROLE');
    sessionStorage.removeItem('USUARIO');
    setLogado(false);
    setRole(null);
    setUsuario(null);
  };

  const inicializa = async () => {
    await carregarProdutos();
    if (sessionStorage.getItem('TOKEN')) {
      setLogado(true);
    }
    setRole(sessionStorage.getItem('ROLE'));
    setUsuario(JSON.parse(sessionStorage.getItem('USUARIO')));
  };

  // funções que serão carregadas quando o contexto for iniciado
  useEffect(() => {
    inicializa();
  }, []);

  return (
    <AppContext.Provider value={{
      produtosService: {carregarProdutos, excluirProduto, cadastrarProduto, produtos, setProdutos},
      sessaoService: {login, logout, logado, role, usuario}
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;