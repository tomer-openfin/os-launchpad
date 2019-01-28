import styled from 'styled-components';

import { Color } from '../../styles';
import { TypeStyleArcturus } from '../../styles/typography.css';

import RadioButton from '../RadioButton';

export const Header = styled.h3`
  ${TypeStyleArcturus};

  color: ${Color.SUN};
`;

export const Wrapper = styled.div`
  padding: 20px;
  height: 100%;
  overflow-y: auto;
`;

export const StyledRadioButton = styled(RadioButton)`
  margin-right: 15px;
`;
