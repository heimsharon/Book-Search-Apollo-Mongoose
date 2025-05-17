# Book Search Engine

_A full-stack MERN book search app with secure JWT authentication, user book management, and Google Books API integration._

![MIT License](https://img.shields.io/badge/license-MIT-green)
![Render Deploy](https://img.shields.io/badge/Deployed-Render-blue)
![Node.js](https://img.shields.io/badge/Node.js-16%2B-brightgreen)
![React](https://img.shields.io/badge/React-18+-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-blue)

**Live Demo:** [Book Search Engine on Render](https://book-search-apollo-mongoose.onrender.com)

> **Demo Login:**
> You can use any email and password to sign up, then log in with those credentials. There are no preset demo users—just register and start using the app!

---

## Table of Contents

- [Book Search Engine](#book-search-engine)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Technologies Used](#technologies-used)
  - [Quick Start](#quick-start)
  - [Installation](#installation)
  - [API Documentation](#api-documentation)
  - [Usage](#usage)
  - [Screenshots](#screenshots)
    - [Search for Books](#search-for-books)
  - [License](#license)
  - [Notes](#notes)
  - [Contributing, Support, and FAQ](#contributing-support-and-faq)
  - [Acknowledgments](#acknowledgments)
  - [Author](#author)

---

## Description

**Book Search Engine** is a full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to search for books using the Google Books API. Users can save books to their account, view, and manage their saved books. The app features secure authentication with JSON Web Tokens (JWT) and is built with Apollo Server for GraphQL API communication and Mongoose for database management.

---

## Features

-   Search for books using the Google Books API
-   Save books to your account (requires login)
-   View and manage your saved books
-   User authentication with JWT (JSON Web Tokens)
-   Responsive design for mobile and desktop devices

---

## Prerequisites

-   [Node.js](https://nodejs.org/) (v16 or higher)
-   [npm](https://www.npmjs.com/) (comes with Node.js)
-   [MongoDB](https://www.mongodb.com/) (local or cloud-based, e.g., [MongoDB Atlas](https://www.mongodb.com/atlas))
-   A [Google Books API Key](https://developers.google.com/books/docs/v1/using#APIKey) (optional, for extended functionality)
-   A GitHub account (optional, for cloning and contributing)

---

## Technologies Used

**Frontend:**

-   [React](https://reactjs.org/)
-   [React Router](https://reactrouter.com/)
-   [Apollo Client](https://www.apollographql.com/docs/react/)
-   [Bootstrap](https://getbootstrap.com/)
-   [Vite](https://vitejs.dev/)
-   [TypeScript](https://www.typescriptlang.org/)

**Backend:**

-   [Node.js](https://nodejs.org/)
-   [Express.js](https://expressjs.com/)
-   [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
-   [GraphQL](https://graphql.org/)
-   [Mongoose](https://mongoosejs.com/)
-   [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
-   [dotenv](https://github.com/motdotla/dotenv)

**Database:**

-   [MongoDB](https://www.mongodb.com/)

**Authentication:**

-   [JSON Web Tokens (JWT)](https://jwt.io/)

---

## Quick Start

> You can get the code by either cloning this repository using Git, or downloading it as a ZIP file from GitHub (click the green "Code" button, then "Download ZIP").
> On GitHub, you can also browse the code, view commit history, open issues, and submit pull requests.

---

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/book-search-apollo.git
    cd book-search-apollo
    ```

2. **Install dependencies for both client and server:**

    ```bash
    npm run install
    ```

    This command will install dependencies for both the [client](http://_vscodecontentref_/0) and [server](http://_vscodecontentref_/1) folders at once.
    Alternatively, you can install them separately:

    ```bash
    cd client
    npm install
    cd ../server
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the [server](http://_vscodecontentref_/2) directory with the following:

    ```env
    MONGODB_URI=<your-mongodb-uri>
    JWT_SECRET_KEY=<your-secret-key>
    ```

    > **Note:** Never commit your real `.env` file to version control. Only commit `.env.example` with placeholder values.

4. **Build for both client and server:**

    ```bash
    npm run build
    ```

5. **Start the development server:**

    ```bash
    npm run develop
    ```

    - The frontend will run at [http://localhost:3000](http://localhost:3000)
    - The backend will run at [http://localhost:3001](http://localhost:3001) (if separate)

6. **Open your browser:**

    Visit [http://localhost:3000](http://localhost:3000)

---

## API Documentation

See [API.md](API.md) for full details on using the GraphQL API, including endpoint, example queries/mutations, and authentication instructions.

---

## Usage

1. **Search for Books:**

    - Use the search bar to find books by title, author, or keyword.

2. **Save Books:**

    - Sign up and log in to save books to your account.

3. **Manage Saved Books:**
    - View your saved books and remove any you no longer want.

---

## Screenshots

### Search for Books

![App Screenshot](./assets/booksearch-user-savedbooks.jpg)

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Notes

-   The codebase is commented for educational purposes and future reference.
-   The GitHub repository allows you to download, fork, or contribute to the project as needed.

---

## Contributing, Support, and FAQ

-   **Contributions:** Pull requests are welcome! Please open an issue or submit a pull request for improvements or bug fixes.
-   **Support:** If you encounter any issues or have suggestions, please open an issue on GitHub.
-   **FAQ:**
    -   _How do I run the program?_
        See the Installation and Usage sections above.
    -   _Can I use this for my own project?_
        Yes, this project is MIT licensed. See the License section.
    -   _I'm having trouble connecting to the database or running the app!_
        -   Double-check your `.env` file values, especially `MONGODB_URI` and `JWT_SECRET_KEY`.
        -   Make sure MongoDB is running and accessible.
        -   Try running `npm install` in both [client](http://_vscodecontentref_/3) and [server](http://_vscodecontentref_/4) if you see missing module errors.

---

## Acknowledgments

Portions of this project were developed using starter code provided by [edX Boot Camps LLC](https://bootcamp.edx.org/) for educational purposes.

---

## Author

Created by Sharon Heim.
For questions or suggestions, please visit my [GitHub profile](https://github.com/heimsharon).

---

© 2025 Book Search Engine Project
