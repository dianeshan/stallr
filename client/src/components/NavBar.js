import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav } from 'react-bootstrap';

import AuthService from "../services/auth.service";

const NavBar = () => {
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
        setCurrentUser(user);
        setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }
    }, []);
    const logOut = () => {
        AuthService.logout();
    };
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Stallr</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/explore">Explore</Nav.Link>
                        {showAdminBoard && (<Nav.Link href="/admin">Admin Board</Nav.Link>)}
                        {currentUser && (<Nav.Link href="/profile">Profile</Nav.Link>)}
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    {currentUser ? (
                        <Nav>
                            <Nav.Link href="/profile">Hi {currentUser.username}</Nav.Link>
                            <Nav.Link href="/login" className="nav-link" onClick={logOut}>Logout</Nav.Link>  
                        </Nav>
                        ): (
                        <Nav>
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/register">Sign Up</Nav.Link> 
                        </Nav> 
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default NavBar;