import gql from "graphql-tag";

export const REGISTER_MUTATION = gql`
  mutation createStukentUserMutation($status: Status!, $email: String!, $password: $String!, $timeZone: String!) {
      createStukentUser($status: Status!, $email: String!, $password: $String!, $timeZone: String!)
  }
`
