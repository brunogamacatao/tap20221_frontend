import { useContext } from "react";
import AppContext from "../../contextos/AppContext";

const TemRole = ({role, children}) => {
  const {sessaoService} = useContext(AppContext);

  return sessaoService.logado && sessaoService.role === role && children;
};

export default TemRole;