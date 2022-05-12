import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AppContext from '../../contextos/AppContext';

const RotaSegura = ({ children, role, redirectTo, ...rest }) => {
  const { sessaoService } = useContext(AppContext);

  let podeAcessar = sessaoService.logado;

  if (podeAcessar && role) {
    podeAcessar = sessaoService.role === role;
  }

  if (podeAcessar) {
    return children;
  } else {
    // se não está autenticado, redireciona para o login
    return <Navigate replace to={{ pathname: redirectTo, 
                    state: { from: rest.location } }} />
  }
}

export default RotaSegura;