import withData from '../utils/withData';
import ShoppingList from '../components/ShoppingList';

export default withData((props) => (
  <div>
    Welcome to next.js !
    {props.url.pathname}
    <ShoppingList />
  </div>
));