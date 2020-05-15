import styled from 'styled-components';
import { Link as ReactLink } from 'react-router-dom';

export const Link = styled(ReactLink).attrs(props => ({
  className: "f5 lh-copy near-black",
}))`
  display: block;
  width: 100%;

  text-decoration: none;
  
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`;
