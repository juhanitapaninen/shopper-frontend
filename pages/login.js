import {Provider, Container, Heading, Button} from 'rebass';
import Link from 'next/link';
import { GoogleLogin } from 'react-google-login';
import basicTheme from '../themes/basic';
import {GOOGLE_CLIENT_ID} from '../secrets.json';
import { setCookie } from "../utils/session";
import {signIn, redirectIfAuthenticated} from "../utils/auth";

const responseGoogle = (response) => {
  console.log(response);
  signIn(response.accessToken);
}

class Login extends React.Component {
  static getInitialProps(ctx) { 
    redirectIfAuthenticated(ctx); 
    return {};
  }

  render() {
    return (
      <Provider theme={basicTheme}>
        <Container>
          <Heading f={[ 5, 6, 7, 8 ]} center>Kirjaudu sisään</Heading>
          <div>
            <Link href="/">
              <a>Ostoslista</a>
            </Link>
          </div>
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
        </Container>
      </Provider>
    );
  }
}

export default Login;