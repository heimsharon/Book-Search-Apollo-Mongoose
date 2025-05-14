//Filepath: client/src/components/Navbar.tsx
// This file contains the AppNavbar component, which serves as the navigation bar for the application.
// It provides links to the home page, saved books, and a modal for login/signup functionality.

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm.tsx';
import LoginForm from './LoginForm.tsx';
import Auth from '../utils/auth';

// The AppNavbar component renders the navigation bar for the application.
// It dynamically displays links based on the user's authentication status.
const AppNavbar = () => {
    // State to control the visibility of the login/signup modal.
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {/* Main navigation bar */}
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid>
                    {/* Brand link to the home page */}
                    <Navbar.Brand as={Link} to="/">
                        Google Books Search
                    </Navbar.Brand>
                    {/* Toggle button for responsive navigation */}
                    <Navbar.Toggle aria-controls="navbar" />
                    <Navbar.Collapse
                        id="navbar"
                        className="d-flex flex-row-reverse"
                    >
                        <Nav className="ml-auto d-flex">
                            {/* Link to the search page */}
                            <Nav.Link as={Link} to="/">
                                Search For Books
                            </Nav.Link>
                            {/* If the user is logged in, show links to saved books and logout */}
                            {Auth.loggedIn() ? (
                                <>
                                    <Nav.Link as={Link} to="/saved">
                                        See Your Books
                                    </Nav.Link>
                                    <Nav.Link onClick={Auth.logout}>
                                        Logout
                                    </Nav.Link>
                                </>
                            ) : (
                                // If the user is not logged in, show the login/signup modal link
                                <Nav.Link onClick={() => setShowModal(true)}>
                                    Login/Sign Up
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Modal for login/signup functionality */}
            <Modal
                size="lg"
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby="signup-modal"
            >
                {/* Tab container to toggle between login and signup forms */}
                <Tab.Container defaultActiveKey="login">
                    <Modal.Header closeButton>
                        <Modal.Title id="signup-modal">
                            <Nav variant="pills">
                                {/* Tab for login form */}
                                <Nav.Item>
                                    <Nav.Link eventKey="login">Login</Nav.Link>
                                </Nav.Item>
                                {/* Tab for signup form */}
                                <Nav.Item>
                                    <Nav.Link eventKey="signup">
                                        Sign Up
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Tab.Content>
                            {/* Login form tab */}
                            <Tab.Pane eventKey="login">
                                <LoginForm
                                    handleModalClose={() => setShowModal(false)}
                                />
                            </Tab.Pane>
                            {/* Signup form tab */}
                            <Tab.Pane eventKey="signup">
                                <SignUpForm
                                    handleModalClose={() => setShowModal(false)}
                                />
                            </Tab.Pane>
                        </Tab.Content>
                    </Modal.Body>
                </Tab.Container>
            </Modal>
        </>
    );
};

export default AppNavbar;
