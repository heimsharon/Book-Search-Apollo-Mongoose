// Filepath: client/src/pages/SavedBooks.tsx
// This file contains the SavedBooks component, which is used to display the saved books of a user.
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import type { User } from '../models/User';

// The SavedBooks component is used to display the saved books of a user.
const SavedBooks = () => {
    const { loading, data, error } = useQuery(GET_ME);

    if (error) {
        // If there is an error, the error message is logged to the console.
        console.error('Error while querying your data. ', error);
    }

    // The useMutation hook is used to call the removeBook mutation.
    const [removeBook] = useMutation(REMOVE_BOOK);
    // The data returned from the GET_ME query is destructured to get the user data.
    const userData: User = data?.me || {};

    // The handleDeleteBook function is used to handle the deletion of a book.
    const handleDeleteBook = async (bookId: string) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }

        try {
            // Calls the removeBook mutation with the bookId and gets the GET_ME query to update the saved books list.
            const { data } = await removeBook({
                variables: { bookId },
                refetchQueries: [{ query: GET_ME }],
            });

            // If there is an error or the data is not present, an error is thrown.
            if (!data) {
                throw new Error(
                    'Something went wrong, book could not be removed!'
                );
            }
            // If the book is successfully removed, the bookId is removed from local storage.
            removeBookId(bookId);
        } catch (err) {
            console.error(err);
        }
    };

    // If the user is not logged in, they are redirected to the login page.
    if (loading) {
        return <h2>LOADING...</h2>;
    }

    return (
        <>
            <div className="text-light bg-dark p-5">
                <Container>
                    {userData.username ? (
                        <h1>Viewing {userData.username}'s saved books!</h1>
                    ) : (
                        <h1>Viewing saved books!</h1>
                    )}
                </Container>
            </div>
            <Container>
                <h2 className="pt-5">
                    {userData.savedBooks.length
                        ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1
                            ? 'book'
                            : 'books'
                        }:`
                        : 'You have no saved books!'}
                </h2>
                <Row>
                    {userData.savedBooks.map((book) => {
                        return (
                            <Col md="4">
                                <Card key={book.bookId} border="dark">
                                    {book.image ? (
                                        <Card.Img
                                            src={book.image}
                                            alt={`The cover for ${book.title}`}
                                            variant="top"
                                        />
                                    ) : null}
                                    <Card.Body>
                                        <Card.Title>{book.title}</Card.Title>
                                        <p className="small">
                                            Authors: {book.authors}
                                        </p>
                                        <Card.Text>
                                            {book.description}
                                        </Card.Text>
                                        <Button
                                            className="btn-block btn-danger"
                                            onClick={() =>
                                                handleDeleteBook(book.bookId)
                                            }
                                        >
                                            Delete this Book!
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </>
    );
};

export default SavedBooks;
