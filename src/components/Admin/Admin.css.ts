import styled from 'styled-components';

import { Color } from '../../styles';

// placeholder tabs until design finalized
export const TabsWrapper = styled.div`
  width: auto;
  height: auto;
  margin: 0;
  padding: 0;
`;

export const LinksWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin: 10px 0;
  justify-content: space-evenly;
  text-transform: uppercase;
`;

export const TabWrapper = styled.div`
  padding: 1rem;
  background: ${Color.WHITE};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color: ${Color.BLACK};
  text-decoration: none !important;

  .active-tab {
    color: crimson;
    font-size: 1.1rem;
    font-weight: bold;
    border-bottom: 2px solid black;
  }

  &:hover,
  &:active {
    background: ${Color.LIGHTER_GREY};
  }
`;

export const Wrapper = styled.div``;
