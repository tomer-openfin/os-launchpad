import * as React from 'react';

import { ErrorWrapper, LabelWrapper, Wrapper } from './Label.css';

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode;
  label: string;
  renderError?: () => React.ReactNode;
}

const Label = ({ children, label, renderError, ...rest }: Props) => (
  <Wrapper {...rest}>
    <LabelWrapper>{label}</LabelWrapper>

    {children}

    {renderError && <ErrorWrapper>{renderError()}</ErrorWrapper>}
  </Wrapper>
);

export default Label;
