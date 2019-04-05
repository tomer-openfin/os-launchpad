import styled, { css } from 'styled-components';

export const FOOTER_HEIGHT = '60px';

export const ResponsiveWidth = css`
  margin: 0 auto;
  max-width: 469px;
  width: 100%;
`;

export const Form = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  width: 100%;
`;

export const ScrollWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  width: 100%;
  margin-bottom: ${FOOTER_HEIGHT};
  min-height: calc(100% - ${FOOTER_HEIGHT});
`;

export const GridWrapper = styled.div`
  ${ResponsiveWidth}

  display: grid;
  grid-template-columns: 1fr;
  padding: 20px;
`;

export const RowWrapper = styled.div<{ height?: string; firstElementWidth?: string; secondElementWidth?: string }>`
  display: grid;
  grid-template-columns: ${props => props.firstElementWidth || '1fr'} ${props => props.secondElementWidth || '1fr'};
  grid-template-rows: ${props => props.height || '62px'};
  grid-column-gap: 20px;
`;

export const PasswordIconWrapper = styled.div`
  align-self: flex-end;
  position: absolute;
  padding: 32px 5px;
`;

export const CheckboxWrapper = styled.div`
  padding-top: 20px;
`;
