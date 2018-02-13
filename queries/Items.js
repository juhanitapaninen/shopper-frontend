import gql from "graphql-tag";

export default gql `
query Items
  {
    items {
      id,
      name
    }
  }
`;