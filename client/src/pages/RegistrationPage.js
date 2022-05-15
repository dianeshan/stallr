import { useState } from "react";
import { Container, Button, Form, Modal } from "react-bootstrap";

import NavBar from "../components/NavBar";
import Registration from "../components/Registration";
//import Review from "../components/Review";
//import NewReview from "../components/NewReview";
//import "./Home.css";

function RegistrationPage() {

    return (
        <div>
            <NavBar />
            <Registration />
            <a href = "/loginpage">Have an Account? Login</a>
        </div> 
        
    )
}

export default RegistrationPage;