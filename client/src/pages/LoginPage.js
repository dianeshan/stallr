import { useState } from "react";
import { Container, Button, Form, Modal } from "react-bootstrap";

import NavBar from "../components/NavBar";
import Login from "../components/Login";
//import Review from "../components/Review";
//import NewReview from "../components/NewReview";
//import "./Home.css";

function LoginPage() {

    return (
        <div>
            <NavBar />
            <Login />
            <a href = "/registrationpage">Don't Have an Account? Register</a>
        </div> 
        
    )
}

export default LoginPage;