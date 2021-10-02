import { gql } from '@apollo/client';

export const QUERY_ME = gql`
{
    me {
        _id
        userLibrary
        email
        savedBooks {
            bookId
            authors
            image
            description
            title
            link
        }
    }
}
`

export const QUERY_USERS = gql`
    query users {
        users{
            _id
            userLibrary
            email
            savedBooks {
                bookId
                authors
                image
                description
                title
                link
            }
        }
    }
`;