import {Provider, Heading} from 'rebass'
import withData from '../utils/withData';
import ShoppingList from '../components/ShoppingList';

export default withData((props) => (
  <Provider>
    <Heading>Ostoslista</Heading>
    <ShoppingList />
  </Provider>
));