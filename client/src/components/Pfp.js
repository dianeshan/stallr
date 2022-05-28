import { Figure } from "react-bootstrap";

import AuthService from "../services/auth.service";

function Pfp() {

    const currentUser = AuthService.getCurrentUser();
    return (
        <Figure>
            <Figure.Image
                width={150}
                height={150}
                src={currentUser.pfp}
                roundedCircle={true}
            />
        </Figure>
    )
}

export default Pfp;
