import styled from 'styled-components';

import { Color, Typography } from '../../styles';

export const ActionsWrapper = styled.div`
  position: relative;
  width: 100%;

  &:before {
    background-color: ${Color.SUN};
    bottom: 0;
    content: '';
    height: 1px;
    left: 0;
    opacity: 0.2;
    position: absolute;
    right: 0;
  }
`;

export const Header = styled.div`
  background-color: ${Color.VACUUM};
  color: ${Color.JUPITER};
  width: 100%;
`;

export const Title = styled.div`
  ${Typography.TypeStyleProcyon}

  padding: 10px 12px 8px 12px;
`;

export const Wrapper = styled.div`
  align-items: center;
  background-color: ${Color.KUIPER_BELT};
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: flex-start;
  position: relative;
  width: 100vw;
`;
