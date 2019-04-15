import styled from 'styled-components';

import { Color, Typography } from '../../styles';

import Label from '../Label/Label';
import { Form, GridWrapper, RowWrapper } from '../Responsive';

export const StyledRow = styled(RowWrapper)`
  grid-template-rows: 1fr;
`;

export const IconPreviewWrapper = styled.div`
  display: block;
  width: 68px;
  padding: 5px 0;
`;

export const IconPreviewMetaWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
`;

export const IconPreviewMeta = styled.div`
  ${Typography.TypeStyleNaos}

  color: ${Color.MERCURY};
`;

export const StyledForm = styled(Form)`
  ${GridWrapper} {
    grid-row-gap: 23px;
  }
`;

export const UnderlayLabel = styled(Label)`
  z-index: -1;
`;
