import {Provider, Container, Heading, colors as palxColors} from 'rebass';
import styled, {injectGlobal} from 'styled-components';
import withData from '../utils/withData';
import ShoppingList from '../components/ShoppingList';

injectGlobal `
  /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    width: auto;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

const theme = {
  colors : {
    black: '#000',
    white: '#fff',
    gray: palxColors.gray2,
    hover: palxColors.gray1,
    defaultButton: palxColors.blue5,
    activeButton: palxColors.blue6,
    checkedButton: palxColors.blue3,
    ...palxColors
  },
};

export default withData((props) => (
  <Provider theme={theme}>
    <Container>
      <Heading f={[ 5, 6, 7, 8 ]} center>Ostoslista</Heading>
      <ShoppingList />
    </Container>
  </Provider>
));