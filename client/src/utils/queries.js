import { gql } from '@apollo/client';

export const QUERY_ME = gql`
{
    me {
        _id
        userLibrary
        email
    }
}
`
export const QUERY_USER = gql`
    query user($userId: ID!) {
        user(userId: $userId) {
            _id
            userLibrary
            email
            password
        }
    }
`

export const QUERY_USERS = gql`
    query users {
        users{
            _id
            userLibrary
            email
            password
        }
    }
`;