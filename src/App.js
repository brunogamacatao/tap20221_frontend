import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [produtos, setProdutos] = useState([]);

  const carregarProdutos = async() => {
    let { data } = await axios.get('http://localhost:5000/produtos');
    setProdutos(data);
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  return (
    <>
      <TabelaDeProdutos produtos={produtos} onExcluir={() => carregarProdutos()}/>
      <hr/>
      <FormProduto onSalvar={() => carregarProdutos()}/>
    </>
  );
}

const TabelaDeProdutos = ({produtos, onExcluir}) => {
  const excluir = async (p) => {
    await axios.delete(`http://localhost:5000/produtos/${p._id}`);
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
    await axios.post('http://localhost:5000/produtos', form);
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
