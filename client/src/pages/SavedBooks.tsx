import { useQuery, useMutation } from '@apollo/client';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import type { Book } from '../models/Book';

const SavedBooks = () => {
    // Fetch user data using the GET_ME query
    const { loading, data } = useQuery(GET_ME);
    const userData = data?.me || { savedBooks: [] };

    // Create mutation for removing books
    const [removeBook] = useMutation(REMOVE_BOOK);

    // Function to handle deleting a book
    const handleDeleteBook = async (bookId: string) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await removeBook({
                variables: { bookId },
            });

            if (!data) {
                throw new Error('Something went wrong!');
            }

            // Update local storage and UI
            removeBookId(bookId);
            userData.savedBooks = userData.savedBooks.filter(
                (book: Book) => book.bookId !== bookId
            );
        } catch (err) {
            console.error(err);
        }
    };

    // If data is still loading, show a loading message
    if (loading) {
        return <h2>LOADING...</h2>;
    }

    return (
        <>
            <div className="text-light bg-dark p-5">
                <Container>
                    {userData.username ? (
                        <h1>Viewing {userData.username}&apos;s saved books!</h1>
                    ) : (
                        <h1>Viewing saved books!</h1>
                    )}
                </Container>
            </div>
            <Container>
                <h2 className="pt-5">
                    {userData.savedBooks.length
                        ? `Viewing ${userData.savedBooks.length} saved ${
                              userData.savedBooks.length === 1
                                  ? 'book'
                                  : 'books'
                          }:`
                        : 'You have no saved books!'}
                </h2>
                <Row>
                    {userData.savedBooks.map((book: Book) => {
                        return (
                            <Col md="4" key={book.bookId}>
                                <Card border="dark">
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
                                            Authors:{' '}
                                            {book.authors.length
                                                ? book.authors.join(', ')
                                                : 'No authors available'}
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
