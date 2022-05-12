import { useContext } from "react";
import AppContext from "../../contextos/AppContext";

const SeNaoLogado = ({children}) => {
  const {sessaoService} = useContext(AppContext);

  return sessaoService.logado || children;
};

export default SeNaoLogado;