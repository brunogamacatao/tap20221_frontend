import { useContext } from "react";
import AppContext from "../../contextos/AppContext";

const SeLogado = ({children}) => {
  const {sessaoService} = useContext(AppContext);

  return sessaoService.logado && children;
};

export default SeLogado;