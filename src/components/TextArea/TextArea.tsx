import * as React from 'react';

import { StyledTextArea, Wrapper } from './TextArea.css';

interface Props {
  value: string;
  handleChange: () => void;
  height?: number;
  width?: number;
}

const defaultProps = {
  height: 380,
  width: 381,
};

const TextArea = ({ value, handleChange, height = defaultProps.height, width = defaultProps.width }: Props) => {
  return (
    <Wrapper>
      <StyledTextArea height={height} width={width} />
    </Wrapper>
  );
};

export default TextArea;
