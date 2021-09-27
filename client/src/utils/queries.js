import { gql } from '@apollo/client';

export const QUERY_LIBRARY = gql`
    query library($libraryId:ID!){
        library(libraryId: $libraryId){
            _id, location, currentBooks{_id, bookId, title, authors, description, image, link}
      }
  }
`

export const QUERY_LIBRARIES = gql`
    query libraries{
        libraries{
            _id, location, currentBooks{_id, bookId, title, authors, description, image, link}
          }
    }
`

export const QUERY_USER = gql`
    query user($userId: ID!){
        user(userId: $userId){
          _id, email, password
        }
      }

`

export const QUERY_USERS = gql`
    query users{
        users{
            _id, email, password
          }
    }
`