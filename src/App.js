import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import TabelaDeProdutos from "./componentes/TabelaDeProdutos";
import FormProduto from "./componentes/FormProduto";
import FormLogin from "./componentes/FormLogin";
import Cabecalho from "./componentes/Cabecalho";
import Principal from "./componentes/Principal";
import PaginaNaoEncontrada from "./componentes/PaginaNaoEncontrada";
import { AppProvider } from "./contextos/AppContext";
import RotaSegura from "./componentes/seguranca/RotaSegura";

function App() {
  return (
    <AppProvider>
      <Router>
        <Cabecalho/>
        <Routes>
          <Route path="/" exact={true} element={<Principal/>}/>
          <Route path="/login" element={<FormLogin/>}/>
          <Route path="/produtos" element={<TabelaDeProdutos/>}/>
          <Route path="/novo_produto" element={
            <RotaSegura redirectTo="/login" role="administrador">
              <FormProduto/>
            </RotaSegura>
          }/>
          <Route path="*" element={<PaginaNaoEncontrada/>}/>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
