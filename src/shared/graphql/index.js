import { gql } from '@apollo/client';

/**
 * Query the current users details.
 */
export const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    user {
      id
      email
      lastName
      firstName
    }
  }
`;

/**
 * Sign up a new user mutation.
 */
export const USER_SIGN_UP_MUTATION = gql`
  mutation UserSignUp($user: UserCreateInput!, $authProfileId: ID) {
    userSignUpWithToken(user: $user, authProfileId: $authProfileId) {
      id
      email
      lastName
      firstName
    }
  }
`;

export const GET_FOOD = gql`
  query {
    notesList(first: 10) {
      items {
        title
      }
    }
  }
`;

export const notesQuery = gql`
  query {
    notesList(first: 10) {
      items {
        title
        body
      }
    }
  }
`;
