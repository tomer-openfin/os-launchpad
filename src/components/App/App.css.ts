import styled from 'styled-components';

import { Color } from '../../styles';

interface Props {
  launcherPosition: string;
}

const isLeftOrRight = (props: Props) => props.launcherPosition === 'RIGHT' || props.launcherPosition === 'LEFT';

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: ${(props: Props) => (isLeftOrRight(props) ? 'column' : 'row')};
  justify-content: space-between;
  position: relative;
`;

export const Separator = styled.div`
  margin: auto;
  height: ${(props: Props) => (isLeftOrRight(props) ? '1px' : '36px')};
  width: ${(props: Props) => (isLeftOrRight(props) ? '36px' : '1px')};
  background-color: ${Color.DUSTY_GREY};
`;
