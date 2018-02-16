import gql from 'graphql-tag';

export default gql `
  mutation AddShoppingListItem($shoppingListId: ID!, $itemId: Int!, $comment: String) {
    addShoppingListItem(shoppingListId: $shoppingListId, itemId: $itemId, comment: $comment) {
      id, 
      shoppingList {
        id, name
      }, 
      item {
        id, name
      },
      comment
    }
  }
`;