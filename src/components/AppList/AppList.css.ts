import styled from 'styled-components';

interface WrapperProps {
  launcherPosition: string;
}

const isLeftOrRight = (props: WrapperProps) => props.launcherPosition === 'RIGHT' || props.launcherPosition === 'LEFT';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: ${(props: WrapperProps) => (isLeftOrRight(props) ? 'column' : 'row')};
  justify-content: space-between;
  height: ${(props: WrapperProps) => (isLeftOrRight(props) ? '160px' : 'auto')};
  width: ${(props: WrapperProps) => (isLeftOrRight(props) ? 'auto' : '160px')};
`;

interface AppIconProps {
  src: string;
}

export const AppIcon = styled.div<AppIconProps>`
  background: url(${props => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  height: 33px;
  width: 33px;
  width: 268px;
`;
