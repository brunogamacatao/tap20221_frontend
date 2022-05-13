import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AppContext from '../../contextos/AppContext';

const RotaSegura = ({ children, role, redirectTo, ...rest }) => {
  const { pathname } = useLocation();
  const { sessaoService } = useContext(AppContext);

  let podeAcessar = sessaoService.logado;

  if (podeAcessar && role) {
    podeAcessar = sessaoService.role === role;
  }

  if (podeAcessar) {
    return children;
  } else {
    // se não está autenticado, redireciona para o login
    return <Navigate replace to={redirectTo} state={{from: pathname}}/>
  }
}

export default RotaSegura;