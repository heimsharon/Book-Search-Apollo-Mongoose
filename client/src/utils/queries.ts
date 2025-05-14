//Filepath: client/src/utils/queries.ts
 //This file defines GraphQL query operations for retrieving user data.
import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me {
        me {
            _id
            username
            email
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;
