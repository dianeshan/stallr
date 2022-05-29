import { Figure } from "react-bootstrap";

import AuthService from "../services/auth.service";

function Pfp() {
  const currentUser = AuthService.getCurrentUser();

  return (
    <Figure>
      <Figure.Image
        width={150}
        height={150}
        src={`data:${currentUser.pfp.contentType};base64, ${currentUser.pfp.data}`}
        roundedCircle={true}
        alt="profile"
      />
    </Figure>
  );
}

export default Pfp;
