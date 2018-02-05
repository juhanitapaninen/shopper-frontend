import {graphql} from 'react-apollo'
import styled from 'styled-components';
import {ButtonCircle, Text} from 'rebass';
import gql from 'graphql-tag'

const POSTS_PER_PAGE = 10

const List = styled.ul `
  margin: 2rem;
`;

const ListItem = styled.li `
  padding: 1em 2em;
  border-bottom: 1px solid ${props => props.theme.colors.gray};
  transition: background-color 0.25s;
  &:hover {
    background-color: ${props => props.theme.colors.hover};
  }
`

function ShoppingList({data: {loading,error,nextShoppingList}}) {;
  const {items} = nextShoppingList;
  const handleClick = () => console.log('Click!');
  console.log(items);
  if (error) 
    return <div>Error loading items.</div>
    if (items && items.length > 0) {
    return (
      <section>
        <List>
        {
          items.map(({item}) =>
            <ListItem key={item.id} onClick={handleClick}>
              <Text f={[ 4, 5 ]}>{item.name}</Text>
            </ListItem>
          )}
        </List>
      </section>
    );
  }
  return <div>Loading</div>
}

const items = gql `
{
  nextShoppingList {
    name,
    target,
    items {
      item {id,name}
    }
  }
}
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
export default graphql(items)(ShoppingList);
