import { useContext } from "react";
import AppContext from "../contextos/AppContext";

const TabelaDeProdutos = () => {
  const {produtosService, sessaoService } = useContext(AppContext);

  const excluir = async (p) => {
    await produtosService.excluirProduto(p);
    await produtosService.carregarProdutos();
  };

  const renderProduto = (p) => {
    return (
      <tr key={p._id}>
        <td>{p.nome}</td>
        <td>R$ {p.preco && p.preco.toFixed(2)}</td>
        <td>{sessaoService.logado && <button onClick={() => excluir(p)}>Excluir</button>}</td>
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
          { produtosService.produtos.map(renderProduto) }
        </tbody>
      </table>
    </>
  );
};

export default TabelaDeProdutos;