# Book Search Engine GraphQL API Documentation

> **Note:**
> This API uses GraphQL. You can access the endpoint at
> [`/graphql`](https://book-search-apollo-mongoose.onrender.com/graphql)
> Use [Apollo Sandbox](https://studio.apollographql.com/sandbox/explorer), [Insomnia](https://insomnia.rest/), or [Postman](https://www.postman.com/) to test queries and mutations.

---

## Authentication

-   Most mutations and queries that access user data require a JWT token.
-   After signing up or logging in, include the token in the `Authorization` header as:
    `Bearer <your_token>`

---

## Example Mutations

### Register a New User

```graphql
mutation {
    addUser(
        input: {
            username: "demo"
            email: "demo@email.com"
            password: "password"
        }
    ) {
        token
        user {
            _id
            username
            email
        }
    }
}
```

### Login

```graphql
mutation {
    login(email: "demo@email.com", password: "password") {
        token
        user {
            _id
            username
            email
        }
    }
}
```

---

## Example Queries

### Get Current User (Requires JWT)

```graphql
query {
    me {
        _id
        username
        email
        savedBooks {
            bookId
            title
            authors
            description
        }
    }
}
```

---

## Example Mutations for Books

### Save a Book (Requires JWT)

```graphql
mutation {
    saveBook(
        input: {
            bookId: "123"
            title: "Book Title"
            authors: ["Author"]
            description: "Description"
        }
    ) {
        _id
        username
        savedBooks {
            bookId
            title
        }
    }
}
```

### Remove a Book (Requires JWT)

```graphql
mutation {
    removeBook(bookId: "123") {
        _id
        username
        savedBooks {
            bookId
            title
        }
    }
}
```

---

## Schema

-   You can view the full schema and documentation by visiting the `/graphql` endpoint in your browser.

---

**For more details, see the main [README.md](./README.md).**

```---

## Schema

- You can view the full schema and documentation by visiting the `/graphql` endpoint in your browser.

---

**For more details, see the main [README.md](./README.md).**
```
