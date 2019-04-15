import * as React from 'react';

import { ErrorWrapper, LabelWrapper, Wrapper } from './Label.css';

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode;
  index?: number; // for cascade animations
  label: string;
  renderError?: () => React.ReactNode;
}

const defaultProps = {
  index: 1,
};

const Label = ({ children, index = defaultProps.index, label, renderError, ...rest }: Props) => (
  <Wrapper index={index} {...rest}>
    <LabelWrapper>{label}</LabelWrapper>

    {children}

    {renderError && <ErrorWrapper>{renderError()}</ErrorWrapper>}
  </Wrapper>
);

export default Label;
