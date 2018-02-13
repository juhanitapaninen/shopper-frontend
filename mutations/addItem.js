import gql from 'graphql-tag';

export default gql `
  mutation AddItem($name: String!, $typeName: String!) {
    addItem(name: $name, typeName: $typeName) {
      id,
      name
    }
  }
`;
