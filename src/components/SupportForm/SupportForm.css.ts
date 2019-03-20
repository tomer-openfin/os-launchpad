import styled from 'styled-components';

import Button from '../Button/index';
import { Wrapper as LabelWrapper } from '../Label/index';

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 20px;
  padding-bottom: 18px;
  display: flex;
  flex-direction: column;
`;

export const InputWrapper = styled.div`
  ${LabelWrapper} {
    margin-bottom: 8px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 22px;

  ${Button} {
    margin-left: 14px;
  }
`;
