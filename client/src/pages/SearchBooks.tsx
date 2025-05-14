// Filepath: client/src/pages/SearchBooks.tsx
// This file contains the SearchBooks component, which allows users to search for books using the Google Books API and save them to their account if they are logged in.

import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { Container, Col, Form, Button, Card, Row } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { SAVE_BOOK } from '../utils/mutations';
import { searchGoogleBooks } from '../utils/book.API';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';
import type { Book } from '../models/Book';
import type { GoogleAPIBook } from '../models/GoogleAPIBook';

const SearchBooks = () => {
    // State to store the books returned from the Google Books API
    const [searchedBooks, setSearchedBooks] = useState<Book[]>([]);

    // State to store the user's search input
    const [searchInput, setSearchInput] = useState('');

    // State to store the IDs of books saved by the user (retrieved from local storage)
    const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

    // Apollo mutation hook for saving a book to the user's account
    const [saveBook, { error }] = useMutation(SAVE_BOOK);

    // Effect to save the updated list of saved book IDs to local storage when the component unmounts
    useEffect(() => {
        return () => saveBookIds(savedBookIds);
    }, [savedBookIds]);

    // Function to handle the form submission for searching books
    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // If the search input is empty, do nothing
        if (!searchInput) {
            return false;
        }

        try {
            // Call the Google Books API with the search input
            const response = await searchGoogleBooks(searchInput);

            // If the response is not OK, throw an error
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            // Parse the response JSON and map the book data to the required format
            const { items } = await response.json();
            const bookData = items.map((book: GoogleAPIBook) => ({
                bookId: book.id,
                authors: book.volumeInfo.authors || ['No author to display'],
                title: book.volumeInfo.title,
                description: book.volumeInfo.description,
                image: book.volumeInfo.imageLinks?.thumbnail || '',
            }));

            // Update the state with the searched books and clear the search input
            setSearchedBooks(bookData);
            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };

    // Function to handle saving a book to the user's account
    const handleSaveBook = async (bookId: string) => {
        // Find the book to save from the searchedBooks state
        const bookToSave: Book = searchedBooks.find(
            (book) => book.bookId === bookId
        )!;

        // Check if the user is logged in and has a valid token
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }

        try {
            // Call the saveBook mutation with the book data
            const { data } = await saveBook({
                variables: { input: { ...bookToSave } },
            });

            // If no data is returned, throw an error
            if (!data) {
                throw new Error(
                    'Something went wrong, book could not be saved!'
                );
            }

            // Update the state with the new list of saved book IDs
            setSavedBookIds([...savedBookIds, bookToSave.bookId]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            {/* Header section with a search form */}
            <div className="text-light bg-dark p-5">
                <Container>
                    <h1>Search for Books!</h1>
                    <Form onSubmit={handleFormSubmit}>
                        <Row>
                            <Col xs={12} md={8}>
                                <Form.Control
                                    name="searchInput"
                                    value={searchInput}
                                    onChange={(e) =>
                                        setSearchInput(e.target.value)
                                    }
                                    type="text"
                                    size="lg"
                                    placeholder="Search for a book"
                                />
                            </Col>
                            <Col xs={12} md={4}>
                                <Button
                                    type="submit"
                                    variant="success"
                                    size="lg"
                                >
                                    Submit Search
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    {error && (
                        <span className="ml-2">Something went wrong...</span>
                    )}
                </Container>
            </div>

            {/* Section to display the search results */}
            <Container>
                <h2 className="pt-5">
                    {searchedBooks.length
                        ? `Viewing ${searchedBooks.length} results:`
                        : 'Search for a book to begin'}
                </h2>
                <Row>
                    {searchedBooks.map((book) => {
                        return (
                            <Col md="4" key={book.bookId}>
                                <Card border="dark">
                                    {/* Display the book's image if available */}
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
                                        {/* Save button for logged-in users */}
                                        {Auth.loggedIn() && (
                                            <Button
                                                disabled={savedBookIds?.some(
                                                    (savedBookId: string) =>
                                                        savedBookId ===
                                                        book.bookId
                                                )}
                                                className="btn-block btn-info"
                                                onClick={() =>
                                                    handleSaveBook(book.bookId)
                                                }
                                            >
                                                {savedBookIds?.some(
                                                    (savedBookId: string) =>
                                                        savedBookId ===
                                                        book.bookId
                                                )
                                                    ? 'This book has already been saved!'
                                                    : 'Save this Book!'}
                                            </Button>
                                        )}
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

export default SearchBooks;
