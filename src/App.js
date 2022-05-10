import axios from "axios";
import { useEffect, useState } from "react";

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  let token = sessionStorage.getItem('TOKEN');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => Promise.reject(error));

function App() {
  const [produtos, setProdutos] = useState([]);

  const carregarProdutos = async() => {
    let { data } = await api.get('http://localhost:5000/produtos');
    setProdutos(data);
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const [form, setForm] = useState({email: '', senha: ''});

  const setValor = (evento) => {
    setForm({...form, [evento.target.name]: evento.target.value});
  };

  const fazerLogin = async (evt) => {
    evt.preventDefault();
    let dados = await api.post('/login', form);
    let token = dados.data.token;
    console.log('token', token);
    sessionStorage.setItem('TOKEN', token);
  };

  return (
    <>
      <form onSubmit={(e) => fazerLogin(e)}>
        <p>Email: <input type="text" name="email" value={form.email} onChange={setValor}/></p>
        <p>Senha: <input type="password" name="senha" value={form.senha} onChange={setValor}/></p>
        <p><button>Login</button></p>
      </form>
      <hr/>
      <TabelaDeProdutos produtos={produtos} onExcluir={() => carregarProdutos()}/>
      <hr/>
      <FormProduto onSalvar={() => carregarProdutos()}/>
    </>
  );
}

const TabelaDeProdutos = ({produtos, onExcluir}) => {
  const excluir = async (p) => {
    await api.delete(`http://localhost:5000/produtos/${p._id}`);
    onExcluir();
  };

  const renderProduto = (p) => {
    return (
      <tr key={p._id}>
        <td>{p.nome}</td>
        <td>R$ {p.preco && p.preco.toFixed(2)}</td>
        <td><button onClick={() => excluir(p)}>Excluir</button></td>
      </tr>
    );
  };

  return (
    <>
      <h3>Produtos</h3>
      <table className="tabela">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          { produtos.map(renderProduto) }
        </tbody>
      </table>
    </>
  );
};

const formularioVazio = () => {
  return {nome: '', preco: 0.0, descricao: ''};
};

const FormProduto = ({onSalvar}) => {
  const [form, setForm] = useState(formularioVazio());
  const [aguarde, setAguarde] = useState(false);

  const salvar = async () => {
    setAguarde(true);
    await api.post('http://localhost:5000/produtos', form);
    setForm(formularioVazio());
    setAguarde(false);
    onSalvar();
  };

  const submeter = (e) => {
    e.preventDefault(); // não recarregar a página
    salvar();
  };

  const setValor = (evento) => {
    setForm({...form, [evento.target.name]: evento.target.value});
  };  

  return (
    <>
      <h3>Cadastrar Produto</h3>
      { aguarde && <h3>Aguarde ....</h3>}
      { aguarde || 
      <form className="formulario" onSubmit={(e) => submeter(e)}>
        <p>
          <label>Nome: </label> 
          <input type="text" name="nome" value={form.nome} onChange={setValor}/>
        </p>
        <p>
          <label>Preço: </label> 
          <input type="number" name="preco" value={form.preco}onChange={setValor}/>
        </p>
        <p>
          <label>Descrição: </label> 
          <textarea name="descricao" value={form.descricao} onChange={setValor}>            
          </textarea>
        </p>
        <p>
          <button>Salvar</button>
        </p>
      </form>
      }
    </>
  );
};

export default App;
