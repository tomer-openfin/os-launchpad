import styled from 'styled-components';

import * as closeIcon from '../../assets/close-x-grey.svg';

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  padding-right: 10px;
`;

export const CloseButton = styled.div`
  position: absolute;
  background: url(${closeIcon});
  background-size: contain;
  background-repeat: no-repeat;
  height: 10px;
  width: 10px;
  right: 8px;
  top: 8px;
  z-index: 2;
`;
