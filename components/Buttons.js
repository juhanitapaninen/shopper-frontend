import styled from 'styled-components';
import {Container} from "rebass";

const RemoveButton = styled(Container) `
  text-align: center;
  width: 1rem;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.colors.red};
  }
`;

const CheckButton = styled(Container) `
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.colors.green};
  }
`;

export {
  RemoveButton,
  CheckButton
};