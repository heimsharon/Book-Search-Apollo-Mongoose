// Filepath: client/src/utils/localStorage.ts
// This file contains utility functions for retrieving, saving, and removing book IDs from localStorage.

// Retrieves the array of saved book IDs from localStorage.
export const getSavedBookIds = () => {
    const savedBookIds = localStorage.getItem('saved_books')
        ? JSON.parse(localStorage.getItem('saved_books')!) // Parse the JSON string if it exists.
        : []; // Return an empty array if no saved books are found.

    return savedBookIds;
};

// Saves an array of book IDs to localStorage.
export const saveBookIds = (bookIdArr: string[]) => {
    if (bookIdArr.length) {
        // If the array is not empty, save it as a JSON string in localStorage.
        localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
    } else {
        // If the array is empty, remove the saved_books key from localStorage.
        localStorage.removeItem('saved_books');
    }
};

// Removes a specific book ID from the saved book IDs in localStorage.
export const removeBookId = (bookId: string) => {
    const savedBookIds = localStorage.getItem('saved_books')
        ? JSON.parse(localStorage.getItem('saved_books')!) // Parse the JSON string if it exists.
        : null; // Return null if no saved books are found.

    if (!savedBookIds) {
        // If there are no saved books, return false (nothing to remove).
        return false;
    }

    // Filter out the book ID to be removed and update the saved_books key in localStorage.
    const updatedSavedBookIds = savedBookIds?.filter(
        (savedBookId: string) => savedBookId !== bookId
    );
    localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

    return true; // Return true to indicate the book ID was successfully removed.
};
