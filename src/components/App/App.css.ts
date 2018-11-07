import styled from 'styled-components';

import { Color } from '../../styles';

interface WrapperProps {
  launcherPosition: string;
}

const isLeftOrRight = (props: WrapperProps) => props.launcherPosition === 'RIGHT' || props.launcherPosition === 'LEFT';

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: ${(props: WrapperProps) => (isLeftOrRight(props) ? 'column' : 'row')};
  justify-content: space-between;
  position: relative;
`;

export const Seperator = styled.div`
  margin: auto;
  height: 36px;
  width: 1px;
  background-color: ${Color.DUSTY_GREY};
`;
