import {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import styled from 'styled-components';
import {Container, Text} from 'rebass';
import RemoveIcon from 'react-icons/lib/fa/close';
import CheckIcon from 'react-icons/lib/fa/check'
import Dropdown from './Dropdown';
import addItemToShoppingList from '../mutations/addItemToShoppingList';
import addItem from '../mutations/addItem';
import updateItem from '../mutations/updateShoppingListItem';
import nextShoppingList from '../queries/nextShoppingList';
import {CheckButton, RemoveButton} from "./Buttons";

const List = styled.ul `
  margin: 2rem;
  padding: 0;
`;

const ListRow = styled.li `
  display: flex;
  padding: 1rem 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.gray};
  transition: background-color 0.25s;
  &:hover {
    background-color: ${props => props.theme.colors.hover};
  }
`;

const RowCenter = styled(Container) `
  flex: 1 1 80%;
`;
const RowEdge = styled(Container) `
  flex: 1 1 10%;
`;

class ShoppingList extends Component {
  state = {
    showOverlay: false,
    inputValue: ''
  };
  toggleOverlay = () => this.setState({showOverlay: !this.state.showOverlay});
  addItemToShoppingList = id => {
    this.props.addItemToShoppingList({
      variables: {
        shoppingListId: this.props.data.nextShoppingList.id,
        itemId: id
      },
      refetchQueries: [{ query: nextShoppingList }]
    });
  };

  handleSelect = ({id, name}) => {
    if (name) {
      if (!id) {
        this.props.addItem({
          variables: {name, typeName: 'Tuntematon kategoria'}
        }).then(({data: {addItem: {id}}}) => {
          this.addItemToShoppingList(id);
        });
      } else {
        this.addItemToShoppingList(id);
      }
    }
  };

  // TODO: Optimization. Use updateQueries to not to fetch the whole shopping list again
  toggleCompleted = ({id, completed}) => () =>
    this.props.updateItem({
      variables: {id, completed: !completed},
      refetchQueries: [{ query: nextShoppingList }]
    });

  render() {
    const {loading, error, nextShoppingList} = this.props.data;
    const {items} = nextShoppingList;
    if (error) {
      return <div>Error loading items.</div>
    }
    if (!loading) {
      return (
        <Container>
          <List width={1}>
          {
            items.map(({item, id, completed}) =>
              <ListRow width={1/2} key={item.id}>
                <RowEdge f={[ 2, 3, 4, 5 ]} color={completed ? 'green' : 'black'}>
                  <CheckButton onClick={this.toggleCompleted({id, completed})}><CheckIcon /></CheckButton>
                </RowEdge>
                <RowCenter>
                  <Text f={[ 2, 3, 4, 5 ]} color={completed ? 'green' : 'black'}>{item.name}</Text>
                </RowCenter>
                <RowEdge f={[ 2, 3, 4, 5 ]}>
                  <RemoveButton onClick={e => console.log(e)}><RemoveIcon /></RemoveButton>
                </RowEdge>
              </ListRow>
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
  graphql(addItem, {name: "addItem"}),
  graphql(updateItem, {name: "updateItem"})
)(ShoppingList);
