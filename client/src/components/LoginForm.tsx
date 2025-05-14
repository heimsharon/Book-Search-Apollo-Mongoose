// Filepath: client/src/components/LoginForm.tsx
// This file contains the LoginForm component, which handles user login functionality.

import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

// The LoginForm component allows users to log in by providing their email and password.
const LoginForm = ({}: { handleModalClose: () => void }) => {
    // State to manage the form data (email and password).
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // State to manage form validation status
    const [validated] = useState(false);

    // State to control the visibility of the alert message for login errors.
    const [showAlert, setShowAlert] = useState(false);

    // Apollo mutation hook for the LOGIN_USER mutation, which handles user login.
    const [login, { error }] = useMutation(LOGIN_USER);

    // Function to handle changes in the input fields and update the formData state.
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to handle form submission for logging in the user.
    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Perform form validation. If invalid, prevent submission.
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        try {
            // Execute the login mutation with the form data (email and password).
            const { data } = await login({ variables: { ...formData } });

            // Check if the mutation returned valid data and a token.
            if (error || !data || !data.login || !data.login.token) {
                throw new Error('Something went wrong!');
            }

            // If login is successful, store the token in local storage and log in the user.
            Auth.login(data?.login?.token);
        } catch (err) {
            // If an error occurs, log it to the console and show the alert message.
            console.error(err);
            setShowAlert(true);
        }

        // Reset the form data after submission.
        setFormData({
            email: '',
            password: '',
        });
    };

    return (
        <>
            {/* Form for user login */}
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                {/* Alert message for login errors */}
                <Alert
                    dismissible
                    onClose={() => setShowAlert(false)}
                    show={showAlert}
                    variant="danger"
                >
                    Something went wrong with your login credentials!
                </Alert>

                {/* Email input field */}
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Your email"
                        name="email"
                        onChange={handleInputChange}
                        value={formData.email || ''}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Email is required!
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Password input field */}
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Your password"
                        name="password"
                        onChange={handleInputChange}
                        value={formData.password || ''}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Password is required!
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Submit button for the login form */}
                <Button
                    disabled={!(formData.email && formData.password)} // Disable button if fields are empty.
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
