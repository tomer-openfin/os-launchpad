import styled from 'styled-components';

import { Color, Typography } from '../../styles';

import Button from '../Button';
import { Wrapper as LabelWrapper } from '../Label';

export const EmailText = styled.span``;

export const P = styled.p`
  ${Typography.TypeStyleArcturus}

  color: ${Color.SUN};
  margin: 0;
  padding-bottom: 22px;

  ${EmailText} {
    color: ${Color.NEBULA};
  }
`;

export const InputWrapper = styled.div`
  ${LabelWrapper} {
    margin-bottom: 18px;
  }
`;

export const Form = styled.form`
  background-color: ${Color.ASTEROID_BELT};
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px 0px 33px 0px;
  margin: 0 auto;

  ${Button} {
    align-self: center;
    margin-top: auto;
  }
`;
