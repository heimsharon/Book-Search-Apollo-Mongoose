// Filepath: client/src/components/LoginForm.tsx
// This file contains the LoginForm component, which is used for user login and handles the login form submission.
import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import type { LoginFormData } from '../models/User';

// LoginFormData interface to define the structure of the form data
const LoginForm = ({ handleModalClose }: { handleModalClose: () => void }) => {
    // useState hook to manage form data
    const [userFormData, setUserFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });

    // useState hook to manage form validation and alert visibility
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    // useMutation hook to call the LOGIN_USER mutation
    const [loginUser] = useMutation(LOGIN_USER);

    // handleInputChange function to update form data on input change
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    // handleFormSubmit function to handle form submission, prevents default behavior, and checks form validity
    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        // If the form is invalid, prevent submission and stop propagation
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            // Call the loginUser mutation with the form data
            const { data } = await loginUser({
                variables: {
                    email: userFormData.email,
                    password: userFormData.password,
                },
            });
            // If the response data is null, throw an error
            if (!data) {
                throw new Error('Something went wrong!');
            }
            // If login is successful, extract the token from the response and log in the user
            const { token } = data.login;
            Auth.login(token);
            // Close the modal after successful login
            handleModalClose();
        } catch (err) {
            // If an error occurs during login, log the error and show an alert
            console.error(err);
            setShowAlert(true);
        }
        // Reset form data after submission
        setUserFormData({
            email: '',
            password: '',
        });
    };

    // Render the login form with Bootstrap components
    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Alert
                    dismissible
                    onClose={() => setShowAlert(false)}
                    show={showAlert}
                    variant="danger"
                >
                    Something went wrong with your login credentials!
                </Alert>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Your email"
                        name="email"
                        onChange={handleInputChange}
                        value={userFormData.email || ''}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Email is required!
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Your password"
                        name="password"
                        onChange={handleInputChange}
                        value={userFormData.password || ''}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Password is required!
                    </Form.Control.Feedback>
                </Form.Group>
                <Button
                    disabled={!(userFormData.email && userFormData.password)}
                    type="submit"
                    variant="success"
                >
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default LoginForm;
