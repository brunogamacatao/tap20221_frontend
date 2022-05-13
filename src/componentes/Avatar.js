import { useContext } from "react";
import AppContext from "../contextos/AppContext";

const Avatar = () => {
  const { sessaoService } = useContext(AppContext);

  return (
    <figure className="avatar">
      <img src="https://www.w3schools.com/howto/img_avatar.png"/>
      <figcaption>{sessaoService.usuario?.nome}</figcaption>
    </figure>
  );
};

export default Avatar;