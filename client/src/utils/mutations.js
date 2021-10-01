import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation addUser($userLibrary: String!, $email: String!, $password: String!) {
        addUser(userLibrary: $userLibrary, email: $email, password: $password){
          user{
            _id
            userLibrary
            email
          }
        }
      }
`

export const LOG_IN = gql`
      mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
          user {
            _id
            userLibrary
          }
        }
      }
`