import { Component } from 'react';
import PropTypes from 'prop-types';
import {graphql} from "react-apollo";
import query from '../queries/Items';
import { Container, Input, Text, Border } from 'rebass';

class Dropdown extends Component {

  state = {
    menuVisible: false,
    inputValue: ''
  };

  showMenu = () => this.setState({menuVisible: true});

  hideMenu = () => this.setState({menuVisible: false});

  changeInputValue = ({target: {value}}) => this.setState({inputValue: value}, () => !!value ? this.showMenu() : this.hideMenu());

  handleKeyPress = e => {
    if (e.charCode === 13) {
      const inputValue = this.state.inputValue;
      this.setState({inputValue: ''}, () => this.hideMenu());
      this.props.onSelect({id: null, name: inputValue});
    }
  };

  handleItemClick = ({id, name}) => () => {
    this.props.onSelect({id, name});
    this.hideMenu();
  };

  render() {
    const {data: {error, items}, placeholder} = this.props;
    if (error) {
      return <div>Error loading items.</div>
    }
    if (!items || items.length === 0) {
      return <div>Loading</div>;
    }
    return (
      <div>
        <Input
          f={[ 2, 3, 4, 5 ]}
          py={2}
          defaultValue={this.state.inputValue}
          placeholder={placeholder}
          onChange={this.changeInputValue}
          onFocus={this.showMenu}
          onKeyPress={this.handleKeyPress}
        />
        {
          this.state.menuVisible &&
          <Border py={2}>
            {items.map(({id, name}) => <Text key={id} py={2} f={[ 2, 3, 4, 5 ]} onClick={this.handleItemClick({id, name})}>{name}</Text>)}
          </Border>
        }
      </div>
    )
  }
}

Dropdown.propTypes = {
  placeholder: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};

export default graphql(query)(Dropdown);