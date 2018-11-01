import styled from 'styled-components';

import { Color, Typography } from '../../styles';
import { HProps } from '../../styles/typography.css';

export const Wrapper = styled.div`
  display: block;
  background: ${Color.CHARCOAL};
  padding: 15px 50px;
`;

export const AppCard = styled.div`
  display: flex;
  align-items: center;
  color: ${Color.WHITE}
  padding: 10px;
  margin: 25px 0;
  border-radius: 5px;
  border: 1px solid ${Color.WHITE}
  min-height: 50px;
`;

export const AppName = styled<HProps>(Typography.H3)`
  color: ${Color.WHITE}
  min-width: 200px;
  padding: 0 15px;
  text-transform: capitalize;
`;

export const AppDescription = styled.div`
  padding: 0 15px;
  line-height: 30px;
`;

export const Heading = styled<HProps>(Typography.H1)`
  display: block;
  margin: 10px 0;
  color: ${Color.WHITE};
`;
