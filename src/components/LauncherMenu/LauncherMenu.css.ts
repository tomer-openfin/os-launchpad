import styled from 'styled-components';

import { Color, Typography } from '../../styles';

import { Icon } from '../SvgIcon';

export const ROW_HEIGHT = 46;
export const EDGE_PADDING = 5;

export const Text = styled.span`
  ${Typography.TypeStyleProcyon}

  color: ${Color.SUN};
  flex: 1;
  text-align: left;
`;

export const Action = styled.button`
  align-items: center;
  background-color: ${Color.KUIPER_BELT};
  border: none;
  cursor: pointer;
  display: flex;
  margin: 0;
  outline: none;
  padding: 2px 7px;
  width: 100%;

  :first-child {
    padding-top: 7px;
  }

  :last-child {
    padding-bottom: 7px;
  }

  :hover {
    background-color: ${Color.VACUUM};

    ${Icon} {
      background-color: ${Color.JUPITER};
    }

    ${Text} {
      color: ${Color.JUPITER};
    }
  }
`;

export const Wrapper = styled.div`
  height: 100vh;
  overflow: hidden;
  width: 100vw;
`;
