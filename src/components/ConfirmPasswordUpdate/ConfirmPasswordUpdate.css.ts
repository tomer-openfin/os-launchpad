import styled from 'styled-components';

import { Color } from '../../styles';

export const ButtonWrapper = styled.div`
  align-items: center;
  align-self: flex-end;
  display: flex;
  flex-wrap: nowrap;
  padding-right: 20px;
  padding-top: 36px;
`;

export const Wrapper = styled.div`
  align-items: flex-start;
  background-color: ${Color.ASTEROID_BELT};
  display: flex;
  flex-direction: column;
  height: 277px;
  justify-content: flex-start;
  width: 420px;
`;
