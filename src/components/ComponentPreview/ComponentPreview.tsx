import * as React from 'react';

import { BorderText, ComponentWrapper, Disabler, InnerWrapper, OuterWrapper, PreviewWrapper } from './ComponentPreview.css';

import WindowHeader from '../WindowHeader';

interface Props {
  children?: React.ReactNode;
  handleClose?: () => void;
}

const ComponentPreview = ({ children, handleClose }: Props) => {
  return (
    <OuterWrapper>
      <WindowHeader handleClose={handleClose} label="Assets Preview">
        Preview
      </WindowHeader>

      <InnerWrapper>
        <BorderText>Preview</BorderText>

        <BorderText>Preview</BorderText>

        <BorderText>Preview</BorderText>

        <BorderText>Preview</BorderText>

        <ComponentWrapper>
          <Disabler disabled={true}>
            <PreviewWrapper>{children}</PreviewWrapper>
          </Disabler>
        </ComponentWrapper>
      </InnerWrapper>
    </OuterWrapper>
  );
};

export default ComponentPreview;
