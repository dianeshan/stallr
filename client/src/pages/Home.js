import { Container } from "react-bootstrap";

import NavBar from "../components/NavBar";
import Review from "../components/Review";

function Home() {
    return (
        <div>
            <NavBar />
            <Container className="pt-4">
                <Review />
            </Container>
        </div> 
        
    )
}

export default Home;