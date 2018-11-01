import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: auto;
  width: 300px;
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
`;
