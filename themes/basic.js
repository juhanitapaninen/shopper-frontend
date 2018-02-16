import {Provider, Container, Heading, colors as palxColors} from 'rebass';

export default {
  colors : {
    black: '#000',
    white: '#fff',
    gray: palxColors.gray2,
    red: palxColors.red1,
    green: palxColors.green1,
    hover: palxColors.gray1,
    defaultButton: palxColors.blue5,
    activeButton: palxColors.blue6,
    checkedButton: palxColors.blue3,
    ...palxColors
  },
};