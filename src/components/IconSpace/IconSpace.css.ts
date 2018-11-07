import styled from 'styled-components';

interface ImgProps {
  imgSrc?;
  large?: boolean;
  clickable?: boolean;
  draggable?: boolean;
}

export const Background = styled.div<ImgProps>`
  background: url(${props => props.imgSrc || ''});
  background-size: cover;
  background-repeat: no-repeat;
  height: ${props => (props.large ? '134px' : '67px')};
  width: ${props => (props.large ? '134px' : '67px')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => (props.clickable ? 'pointer' : 'default')}
  -webkit-app-region: ${props => (props.draggable ? 'drag' : 'no-drag')};
`;

export const Icon = styled.div<ImgProps>`
  background: url(${props => props.imgSrc || ''});
  background-size: contain;
  background-repeat: no-repeat;
  height: ${props => (props.large ? '66px' : '33px')};
  width: ${props => (props.large ? '66px' : '33px')};
  -webkit-app-region: ${props => (props.draggable ? 'drag' : 'no-drag')};
`;
