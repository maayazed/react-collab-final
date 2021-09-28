import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation addUser($email: String!, $password: String!) {
        addUser(email:$email, password: $password){
          user{
            email
          }
        }
      }
`
//Example Query Variables
// {"email": "<email here>", "password": "<password here>"}


export const LOG_IN = gql`
      mutation login($email: String!, $password: String!) {
        login(email:$email, password: $password){
          user{
            _id , email, password
          }
        }
      }
`
//Example Query Variables
// {"email": "<user email here>", "password": "<user password here>"}


export const CREATE_BOOK = gql`
      mutation addBook($bookId: String!, $libraryId: String! $title: String!, $authors: [String]!, $description: String!, 
        $image: String!, $link: String!){
          addBook(bookId:$bookId, libraryId:$libraryId, title:$title, authors:$authors, description:$description,image:$image, 
            link:$link){
          _id, location, currentBooks{
            bookId, title, authors, description, image, link
          }
        }
       }
`
//Example Query Variables
// {"bookId": "<book id here>", "libraryId": "<library id>", "title": "<book title here>", "authors": ["<author one>", "<author two>"], 
//"description": "<book description>", "image": "<book image>", "link": "<link to book>"}


export const CREATE_LIBRARY = gql`
       mutation createLibrary($location: String!, $currentBooks: [String]!) {
        addLibrary(location:$location, currentBooks: $currentBooks){
          location
        }
      }
`
//Example Query Variables
//{"location": "<location address>", "currentBooks": []}


export const DELETE_BOOK = gql`
      mutation removeBook($libraryId: ID!, $bookId: String!){
        removeBook(libraryId:$libraryId, bookId:$bookId){
          currentBooks{bookId}
        }
      }
`
//Example Query Variables
//{"libraryId": "<library id>", "bookId": "<id of book to delete>"}