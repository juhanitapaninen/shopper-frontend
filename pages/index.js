import {Provider, Container, Heading} from 'rebass';
import withData from '../utils/withData';
import ShoppingList from '../components/ShoppingList';
import basicTheme from '../themes/basic';

export default withData((props) => (
  <Provider theme={basicTheme}>
    <Container>
      <Heading f={[ 5, 6, 7, 8 ]} center>Ostoslista</Heading>
      <ShoppingList />
    </Container>
  </Provider>
));