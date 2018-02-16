import gql from "graphql-tag";

export default gql `
query NextShoppingList
  {
    nextShoppingList {
      id,
      target,
      items {
        id,
        completed,
        item {id,name}
      }
    }
  }
`;