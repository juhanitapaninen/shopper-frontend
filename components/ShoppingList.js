import {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import styled from 'styled-components';
import {Container, Button, Fixed, Overlay, Text, Heading} from 'rebass';
import gql from 'graphql-tag';
import Dropdown from './Dropdown';
import addItemToShoppingList from '../mutations/addItemToShoppingList';
import addItem from '../mutations/addItem';

const POSTS_PER_PAGE = 10

const List = styled.ul `
  margin: 2rem;
  padding: 0;
`;

const ListItem = styled.li `
  padding: 1rem 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.gray};
  transition: background-color 0.25s;
  &:hover {
    background-color: ${props => props.theme.colors.hover};
  }
`;

const nextShoppingList = gql `
{
  nextShoppingList {
    id,
    name,
    target,
    items {
      item {id,name}
    }
  }
}
`;

class ShoppingList extends Component {
  state = {
    showOverlay: false,
    inputValue: ''
  };
  toggleOverlay = () => this.setState({showOverlay: !this.state.showOverlay});
  addItemToShoppingList = id => {
    console.log('addItemToShoppingList', id);
    this.props.addItemToShoppingList({
      variables: {
        shoppingListId: this.props.data.nextShoppingList.id,
        itemId: id
      },
      refetchQueries: [{ query: nextShoppingList }]
    });
  };

  handleSelect = ({id, name}) => {
    console.log('handleSelect', id, name);
    if (name) {
      if (!id) {
        this.props.addItem({
          variables: {name, typeName: 'Tuntematon kategoria'}
        }).then(({data: {addItem: {id}}}) => {
          console.log('ID', id);
          this.addItemToShoppingList(id);
        });
      } else {
        this.addItemToShoppingList(id);
      }
    }
  };
  render() {
    const {loading, error, nextShoppingList} = this.props.data;
    const {items} = nextShoppingList;
    const handleClick = () => console.log('Click!');
    if (error) {
      return <div>Error loading items.</div>
    }
    if (!loading) {
      return (
        <Container>
          <List width={1}>
          {
            items.map(({item}) =>
              <ListItem width={1/2} key={item.id} onClick={handleClick}>
                <Text f={[ 2, 3, 4, 5 ]}>{item.name}</Text>
              </ListItem>
            )}
            <Dropdown onSelect={this.handleSelect} />
          </List>
        </Container>
      );
    }
    return <div>Loading</div>
  }
}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
export default compose(
  graphql(nextShoppingList),
  graphql(addItemToShoppingList, {name: "addItemToShoppingList"}),
  graphql(addItem, {name: "addItem"})
)(ShoppingList);
