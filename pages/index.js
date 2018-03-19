import {Provider, Container, Heading} from 'rebass';
import withData from '../utils/withData';
import ShoppingList from '../components/ShoppingList';
import basicTheme from '../themes/basic';
import {redirectIfNotAuthenticated} from "../utils/auth";

class App extends React.Component {
  static async getInitialProps(ctx) {
    if (redirectIfNotAuthenticated(ctx)) {
      return {};
    }
    const userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent;
    const server = ctx.req ? true : false;
    return { userAgent, server }
  }

  render() {
    return (
      <Provider theme={basicTheme}>
        <Container>
          <Heading f={[ 5, 6, 7, 8 ]} center>Ostoslista</Heading>
          Hello World {this.props.server ? 'server' : 'client'}
          <ShoppingList />
        </Container>
      </Provider>
    )
  }
}

export default withData(App);