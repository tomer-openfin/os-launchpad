import * as React from 'react';

import { Text, Wrapper } from './ContextManagerEmptyState.css';

interface Props {
  className?: string;
  children: React.ReactNode;
}

const ContextManagerEmptyState = ({ className, children }: Props) => (
  <Wrapper className={className}>{typeof children === 'string' ? <Text>{children}</Text> : children}</Wrapper>
);

export default ContextManagerEmptyState;
