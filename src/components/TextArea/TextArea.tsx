import * as React from 'react';

import { StyledTextArea, Wrapper } from './TextArea.css';

interface Props {
  value: string;
  handleChange: (e: React.SyntheticEvent<HTMLTextAreaElement>) => void;
  height?: number;
  width?: string;
  placeholder?: string;
}

const defaultProps = {
  height: 135,
  placeholder: '',
  width: '100%',
};

const TextArea = ({ value, handleChange, height = defaultProps.height, width = defaultProps.width, placeholder = defaultProps.placeholder }: Props) => {
  return (
    <Wrapper>
      <StyledTextArea height={height} width={width} placeholder={placeholder} onChange={handleChange} value={value} />
    </Wrapper>
  );
};

export default TextArea;
