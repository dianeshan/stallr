import { Figure } from "react-bootstrap";

function Pfp() {
    return (
        <Figure>
            <Figure.Image
                width={150}
                height={150}
                src={process.env.PUBLIC_URL + "/all_hail_gorb_pfp.png"}
                roundedCircle={true}
            />
        </Figure>
    )
}

export default Pfp;
