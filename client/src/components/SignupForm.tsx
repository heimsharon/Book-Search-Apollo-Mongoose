//Filepath: client/src/components/SignupForm.tsx
// This file contains the SignupForm component, which is used for user signup functionality.

import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import type { User } from '../models/User';

// The SignupForm component handles user registration by collecting username, email, and password.
const SignupForm = ({}: { handleModalClose: () => void }) => {
    // State to manage the form data
    const [userFormData, setUserFormData] = useState<User>({
        username: '',
        email: '',
        password: '',
        savedBooks: [],
    });

    // State to manage form validation status.
    const [validated] = useState(false);

    // State to control the visibility of the alert message for signup errors.
    const [showAlert, setShowAlert] = useState(false);

    // Apollo mutation hook for the ADD_USER mutation, which handles user registration.
    const [addUser] = useMutation(ADD_USER);

    // Function to handle changes in the input fields and update the userFormData state.
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    // Function to handle form submission for user signup.
    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Perform form validation. If invalid, prevent submission.
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            // Execute the addUser mutation with the form data (username, email, and password).
            const { data } = await addUser({
                variables: {
                    input: {
                        username: userFormData.username,
                        email: userFormData.email,
                        password: userFormData.password,
                    },
                },
            });

            // Extract the token from the mutation response and log in the user.
            const { token } = data.addUser;
            Auth.login(token);
        } catch (err) {
            // If an error occurs, log it to the console and show the alert message.
            console.error(err);
            setShowAlert(true);
        }

        // Reset the form data to empty values after submission.
        setUserFormData({
            username: '',
            email: '',
            password: '',
            savedBooks: [],
        });
    };

    return (
        <>
            {/* Form for user signup */}
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                {/* Alert message for signup errors */}
                <Alert
                    dismissible
                    onClose={() => setShowAlert(false)}
                    show={showAlert}
                    variant="danger"
                >
                    Something went wrong with your signup!
                </Alert>

                {/* Username input field */}
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Your username"
                        name="username"
                        onChange={handleInputChange}
                        value={userFormData.username || ''}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Username is required!
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Email input field */}
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Your email address"
                        name="email"
                        onChange={handleInputChange}
                        value={userFormData.email || ''}
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
                        value={userFormData.password || ''}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Password is required!
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Submit button for the signup form */}
                <Button
                    disabled={
                        !(
                            userFormData.username &&
                            userFormData.email &&
                            userFormData.password
                        )
                    }
                    type="submit"
                    variant="success"
                >
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default SignupForm;
