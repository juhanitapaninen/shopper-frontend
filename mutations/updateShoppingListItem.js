import gql from 'graphql-tag';

export default gql `
  mutation UpdateShoppingListItem($id: ID!, $completed: Boolean) {
    updateShoppingListItem(id: $id, completed: $completed) {
      id
    }
  }
`;
