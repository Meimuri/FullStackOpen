import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`;

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            author
            published
        }
    }
`;

// export const FIND_PERSON = gql`
//     query findPersonByName($nameToSearch: String!) {
//         findPerson(name: $nameToSearch) {
//             name
//             phone
//             id
//             address {
//                 street
//                 city
//             }
//         }
//     }
// `;

// export const CREATE_PERSON = gql`
//     mutation createPerson(
//         $name: String!
//         $street: String!
//         $city: String!
//         $phone: String
//     ) {
//         addPerson(name: $name, street: $street, city: $city, phone: $phone) {
//             name
//             phone
//             id
//             address {
//                 street
//                 city
//             }
//         }
//     }
// `;

// export const EDIT_NUMBER = gql`
//     mutation editNumber($name: String!, $phone: String!) {
//         editNumber(name: $name, phone: $phone) {
//             name
//             phone
//             address {
//                 street
//                 city
//             }
//             id
//         }
//     }
// `;
