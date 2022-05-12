import { useContext, useState } from 'react';
import AppContext from '../contextos/AppContext';

const formularioVazio = () => {
  return {nome: '', preco: 0.0, descricao: ''};
};

const FormProduto = () => {
  const { produtosService } = useContext(AppContext);
  const [form, setForm] = useState(formularioVazio());
  const [aguarde, setAguarde] = useState(false);

  const salvar = async () => {
    setAguarde(true);
    await produtosService.cadastrarProduto(form);
    setForm(formularioVazio());
    setAguarde(false);
    await produtosService.carregarProdutos();
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

export default FormProduto;